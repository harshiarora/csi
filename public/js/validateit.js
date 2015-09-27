// ---------------------------------
// ---------- Validate It ----------
// ---------------------------------
// version: beta
// this plugin provides functionality to verify html forms, by taking in an object of names of all
// form inputs names with associated validation rule to validate with. 
// Thus, providing flexibility to validate a group of inputs or all at once based on the user requirements.
// ------------------------

/**
 * console helper
 */
(function($) {

  if(window.console === undefined)
    window.console = { isFake: true };

  var fns = ["log","warn","info","group","groupCollapsed","groupEnd"];
  for (var i = fns.length - 1; i >= 0; i--)
    if(window.console[fns[i]] === undefined)
      window.console[fns[i]] = $.noop;

  if(!$) return;
  
  var I = function(i){ return i; };

  function log() {
    if(this.suppressLog)
      return;
    cons('log', this, arguments);
  }

  function warn() {
    cons('warn', this, arguments);
  }

  function info() {
    cons('info', this, arguments);
  }

  function cons(type, opts, args) {
    if(window.console === undefined ||
       window.isFake === true)
      return;

    var a = $.map(args,I);
    a[0] = [opts.prefix, a[0], opts.postfix].join('');
    var grp = $.type(a[a.length-1]) === 'boolean' ? a.pop() : null;

    //if(a[0]) a[0] = getName(this) + a[0];
    if(grp === true) window.group(a[0]);
    if(a[0] && grp === null)
      if(window.navigator.userAgent.indexOf("MSIE") >= 0)
        window.log(a.join(','));
      else
        window.console[type].apply(window.console, a);
    if(grp === false) window.groupEnd();
  }

  function withOptions(opts) {
    return {
      log:  function() { log.apply(opts, arguments); },
      warn: function() { warn.apply(opts, arguments); },
      info: function() { info.apply(opts, arguments); }
    };
  }

  var console = function(opts) {
    opts = $.extend({}, defaults, opts);
    return withOptions(opts);
  };

  defaults = {
    suppressLog: false,
    prefix: '',
    postfix: ''
  };

  $.extend(console, withOptions(defaults));

  if($.console === undefined)
    $.console = console;
  
  $.consoleNoConflict = console;

}(jQuery));


/*
    The semi-colon before the function invocation is a safety net against
    concatenated scripts and/or other plugins which may not be closed properly.

    "undefined" is used because the undefined global variable in ECMAScript 3
    is mutable (ie. it can be changed by someone else). Because we don't pass a
    value to undefined when the anonymyous function is invoked, we ensure that
    undefined is truly undefined. Note, in ECMAScript 5 undefined can no
    longer be modified.

    "window" and "document" are passed as local variables rather than global.
    This (slightly) quickens the resolution process.
*/
;(function ( $, window, document, undefined ) {
    

    /* ===================================== *
     * Rules Manager (Plugin Wide)
     * ===================================== */

    var ruleManager = null;
    (function() {


      //privates
      var rawRules = {};

      var addRule = function(obj) {
        //check format, insert type
        for(var name in obj){
          if(rawRules[name])
            warn("validator '%s' already exists", name);

          //functions get auto-objectified
          if($.isFunction(obj[name]))
            obj[name] = { fn: obj[name] };
          
        }

        //deep extend rules by obj
        $.extend(true, rawRules, obj);
      };

      var updateRule = function(obj) {

        var data = {};
        //check format, insert type
        for(var name in obj) {

          if(rawRules[name])
            data[name] = obj[name];
          else
            warn("cannot update validator '%s' doesn't exist yet", name);

        }

        $.extend(true, rawRules, data);
      };

      var getRule = function(name) {
        var obj = rawRules[name];

        if(!obj) {
            var msg = "Missing rule: " + name;
            warn(msg);
            throw new Error('Stopped: no rule found with name: ' + name);
        }

        return obj;
      };

      var getRawRules = function(){
        return rawRules;
      }

      //public interface
      ruleManager = {
        addRule: addRule,
        getRule: getRule,
        updateRule: updateRule,
        getRawRules: getRawRules
      };

    }());


    var Utils = {

      //append to arguments[i]
      appendArg: function(args, expr, i) {
          if(!i) i = 0;
          var a = [].slice.call(args, i);
          a[i] = expr + a[i];
          return a;
      }

    };


    var VERSION = "0.0.1",
        cons = $.consoleNoConflict({ prefix: 'validateIt.js: ' }),
        log  = cons.log,
        warn = cons.warn,
        info = cons.info;

    /*
        Store the name of the plugin in the "pluginName" variable. This
        variable is used in the "Plugin" constructor below, as well as the
        plugin wrapper to construct the key for the "$.data" method.

        More: http://api.jquery.com/jquery.data/
    */
    var pluginName = 'validateIt';

    /*
        The "Plugin" constructor, builds a new instance of the plugin for the
        DOM node(s) that the plugin is called on. For example,
        "$('h1').pluginName();" creates a new instance of pluginName for
        all h1's.
    */
    // Create the plugin constructor
    function Plugin ( element, options, isSubmit, callBackFunction ) {
        /*
            Provide local access to the DOM node(s) that called the plugin,
            as well local access to the Validate It and default options.
        */
        this.element = element;
        this._name = pluginName;
        this._defaults = $.fn.validateIt.defaults;
        /*
            The "$.extend" method merges the contents of two or more objects,
            and stores the result in the first object. The first object is
            empty so that we don't alter the default options for future
            instances of the plugin.

            More: http://api.jquery.com/jquery.extend/
        */
        this.options = options;
        this.isSubmit = isSubmit;
        this.onComplete = callBackFunction;
        this.success = false;
        /*
            The "init" method is the starting point for all plugin logic.
            Calling the init method here in the "Plugin" constructor function
            allows us to store all methods (including the init method) in the
            plugin's prototype. Storing methods required by the plugin in its
            prototype lowers the memory footprint, as each instance of the
            plugin does not need to duplicate all of the same methods. Rather,
            each instance can inherit the methods from the constructor
            function's prototype.
        */
        this.init();
    }

    // Avoid Plugin.prototype conflicts
    $.extend(Plugin.prototype, {

        // Initialization logic
        init: function () {
            /*
                Create additional methods below and call them via
                "this.myFunction(arg1, arg2)", ie: "this.buildCache();".

                Note, you can cccess the DOM node(s), Validate It, default
                plugin options and custom plugin options for a each instance
                of the plugin by using the variables "this.element",
                "this._name", "this._defaults" and "this.options" created in
                the "Plugin" constructor function (as shown in the buildCache
                method below).
            */
            
            this.buildCache();
            this.bindEvents();
        },

        // Remove plugin instance completely
        destroy: function() {
            /*
                The destroy method unbinds all events for the specific instance
                of the plugin, then removes all plugin data that was stored in
                the plugin instance using jQuery's .removeData method.

                Since we store data for each instance of the plugin in its
                instantiating element using the $.data method (as explained
                in the plugin wrapper below), we can call methods directly on
                the instance outside of the plugin initalization, ie:
                $('selector').data('plugin_validateIt').validator();

                Consequently, the destroy method can be called using:
                $('selector').data('plugin_validateIt').destroy();
            */
            this.unbindEvents();
            this.$element.removeData();
        },

        // Cache DOM nodes for performance
        buildCache: function () {
            /*
                Create variable(s) that can be accessed by other plugin
                functions. For example, "this.$element = $(this.element);"
                will cache a jQuery reference to the elementthat initialized
                the plugin. Cached variables can then be used in other methods. 
            */
            this.$element = $(this.element);
        },

        // Bind events that trigger methods
        bindEvents: function() {
            var plugin = this;
            
            /*
                Bind event(s) to handlers that trigger other functions, ie:
                "plugin.$element.on('click', function() {});". Note the use of
                the cached variable we created in the buildCache method.

                All events are namespaced, ie:
                ".on('click'+'.'+this._name', function() {});".
                This allows us to unbind plugin-specific events using the
                unbindEvents method below.
            */
           
            //checking to see if click handler should be on button or a-link or input type button
            plugin.$element.on('click'+'.'+plugin._name, function(e) {
                /*
                    Use the "call" method so that inside of the method being
                    called, ie: "validator", the "this" keyword refers
                    to the plugin instance, not the event handler.

                    More: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/call
                */
                if(!plugin.isSubmit){
                    e.preventDefault();
                }

                var r =  plugin.validator.call(plugin);
                // alert('exisitng validateIt: status: '+r);
                log('exisitng validateIt: status: '+r);
                try{
                    if(!r){
                        plugin.success = false;
                        return false;
                    } else{
                        plugin.success = true;
                        return true;
                    }
                } catch(e){
                    // alert(e);
                }  
            });
        },

        // Unbind events that trigger methods
        unbindEvents: function() {
            /*
                Unbind all events in our plugin's namespace that are attached
                to "this.$element".
            */
            this.$element.off('.'+this._name);
        },

        /*
            "validator" is an example of a custom method in your
            plugin. Each method should perform a specific task. For example,
            the buildCache method exists only to create variables for other
            methods to access. The bindEvents method exists only to bind events
            to event handlers that trigger other methods. Creating custom
            plugin methods this way is less confusing (separation of concerns)
            and makes your code easier to test.
        */
        // Create custom methods
        validator: function() {
            var _tagName = this.$element.prop('tagName').toLowerCase().trim();
            var _isAValidTag = false;
            var message = "";
            log(_tagName);
            log('here');
            if( (_tagName=="a") || (_tagName=="button") || (_tagName=="input")  ){
                if(_tagName=="input"){
                    var _tagType = this.$element.attr('type');
                    log(_tagType);  
                    if(_tagType===undefined){
                        message = 'not a valid operator to work upon: input tag doesnt have type attribute';
                        _isAValidTag = false;
                    } else if( _tagType.toLowerCase().trim()!='submit' && _tagType.toLowerCase().trim()!='button'){
                        message = 'not a valid operator to work upon: input tag is not of type button or submit';
                        _isAValidTag = false;
                    } else{
                        _isAValidTag = true;
                    }
                } else{
                    _isAValidTag = true;
                }
            }

            log('_isAValidTag'+_isAValidTag);
            if(_isAValidTag){
                // alert('I promise to do something cool!');
                log("opttion"+ this.options);
                var fh = new FormHandler();
                
                $.each(this.options, function(i, v){
                    console.log(i+','+v);
                });
                
                
                var retVal = fh.validateFormElements(this.options); 
                
                // alert('exiting FormHandler: Status: '+retVal);
                
                if(retVal){
                    // change here to send JQuery obj as return val
                    this.onComplete(this.element);
                    return true;
                }
                else {
                    return false;
                }
            } else{
                log(message);
                return false;
            }

            return false;
            
        },

        callback: function() {
            // Cache onComplete option
            var onComplete = this.options.onComplete;

            if ( typeof onComplete === 'function' ) {
                /*
                    Use the "call" method so that inside of the onComplete
                    callback function the "this" keyword refers to the
                    specific DOM node that called the plugin.

                    More: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/call
                */
                onComplete.call(this.element);
            }
        }

    });

    /*
        Create a lightweight plugin wrapper around the "Plugin" constructor,
        preventing against multiple instantiations.

        More: http://learn.jquery.com/plugins/basic-plugin-creation/
    */
    $.fn.validateIt = function ( options , callBackFunction ) {
        var p = null;
        var counter = 0;
        this.each(function(a) {
            // alert($.data( this, "plugin_" + pluginName ));

            if ( ! ( p = $.data( this, "plugin_" + pluginName ) ) ) {
                /*
                    Use "$.data" to save each instance of the plugin in case
                    the user wants to modify it. Using "$.data" in this way
                    ensures the data is removed when the DOM element(s) are
                    removed via jQuery methods, as well as when the userleaves
                    the page. It's a smart way to prevent memory leaks.

                    More: http://api.jquery.com/jquery.data/
                */
                // alert('asdfsdf');
                console.log('asdfasdf');
                if($.isArray(options)){
                    $.data( this, "plugin_" + pluginName, new Plugin( this, options[counter] , false, callBackFunction) );
                } else{
                    $.data( this, "plugin_" + pluginName, new Plugin( this, options , true, callBackFunction) );
                }
                counter = counter+1;
                p = $.data( this, "plugin_" + pluginName );
            }
            
        });
        /*
            "return this;" returns the original jQuery object. This allows
            additional jQuery methods to be chained.
        */
        log('ValidateIt.js Initialization');
        return this;
    };

    /*
        Attach the default plugin options directly to the plugin object. This
        allows users to override default plugin options globally, instead of
        passing the same option(s) every time the plugin is initialized.

        For example, the user could set the "property" value once for all
        instances of the plugin with
        "$.fn.validateIt.defaults.property = 'myValue';". Then, every time
        plugin is initialized, "property" will be set to "myValue".

        More: http://learn.jquery.com/plugins/advanced-plugin-concepts/
    */
   

    var globalOptions = {
        debug: true,
        parent: 'form-group',
        errorBlock: null,
        errorContainer: 'form-group',
        property: 'value',
    };


    var settings = {
        formElements: null,        
        onComplete: null
    };

    $.fn.validateIt.defaults = settings; 


    $.validateIt = function(options){
        $.extend(globalOptions, options);
    };

    $.extend($.validateIt, {
      version: VERSION,
      addRule: ruleManager.addRule,
      updateRule: ruleManager.updateRule,
      getRule: ruleManager.getRule,
      getRawRules: ruleManager.getRawRules,
      globalOptions: globalOptions,
      defaults: settings
    });


    ////////////////////////////////////////////////////////////////////////////////////////////
    // Below are some helper functions to this library, you only wana look up to set defaults //
    ////////////////////////////////////////////////////////////////////////////////////////////


    /**
     * defined below is the legacy ECMAScript 5 API for creating classes and subclasses
     */
    

    /**
     * inherit() returns a newly created object that inherits properties from the
     * prototype object p. It uses the ECMAScript 5 function Object.create() if
     * it is defined, and otherwise falls back to an older technique
     * */
     
    function inherit(p){
        if(p == null) throw TypeError();    // p must be a non-null object
        if(Object.create)                   // if Object.create() is defined
            return Object.create(p);        //      then just use it
        var t = typeof p;                   // otherwise do some more type checking
        if(t !== "object" && t !== "function")  throw TypeError();
        function f(){};
        f.prototype = p;
        return new f();
    }

    
    function defineSubclass(superclass,       // Constructor of the superclass
                            constructor,    // The constructor for the new Subclass
                            methods,        // Instance method: copied to prototype
                            statics)        // Class properties: copied to constructor
    {

        // Set up the prototype object of the subclass
        constructor.prototype = inherit(superclass.prototype);
        constructor.prototype.constructor = constructor;
        // Copy the methods and statistics as we would for a regular class
        if(methods) $.extend(constructor.prototype, methods);
        if(statics) $.extend(constructor, statics);
        // Return the class
        return constructor; 
    }

    
    Function.prototype.extend = function(constructor, methods, statics){
        return defineSubclass(this, constructor, methods, statics);
    };

    // A conveniet function that can be used for any abstract method
    function abstractMethod(){ throw new Error('abstract method'); }

    /**
     * The Abstract class from which all the classes would be derived
     */
    
    function AbstractClass() { throw new Error("Can't instantiate abstract classes"); }
    AbstractClass.prototype.contains = abstractMethod;

    /**
     * Base class will be a abstract sublass of AbstractClass, having some basic functions
     */
    
    var BaseClass = AbstractClass.extend(
        function() {throw new Error("Can't instantiate abstract classes"); },
        {
              toString: function() {
                return (this.type ? this.type + ": ":'') +
                       (this.name ? this.name + ": ":'');
              },
              log: function() {
                if(!globalOptions.debug) return;
                log.apply(this, Utils.appendArg(arguments, this.toString()));
              },
              warn: function() {
                warn.apply(this, Utils.appendArg(arguments, this.toString()));
              },
              info: function() {
                info.apply(this, Utils.appendArg(arguments, this.toString()));
              }
        }

    );

    var ValidationElement = BaseClass.extend(
        function ValidationElement(formElementID, rule, errorBlock){
            // alert('her0');
            this.type = "ValidationElement";
            this.name = formElementID;  
            this.parent = null;
            this.formElement = null;
            this.processedSuccessfully = false;
            this.elementType = null;
            this.rules = new Object();
            var obj =  null;
            var self = this;
            
            // // alert('her1'+$.type(this.rules));
           
            if(!formElementID.length || $.type(formElementID)==='undefined') {
                this.warn("Can't instantiate without a formElement reference");
                throw new Error("Stopped at processing formElement");
            }
            if(!rule.length || $.type(rule)==='undefined') {
                this.warn("Can't instantiate without a formElement reference");
                throw new Error("Can't instantiate without a rule");
            }
            // // alert('here');
            this.formElement = $("input[name='"+formElementID+"']");
            // // alert(this.formElement.prop('tagName'));
            if( $.type(this.formElement.prop('tagName'))==='undefined')
                this.formElement = $("select[name='"+formElementID+"']");
            //type check here to get successful <select> and throw error if not

            // // alert('after getting element');
            this.parent = this.formElement.parent();
            // // alert(this.parent.attr('class'));
            // // alert(this.parent.hasClass('form-group'));
            // // alert(globalOptions.errorContainer);
            while(!this.parent.hasClass(globalOptions.errorContainer)){
                this.parent = this.parent.parent();
            }
            // // alert('after getting parent');
            
            // // alert('before getting rules');
            
            $.each(rule, function(index, rule){
                var s = rule.split(':');
                // alert(s[0]);
                obj = {};
                obj.name = $.trim(s[0]);
                obj.length = (1 in s)? parseInt(s[1]) : 0;
                obj.status = false;
                obj.message = '';
                self.rules[ obj.name ] = obj;
            });
            
            
            this.log("error Block specified for "+this.getName()+", using specfied block: " + errorBlock);
            if($.type(errorBlock)==='undefined' || $.type(errorBlock)==='null' || !errorBlock.length) {
                this.info("No error Block specified for "+this.getName()+", using default block: " + globalOptions.errorBlock);
                this.errorBlock = globalOptions.errorBlock;
            } else {
                this.log("error Block specified for "+this.getName()+", using specfied block: " + errorBlock);
                this.errorBlock = errorBlock;
            }
        },
        {
            getName: function() { return this.name; },
            getFormElement: function() { return this.formElement; },
            getParent: function(){ return this.parent; },
            getRules: function(){ return this.rules; },
            getRuleStatus: function(ruleName){ return this.rules[ruleName].status; },
            setRuleStatus: function(ruleName, status){ this.rules[ruleName].status = status; },
            getRuleLength: function(ruleName){ return this.rules[ruleName].length; },
            getRule: function(ruleName){ return this.rules[ruleName]; },
            getRuleMessage: function(ruleName){ return this.rules[ruleName].message; },
            setRuleMessage: function(ruleName, msg){ return this.rules[ruleName].message = msg; },
            getErrorBlock: function(){ return this.errorBlock; },
            setStatus: function(status){ if($.type( new Boolean() ) === "boolean" && status) this.processedSuccessfully = true; },
            isOkay: function(){ return this.processedSuccessfully; },
            getElementType: function(){ 
                var type = null, tag;
                type = this.getFormElement().attr('type');
                
                if($.type(type) !== "undefined" && this.getFormElement().prop('tagName').toLowerCase()=="input");
                else if($.type(type)==="undefined")  type = this.getFormElement().prop('tagName').toLowerCase();
                else return null;
                
                return type;
            }
        }
    );

    var Rule = BaseClass.extend(
        function Rule(name, userObj){
                this.type = "Rule";
                this.name = name; 
                // alert('in rule class');

                if(!$.isPlainObject(userObj)) {
                    this.warn("rule definition must be a function or an object");
                    throw new Error("Stopped at processing Rule");
                }

                //handle object.fn
                if(userObj.hasOwnProperty('fn') && $.isFunction(userObj.fn)) {

                  //create ref on the rule, 
                  //function should return true ya false
                  this.fn = userObj.fn;
                  this.message = null;
                  // alert('aftre seting rule as fn()');
                //handle object.regexp
                } else if($.type(userObj.regex) === "regexp") {
                  
                  this.regex = userObj.regex;
                  this.message = userObj.message;
                  //build regex function
                  this.fn = (function(regex) {
                    return function(r) {
                      var re = new RegExp(regex);
                      if(!r.getFormElement().val().match(re))
                        return this.message || "Invalid Format";
                      return true;
                    };

                  })(userObj.regex);

                }
        }, 
        {
            getRuleName: function() { return this.name; },
            getRulefn: function() { return this.fn; }
        }
    );

    var ErrorHandler = BaseClass.extend(
        function ErrorHandler(){
            this.type = "ErrorHandler";
        },
        {
            addErrorMessage: function(formElement, msg){
                // alert('in addErrorMessage');
                var span = $('<span />', {'id':'validationErrorRequired', 'class': 'bg-danger help-block' }).text(msg);
                var elementParent = formElement.getParent();
                var block = formElement.getErrorBlock();
                
                
                this.info('type of errorBlock: '+$.type(block)+" : "+block);
                if($.type(block)==='undefined' || $.type(block)==='null' || ( $.type(block)==='string' && !block.length ) ) {
                    this.info('#validationErrorRequired length: '+elementParent.find('#validationErrorRequired').length);
                    var errorBlockLength = elementParent.find('#validationErrorRequired').length;    
                    if(errorBlockLength==0) {
                        elementParent.append(span);
                    } else if(errorBlockLength==1){
                        elementParent.find('#validationErrorRequired').text(msg);
                    } 
                } else{
                    
                    // alert('error block specified' + block);
                    this.info('error block specified' + block);
                    this.info('error block specified: length: ' + elementParent.find('#'+block).find('#validationErrorRequired').length);
                    var errorBlockContainer = elementParent.find('#'+block);
                    var errorBlockLength = errorBlockContainer.find('#validationErrorRequired').length;
                    if(errorBlockLength == 0) {
                        this.info('setting errorBlock');
                        errorBlockContainer.append(span);
                    } else if (errorBlockLength == 1 ){
                        errorBlockContainer.find('#validationErrorRequired').text(msg);
                    }
                }
                // alert('ending addErrorMessage');
            },
            removeErrorMessage: function(formElement){
                var span = '#validationErrorRequired';
                var elementParent = formElement.getParent();
                var block = formElement.getErrorBlock();
                if($.type(block)!=='undefined' || $.type(block)!=='null' || ( $.type(block)==='string' && !block.length ) ) {
                    if(elementParent.find('#validationErrorRequired').length>0) elementParent.find(span).remove();
                } else{
                    if(elementParent.find('#'+block).find('#validationErrorRequired').length>0) elementParent.find('#'+block).find(span).remove();
                }
            },
            addErrorIndicator: function(formElement){
                var parent = formElement.getParent();
                if(parent.find('.glyphicon-ok').length > 0){
                    parent.find('.glyphicon-ok').remove();
                }
                if(parent.find('.glyphicon-remove').length == 0){
                    parent.append('<span class="glyphicon glyphicon-remove form-control-feedback" aria-hidden="true"></span>');
                }
                this.informError(formElement);
            },
            informError: function (formElement){
                var parent = formElement.getParent();
        
                if(parent.hasClass('has-success')){
                    parent.removeClass('has-success');
                }
                parent.addClass('has-error').addClass('has-feedback');
            },
            addSuccessIndicator: function (formElement){
                var parent = formElement.getParent();
                if(parent.find('.glyphicon-remove').length > 0){
                    parent.find('.glyphicon-remove').remove();
                }
                if(parent.find('.glyphicon-ok').length == 0){
                    parent.append('<span class="glyphicon glyphicon-ok form-control-feedback" aria-hidden="true"></span>');
                }
                this.informSuccess(formElement);
            }, 
            informSuccess: function (formElement){
                var parent = formElement.getParent();
                
                if(parent.hasClass('has-error')){
                    parent.removeClass('has-error');
                }
                parent.addClass('has-success').addClass('has-feedback');
            }

        }

    );


    var FormHandler = BaseClass.extend(
        function FormHandler(){
            this.type = 'FormHandler';

            this.allInputsTrue = [];
            this.formElements = new Object();
            this.isSuccess = true;
            this.errorHandler = new ErrorHandler();
        },
        {
            validateFormElements: function(data){
                
                //take true for all the data keys and check in the end to see if all the keys are true 
                //so to verify inputs of a section and more forward
                log(this.toString()+"starting");
               
                var self = this;
                try{
                    $.each(data, function(index, objKey){
                        // alert(this.toString()+index+objKey);
                        var _formElementID = index+""; //safely typecasting it to a string
                        var _errorBlock = undefined;
                        if(objKey.hasOwnProperty('errorBlock')){
                                _errorBlock = objKey.errorBlock;
                                log('has property block '+_errorBlock+" type of "+typeof(_errorBlock));
                        }
                        var _rule = objKey.rule;
                        //log((typeof(_errorBlock)==="undefined")); // return true
                        // alert('her-1');
                        try{
                            var formElement = new ValidationElement(_formElementID, _rule, _errorBlock );
                            // alert('after fe: '+formElement.getName());
                            self.formElements[formElement.getName()] = formElement;
                        } catch(e){
                            // alert(e);
                        }
                        // alert('after getting form element');
                        // alert('fe components: '+self.formElements[formElement.getName()]);
                        
                        self.formElementsHandler.call(self, self.formElements[formElement.getName()])
                    });
                } catch(e){
                    log("validation form"+e);
                }
                $.each(this.formElements, function(index, data){
                    if(!data.isOkay()){
                        self.isSuccess = false; 
                        return false;
                    }
                });
                log("validation form " + this.isSuccess);
                // alert('haha failed');
                return self.isSuccess;
            },
            formElementsHandler: function (formElement){

                var _retVal = true;
                var _jqElement = formElement.getFormElement();
                var _msg = "";
                var self = this;
                // var _eleType = formElement.getElementType;

                // alert('in form elements handler ');
                // alert(formElement.getRules());
                $.each(formElement.getRules(), function(ruleName, ruleObj){
                    self.info('element Name: '+formElement.getName()+' :rule name: '+ruleName);
                }); 
                
                $.each(formElement.getRules(), function(ruleName, ruleObj){
                    // alert(ruleName);
                    // alert('params: '+ formElement);
                    self.info('element Name: '+formElement.getName()+' : applying rule name: '+ruleName);
                    if(!self.validationHandler.call(self, formElement, ruleName)){
                        self.info('element Name: '+formElement.getName()+' :rule name: '+ruleName + " : returned false");
                        return false;
                    }
                    self.info('element Name: '+formElement.getName()+' :rule name: '+ruleName + " : returned true");
                });

                try{

                    self.info('entering element error indicator setter');
                    $.each(formElement.getRules(), function(index, rule){
                        self.info('formElementStatus'+formElement.getRuleStatus(index));
                        self.info('element.val: '+formElement.getFormElement().val().length );
                        self.info('element.type: '+$.type(formElement.getRule('required')) );
                        if( ($.type(formElement.getRule('required'))==='undefined') && (formElement.getFormElement().val().length > 0 ) ) {
                            if(!formElement.getRuleStatus(index)){
                                
                                var check = formElement.getRuleMessage(index);
                                self.info('formElement Rule Message: '+check);
                            
                                if($.type(check)=='string'){
                                    try{
                                        self.errorHandler.addErrorMessage(formElement, check);
                                    } catch(e){
                                        self.log(e);
                                    }
                                    
                                        if(formElement.getFormElement().prop('tagName').toLowerCase()==='input' && formElement.getElementType().toLowerCase()!=='radio' ){
                                            self.errorHandler.addErrorIndicator(formElement);
                                        } else if( formElement.getElementType()==='select' ) {
                                            self.errorHandler.informError(formElement);
                                        }
                                }

                                _retVal = false;
                                return false;
                            } 
                            
                        } else {

                            if( ($.type(formElement.getRule('required'))!=='undefined') ) { 
                                if(!formElement.getRuleStatus(index)){
                                    
                                    var check = formElement.getRuleMessage(index);
                                    self.info('formElement Rule Message: '+check);
                                
                                    if($.type(check)=='string'){
                                        try{
                                            self.errorHandler.addErrorMessage(formElement, check);
                                        } catch(e){
                                            self.log(e);
                                        }
                                        
                                            if(formElement.getFormElement().prop('tagName').toLowerCase()==='input' && formElement.getElementType().toLowerCase()!=='radio' ){
                                                self.errorHandler.addErrorIndicator(formElement);
                                            } else if( formElement.getElementType()==='select' ) {
                                                self.errorHandler.informError(formElement);
                                            }
                                    }

                                    _retVal = false;
                                    return false;
                                } 
                          }   
                        }
                        
                    });
                } catch(e){
                    this.log(e);
                }

                log("validator " + _retVal);
                // alert('formElementsHandler'+_retVal);

                if(_retVal){
                    
                    self.errorHandler.removeErrorMessage(formElement);
                    if(formElement.getFormElement().prop('tagName').toLowerCase()==='input' && formElement.getElementType().toLowerCase()!=='radio' ) {
                        self.errorHandler.addSuccessIndicator(formElement);
                    } else if( formElement.getElementType()==='select' ) {
                        self.errorHandler.informSuccess(formElement);
                    }

                    formElement.setStatus(true);
                }
                //return _retVal;
            }, 
            validationHandler: function(r, ruleName){
                var retVal = false;
                // alert('handling input');
                // alert('before making rule');
                try{
                    var rr = $.validateIt.getRawRules();
                    $.each(rr, function(i, v){
                        // alert(i+', '+v);
                        // alert('type of rule: '+$.type(i));
                    });
                    // alert($.validateIt.getRule(ruleName));
                    var rule = new Rule(ruleName, $.validateIt.getRule(ruleName));
                    var check = rule.fn(r);
                    
                    // alert(check);
                    this.info('status for rule('+ruleName+') applied on element('+r.getName()+'): '+check);

                    if($.type(check)==='boolean' && check){
                        r.setRuleStatus(ruleName, true);
                        r.setRuleMessage(ruleName, '');
                        retVal = true;
                    } else if($.type(check)=='string'){
                        r.setRuleStatus(ruleName, false);
                        r.setRuleMessage(ruleName, check);
                        retVal = false;
                    }

                } catch(e){
                    this.warn(e);
                }
                log("handleRequired inputs " + retVal);
                // alert('ret'+retVal);
                return retVal;
            }
        }
    );
    
    $.validateIt.addRule({
        required: {
            fn: function(r){
                var element = r.getFormElement();
                var eleType = r.getElementType();

                // alert('in required');
                // alert("eleType "+eleType);
                if($.type(eleType)==="null") return 'There is no type for this element to check for this field';

                if(eleType=='radio'){
                    if(!element.is(':checked')) {
                        return 'Please select one radio option.';
                    }
                } else {
                    var value = element.val().toLowerCase();
                    if(eleType=="select"){
                        if(value=="invalid") {
                            return 'Please select one option';
                        }
                    } else {
                        if(!value.length) {
                            return 'This field is required';
                        }
                    }

                }
                return true;
            }
        },
        email: {
          regex: /^(([^<>()\[\]\\.,;:\s@\"]+(\.[^<>()\[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          message: "Invalid email address"
        },
        number: {
          regex: /^\d+$/,
          message: "Use digits only"
        },
        alphaNumeric: {
          regex: /^[-,\\0-9A-Za-z ]+$/,
          message: "Use digits and letters only"
        },
        alphaDash: {
          regex: /^[0-9A-Za-z- ]+$/,
          message: "Use digits and letters only"
        }
    });

})( jQuery, window, document );