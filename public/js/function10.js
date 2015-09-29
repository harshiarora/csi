var mp;
var url = 'http://localhost/';
var formElements = [
	//first object of form elements to be checked for 1st next button click
	{
		//name attribute value of the form input element
		"membership-period": {
			rule: [
				'required'
			]	
		},
		"salutation": {
			rule: [
				'required'
			]	
		},
		"fname": {
			rule: [
				'required',
				'alphaDash'
			]	
		},
		"mname": {
			rule: [
				'alphaDash'
			]	
		},
		"lname": {
			rule: [
				'required',
				'alphaDash'
			]	
		},
		"card_name": {
			rule: [
				'required',
				'alphaDash'
			]	
		},
		"dob": {
			rule: [
				'required',
				'alphaDash'
			]	
		},
		"gender": {
			rule: [
				'required'
			]	
		},
	},
	//similarly second
	{
		"country": {
			rule: [
				'required'
			]	
		},
		"state": {
			rule: [
				'required'
			]
		},
		"chapter": {
			rule: [
				'required'
			]	
		},
		"address": {
			rule: [
				'required',
				'alphaNumeric'	
			]	
		},
		"city": {
			rule: [
				'required',
				'alphaDash'	
			]	
		},
		"pincode": {
			rule: [
				'required',
				'number'	
			]	
		},
		
	},
	//dont ask now seriously
	{
		"email1": {
			rule: [
				'required',
				'email'
			]	
		},
		"email2": {
			rule: [
				'email'
			]
		},
		"std": {
			rule: [
				'required',
				'number'
			],
			// aah, new thing; FYI it has to an ID attribute value of the element 
			errorBlock: 'errorSTD'
		},
		"phone": {
			rule: [
				'required',
				'number'	
			],
			errorBlock: 'errorPhone'
		},
		"country-code": {
			rule: [
				'required',
				'number'
			],
			// aah, new thing; FYI it has to an ID attribute value of the element 
			errorBlock: 'errorCountry'
		},
		"mobile": {
			rule: [
				'required',
				'number'	
			],
			errorBlock: 'errorMobile'
		}
		
	},
	//dont ask now seriously
	{
		"organisation": {
			rule: [
				'required',
				'alphaDash'
			]
		},
		"designation": {
			rule: [
				'required',
				'alphaDash'
			]	
		}
		
	},
	//dont ask now seriously
	{
		"paymentMode": {
			rule: [
				'required'
			]	
		},
		"bank": {
			rule: [
				'required',
				'alphaDash'
			]
		},
		"drawn": {
			rule: [
				'required',
				'alphaDash'
			]	
		},
		"branch": {
			rule: [
				'required',
				'alphaDash'
			]
		},
		"tno": {
			rule: [
				'required',
				'alphaDash'
			],
		},
		"paymentReciept": {
			rule: [
				'required'
			]
		},
		"amountPaid": {
			rule: [
				'required',
				'number'	
			],
		}
		
	},
	
];
$(document).ready(function() {
  $.validateIt({
  	debug: false
  });
});
/*
$(document).ready(function(){
	
	var originalPadding = $('body').css('padding-top');
	var isExpanded = false;
	var isNavbarFixedToggled = false;
	var newPadding = parseInt(originalPadding);
	var windowWidth = 0;
	console.log(originalPadding);
	
	//when toggle button for navbar is clicked, set body padding to match fixed-nav styles
	$('#navbar_fixed_top').click(function(){
		
		if(!isNavbarFixedToggled){
			// getting the last div of the div containing this clicked button
			var div = $(this).parent().siblings(':last');
			var offsetHeight = div.outerHeight();
			console.log(offsetHeight);
			console.log(div.prop('id'));
			newPadding += offsetHeight + 10;
			console.log(newPadding);
			isNavbarFixedToggled = true;
		}
		
		//menu is not expanded then set the body padding to new one
		if(!isExpanded){
			$('body').css('padding-top', newPadding +'px');
			isExpanded = true;
		} else if(isExpanded){
			//menu is collapsed then set the body padding to old one
			$('body').css('padding-top', originalPadding);
			isExpanded = false;
		}
	});
	
	//when resizing the window, set body padding to match fixed-nav styles
	$( window ).resize(function() {
	  	windowWidth = $(window).width();
	  	console.log( windowWidth );
		
		if(windowWidth < 768){
			if(isExpanded){
				if(isNavbarFixedToggled){
					$('body').css('padding-top', newPadding +'px');
				}
			}
		} else if(isExpanded){
				if(isNavbarFixedToggled){
					$('body').css('padding-top', originalPadding);
				}
		}
	});
	
	
	var pos = $('#main-nav-bar').position();
	$('#brand_logo').hide();
	      	  
	  mainBarScrollHandler(window);
	  console.log($(this).scrollTop());
	  $(window).scroll(function(){
			mainBarScrollHandler(this);
	  });
});
*/
// handle scroll event styles for main bar
function mainBarScrollHandler(element){
	
	if ( $(window).scrollTop() > 157 ){
		$('#main-nav-bar').addClass('fixed').addClass('slideDown');
      	  
	      	$('body').removeClass('p-157');
	      	 $('body').addClass('p-210');
  		  
      	  $('#csi-logo').css({'visibility': 'hidden'});
      	  $('#brand_logo').css('width', '200px').fadeIn();

      	  return true;
	}

	 if ($(element).scrollTop() > 135) {
      	  $('#main-nav-bar').addClass('fixed').addClass('slideDown');
      	  if($(this).scrollTop()>157){
	      	 if($('body').hasClass('p-157')){
	      	  	$('body').removeClass('p-157');
	      	 }
	      	 $('body').addClass('p-210');
  		  }else {
      	  	if($('body').hasClass('p-210')){
      	  		$('body').removeClass('p-210');
      	  	}
      	  	$('body').addClass('p-157');
      	  }
      	  $('#csi-logo').css({'visibility': 'hidden'});
      	  $('#brand_logo').css('width', '200px').fadeIn();
      } else {
	      $('#brand_logo').css('width', 0).fadeOut(50);
      	  if($('body').hasClass('p-157')){
      	  	$('body').removeClass('p-157');
      	  }
      	  if($('body').hasClass('p-210')){
      	  	$('body').removeClass('p-210');
      	  }
      	  $('#csi-logo').css({'visibility': 'visible'});
          $('#main-nav-bar').removeClass('fixed').removeClass('slideDown');
      }
}


//datepicker ui settings
$(document).ready(function(){
	var today = new Date();
	var studentLastDate = new Date(today.getFullYear() -15, 1, 1);
	var professionalLastDate = new Date(today.getFullYear() -18, 1, 1);
	
	$("#dob_student").datepicker({
		dateFormat : 'yy-mm-dd',
		changeMonth: true,
	    changeYear: true, 
	    maxDate: new Date(today-100, 1,1),
	    hideIfNoPrevNext: true,
	    yearRange:  "-100:+0"
	}).val();
	$("#dob_professional").datepicker({
		dateFormat : 'yy-mm-dd',
		changeMonth: true,
	    changeYear: true, 
	    maxDate: professionalLastDate,
	    maxDate: new Date(today-100, 1,1),
	    hideIfNoPrevNext: true,
	    yearRange: '-100:+0'
	}).val();
	$("#drawn_on").datepicker({
        changeMonth: true,
        changeYear: true,
		dateFormat : 'yy-mm-dd'
	}).val();
	
});


//for-steps magic
$(document).ready(function(){
	
	
	var stepText = $('#progressbar li.active').text();
	console.log(stepText);
	var totalSteps = $('.steps').size();
	var stepIndex = $('.steps').index(nextStep);
	console.log(stepIndex+"/"+totalSteps);
	
	$('#stepText').text(stepText);
	
	var subText = $('<small />', {'class': 'ph-small'}).text(stepIndex+"/"+totalSteps);
	$('#stepText').append(subText).addClass('slideDown');
	
	$('#submit').validateIt(formElements[4], function(){
		return true;
	});
	


	// var curr = $('.steps:first');
	// console.log(curr);
	// curr.parent().outerHeight(curr.outerHeight()+'px');

	var currentStep, nextStep, previousStep;
	var transx, opacity;
	var isAnimating = false; //hacks to multiple clicks
	
	$('.next').validateIt(formElements, function(ele){
			'use strict';
			if(isAnimating){
				console.log('returned');
				return false;
			}
			isAnimating = true;
			
			// preventing the button click to reload page, we don't want this
			
			//console.log(validateFormSection(formElements[stepIndex])+" return value for validation");
			// console.log("type of formElements"+typeof(formElements)+formElements.length+" "+stepIndex);
			// console.log(formElements);
			// if(formElements.length>stepIndex){
			// 	if(!validateFormSection(formElements[stepIndex])){
			// 		isAnimating = false;
			// 		return false;
			// 	}
			// } else{
			// 	console.log("array index out of bounds");
			// 	return false;
			// }
			
			// taking the current containting div		
			currentStep = $(ele).parent();
			// taking the next sibling div
			nextStep = $(ele).parent().next();
			
			
			$('#progressbar li').eq($('.steps').index(nextStep)).addClass('active');
			stepIndex = $('.steps').index(nextStep);
			stepText = $('#progressbar li').eq($('.steps').index(nextStep)).text();
			console.log(stepText);
			//$('#stepText').text(stepText).hide().slideDown();
			console.log($('#stepText').hasClass('slideDown'));
			if($('#stepText').hasClass('slideDown')){
				$('#stepText').removeClass('slideDown').show();
			}
			
			$('#stepText').text(stepText);
			var subText = $('<small />', {'class': 'ph-small'}).text(stepIndex+1+"/"+totalSteps);
			$('#stepText').append(subText).addClass('slideDown');
			
			nextStep.css({'transform': 'translateX(0%)'});
			nextStep.show();

			// var nextHeight = nextStep.outerHeight();
			// console.log(nextHeight);
			// currentStep.parent().outerHeight(nextHeight+'px');
			currentStep.animate({opacity: 0}, {
				step: function(now, mx){
					var left;
					// reducing from 20% of now to 0
					//transx = (1-(1-(now))*200);
					transx = (50*(1-now));
					//console.log(transx);
					//next from left 50 to 0
					left = (50*now);
					opacity = 1-now;
					
					currentStep.css({'transform': 'translateX('+transx+'%)'  });
					nextStep.css({'left': left+'%', 'opacity': opacity});
				},
				duration: 800,
				easing: 'easeInOutCubic',
				complete: function(){
					currentStep.hide();
					isAnimating = false;
				}
				
			});
					
			
		});
	
	
	$('.previous').click(function(e){
		
		if(isAnimating){
			return false;
		}
		
		isAnimating = true;
		// preventing the button click to reload page, we don't want this
		e.preventDefault();
		
		// taking the current containting div		
		currentStep = $(this).parent();
		// taking the next sibling div
		previousStep = $(this).parent().prev();
		
		$('#progressbar li').eq($('.steps').index(nextStep)).removeClass('active');
		stepText = $('#progressbar li').eq($('.steps').index(previousStep)).text();
		stepIndex = $('.steps').index(previousStep);
		console.log(stepText);
		//$('#stepText').text(stepText).hide().slideDown();
		console.log($('#stepText').hasClass('slideDown'));
		if($('#stepText').hasClass('slideDown')){
			$('#stepText').removeClass('slideDown').show();
		}
		
		$('#stepText').text(stepText);
		var subText = $('<small />', {'class': 'ph-small'}).text(stepIndex+1+"/"+totalSteps);
		$('#stepText').append(subText).addClass('slideDown');
		
		
		previousStep.css({'transform': 'translateX(0%)'});
		previousStep.show();
		
		// var prevHeight = previousStep.outerHeight();
		// currentStep.parent().outerHeight(prevHeight);
		
		currentStep.animate({opacity: 0}, {
			step: function(now, mx){
				
				// reducing from 20% of now to 0
				//transx = (1-(1-(now))*200);
				transx = (50*(1-now));
				//console.log(transx);
				//next from left 50 to 0
				left = (50*now);
				console.log(left);
				opacity = 1-now;
				
				currentStep.css({'transform': 'translateX('+transx+'%)'  });
				previousStep.css({'left': left+'%', 'opacity': opacity});
			},
			duration: 800,
			easing: 'easeInOutCubic',
			complete: function(){
				currentStep.hide();
				isAnimating = false;
			}
		});
	});
	
	
});



$(document).ready(function() {

	mp = $('input:radio[name="membership-period"]:checked').val();
	
	var valueSelected = $('select[name="country"] option:selected').val();
	
	request_amount();
	request_states(valueSelected);
	request_states(valueSelected);
	
	$('input:radio[name="membership-period"]').change(function() {
		//indian
		if (this.checked) {
			// note that, as per comments, the 'changed'
			// <input> will *always* be checked, as the change
			// event only fires on checking an <input>, not
			// on un-checking it.
			// append goes here
			mp = parseInt(this.value);
			request_amount();
		}
	});
	$('input:radio[name="membership-type"]').change(function() {
		//indian
		if (this.checked && parseInt(this.value) != 0) {
			// note that, as per comments, the 'changed'
			// <input> will *always* be checked, as the change
			// event only fires on checking an <input>, not
			// on un-checking it.
			// append goes here

			mt = parseInt(this.value);
			if (mp != 0 && mt != 0) {
				request_amount();
			}
		}
	});
	
	$('select[name="country"]').keydown(function(e) {
	   console.log('keyup called');
	   var code = e.keyCode || e.which;
	   if (code == '9') {
	     console.log('Tab pressed');
	     var optionSelected = $("option:selected", this);
		var valueSelected = this.value;
		console.log(valueSelected);
		
		request_amount();
		request_states(valueSelected);
	
	   }
	
	});
	$('#state').keydown(function(e) {
	   console.log('keyup called');
	   var code = e.keyCode || e.which;
	   if (code == '9') {
	     console.log('Tab pressed');
	     console.log($('#state').has('option').length ==0);
		if( $('#state').has('option').length == 0 ){
			console.log('Please select country first');
		}else{
			var optionSelected = $("option:selected", this);
			var valueSelected = this.value;
			console.log(valueSelected);
			
			console.log(typeof($(this).data('state')));
			if( $(this).data('state') ==0 ){
				request_chapters(valueSelected);
				if($('#asoc_inst').length > 0){
					request_asoc_inst(valueSelected);
				}
			} else if( $(this).attr('data-state') ==1 ){
				request_student_branches(valueSelected);
			}
			
		}
	
	   }
	
	});
	
	$('#chapter').on('click', function(e) {
		console.log($('#state').has('option').length ==0);
		if( $('#state').has('option').length == 0 ){
			console.log('Please select country first');
		}else{
			
		}
	});

	$('select[name="country"]').on('click', function(e) {
		var optionSelected = $("option:selected", this);
		var valueSelected = this.value;
		console.log(valueSelected);
		
		request_amount();
		request_states(valueSelected);
	});
	
	$('#state').on('click', function(e){
		console.log($('#state').has('option').length == 0);
		
		
		
		if( $('#state').has('option').length == 0 ){
			console.log('Please select country first');
			//repeating code here to test with one country only
			
			var valueSelected = $('select[name="country"] option:selected').val();
			console.log(valueSelected);
			request_amount();
			request_states(valueSelected);
			
		}else{
			var optionSelected = $("option:selected", this);
			var valueSelected = this.value;
			console.log(valueSelected);
			
			console.log(typeof($(this).data('state')));
			if( $(this).data('state') ==0 ){
				request_chapters(valueSelected);
			} else if( $(this).attr('data-state') ==1 ){
				request_student_branches(valueSelected);
			}
			
		}
	});
	
	$('#chapter').on('click', function(e){
		console.log($('#state').has('option').length ==0);
		if( $('#state').has('option').length == 0 ){
			console.log('Please select country first');
		}else{
			
		}
	});
	
});

function request_amount() {
	
	if( (mp!=0) && ( 'invalid'!==$('#country').val().toLowerCase() ) ) {
		
		console.log($('#country').val());
		
		var sendInfo = {
		   	country_code : $('#country').val(),
			mem_period : mp
		};
		$.ajax({
			url : url+"register/getresource/amount",
			method : "POST",
			async : true,
			dataType: "json",
			data : sendInfo
		}).success(function(data) {
			if (console && console.log) {
				console.log("Sample of data:"+ data.amount);
			}
			try{			
						var amount = parseFloat(data.amount);
						console.log(amount);
						var tax = parseFloat(data.service_tax);
						var total = (amount + ((amount*tax)/100));
						console.log(total);
			} catch(e){
				console.log(e);
			}

			var span = $('<span />', {
				html: 'Membership Fee: '+data.amount+'<br/> Service Tax: '+data.service_tax+'0#37<br/> Total Payable Amount: '+total
			});
			//console.log(span);
			$('#fee').text(data.amount);
			$('#tax').text(data.service_tax);
			$('#payable').text(total);
		}).fail(function(data) {
			alert('some technical error occured. please try again later');
		});
	}
}

function request_states(country_code) {

	var sendInfo = {
		code : country_code
	};

	$.ajax({
		url : url+"register/getresource/states",
		method : "POST",
		async : true,
		dataType: "json",
		data : sendInfo
	}).success(function(data) {
		if (console && console.log) {
			console.log("Sample of data:", (data!="[]")? data: "false");
			$('#state').empty();
			$.each(data, function(idx, obj) {
				$('#state').append($('<option>', { 
			        value: obj.state_code,
			        text : obj.name 
			    }));
			});
		}
		//$('#amount').text(data);
	}).fail(function(data) {
		alert('some technical error occured. please try again later');
	});
}
function request_student_branches(state_code) {


	var sendInfo = {
		code : state_code
	};
	$.ajax({
		url : url+"register/getresource/branches",
		method : "POST",
		async : true,
		dataType: "json",
		data : sendInfo
	}).success(function(data) {
		if (console && console.log) {
			console.log("Sample of chapter data:", (data!="[]")? data: "false");
			console.log("Student branch data: "+(data != "null"));
			
			
			$('#stud_branch').empty();
			//re-define this service to safely type cast receiving data as of null type
			if((data) != "null"){
				$.each(data, function(idx, obj) {
					console.log(obj.chapter_name);
					$('#stud_branch').prepend($('<option>', { 
				        value: obj.member_id,
				        text : obj.name
				        
				    }));
				    
				});
			} else{
				$('#stud_branch').prepend($('<option>', { 
				        value: '',
				        text : 'No student branches are available for selected state'
				        
				    }));
			}
		}
		//$('#amount').text(data);
	}).fail(function(data) {
		//alert('some technical error occured. please try again later');
	});
}
function request_chapters(state_code) {

	var sendInfo = {
		code : state_code
	};

	$.ajax({
		url : url+"register/getresource/chapters",
		method : "POST",
		async : true,
		dataType: "json",
		data : sendInfo
	}).success(function(data) {
		if (console && console.log) {
			console.log("Sample of chapter data:", (data!="[]")? data: "false");
			
			$('#chapter').empty();
			if(data!="[]"){
				$.each(data, function(idx, obj) {
					console.log(obj.chapter_name);
					$('#chapter').prepend($('<option>', { 
				        value: obj.id,
				        text : obj.name
				        
				    }));
				    
				});
			} else{
				$('#chapter').prepend($('<option>', { 
				        value: '',
				        text : 'No Chapter available for selected state'
				        
				 }));
			}
		}
		
		//$('#amount').text(data);
	}).fail(function(data) {
		alert('some technical error occured. please try again later');
	});
}

//getting all the asoc inst for a prof member .. revise this later acc to buz. logic
function request_asoc_inst(state_code) {

	var sendInfo = {
		code : state_code
	};

	$.ajax({
		url : url+"register/getresource/institutions",
		method : "POST",
		async : true,
		dataType: "json",
		data : sendInfo
	}).success(function(data) {
		if (console && console.log) {
			console.log("Sample of chapter data:", (data!="[]")? data: "false");
			
			$('#asoc_inst').empty();
			$.each(data, function(idx, obj) {
				console.log(obj.chapter_name);
				$('#asoc_inst').prepend($('<option>', { 
			        value: obj.member_id,
			        text : obj.name
			        
			    }));
			    
			});
		}
		//$('#amount').text(data);
	}).fail(function(data) {
		alert('some technical error occured. please try again later');
	});
}





/////
// garbage to delete below//
/////
function validateFormSection(obj){
	
	var retVal = false;
	//take true for all the obj keys and check in the end to see if all the keys are true so to verify inputs of a section and more forward
	var allInputsTrue = new Object();
	$.each(obj, function(index, objKey){
		// console.log("index type");
		// console.log(typeof(index));
		// console.log(index);
		// console.log("objKey type");
		// console.log(typeof(objKey));
		// console.log(objKey);
		
		var element = index+""; //safely typecasting it to a string
		var errorBlock = undefined;
		$.each(objKey.rule, function(idx, rule){
			// console.log("index type");
			// console.log(typeof(idx));
			// console.log(idx);
			// console.log("objKey type");
			// console.log(typeof(rule));
			// console.log(rule);
			
			if(objKey.hasOwnProperty('errorBlock')){
				errorBlock = objKey.errorBlock;
				console.log('has property block '+errorBlock+" type of "+typeof(errorBlock));
			}
			//console.log((typeof(errorBlock)==="undefined")); // return true
			
			if(!validator(element, rule, errorBlock)){
				retVal = false;
				// to sequence the rule as they are given; remove this return statement to show all the validation errors at once
				return false;
			} else{
				retVal = true;
			}	
		});
		
		if(retVal){
			console.log("type if index "+typeof(index));
			allInputsTrue[index] = true;
		} else{
			console.log("type if index ");
			console.log(typeof(index));
			allInputsTrue[index] = false;
		}
	});
	
	console.log(allInputsTrue);
	console.log(typeof(allInputsTrue));
	$.each(allInputsTrue, function(index, data){
		console.log(index);
		console.log(data);
		if(data){
			retVal = true;
		}else{
			retVal = false;
			return false;
		}
		
	});
	
	console.log("validation form " + retVal);
	return retVal;
}


function validator(element, rule, errorBlock){
	// console.log("in validator");
	// console.log(typeof(element));
	// console.log(element);
	// console.log(typeof(rule));
	// console.log(rule);
	
	var retVal = false;
	var jqElement = $("input[name='"+element+"']");
	var msg = "";
	var eleType = jqElement.attr('type');
	console.log(typeof(eleType));
	console.log(jqElement);
	console.log(eleType);
	console.log((typeof(eleType)==="undefined")? "it is undefiend": "dalse");
	
	//if there is no type attr, then check if its select tag
	if(typeof(eleType)==="undefined"){
		var jqElement = $("select[name='"+element+"']");
		console.log(jqElement);
		var eleTag = jqElement.prop('tagName');
		console.log(eleTag.toLowerCase());
		if(eleTag.toLowerCase()=="select"){
			eleType = "select";
		}
	}
		
	switch($.trim(rule)){
		case 'required':

			msg = "this field is required";
			
			switch($.trim(eleType)){
				case 'radio':
					if(handleRequiredRadios(element, msg, errorBlock)){
						retVal = true;
					} else{
						retVal = false;
					}
					break;
				case 'select':
					if(handleRequiredSelect(element, msg, errorBlock)){
						retVal = true;
					} else{
						retVal = false;
					}
					break;
				case 'file':
				case 'text':
				case 'email':
				case 'number':
				case 'date':
				
					if(handleRequiredInputs(element, msg, errorBlock)){
						retVal = true;
					} else{
						retVal = false;
					}
					
					break;
			}
			break;
		case 'alphaNumeric':
			
			msg = "this field can handle only numbers and alphabets";
			
			switch($.trim(eleType)){
				case 'text':
				case 'email':
				case 'number':
				case 'date':
					
					if(handleAlphaNumericInputs(element, msg, errorBlock)){
						retVal = true;	
					} else{
						retVal = false;
					}
					break;
			}
			break;
		case 'numeric':
			
			msg = "Please Enter numeric digits only";
			
			switch($.trim(eleType)){
				case 'text':
				case 'email':
				case 'number':
				case 'date':
					
					if(handleNumericInputs(element, msg, errorBlock)){
						retVal = true;	
					} else{
						retVal = false;
					}
					break;
			}
			break;
		case 'email':
			
			msg = "Please Enter a valid Email Address";
			
			switch($.trim(eleType)){
				case 'text':
				case 'email':
				case 'number':
				case 'date':
					
					if(handleEmailInputs(element, msg, errorBlock)){
						retVal = true;	
					} else{
						retVal = false;
					}
					break;
			}
			break;
	}
	
	console.log("validator " + retVal);
	return retVal;
}

// // handles required rule for radio buttons
// function handleRequiredRadios(elementName, msg, errorBlock){
// 	var retVal = false;
	
// 	var jqElement = $("input[name='"+elementName+"']");
// 	if(!jqElement.is(':checked')){
// 		if(jqElement.parent().parent().find('#validationErrorRequired').length==0){
// 			var span = $('<span />', {'id':'validationErrorRequired', 'class': 'bg-danger help-block' }).text(msg);
// 			jqElement.parent().parent().append(span);
			
// 			retVal = false;
// 		}
// 	} else if(jqElement.is(':checked')){
// 		jqElement.parent().parent().find("#validationErrorRequired").remove();
		
// 		retVal = true;
// 	}
	
// 	console.log("handleRequiredRadios " + retVal);
// 	return retVal;
// }

// // handles required rule for select option
// function handleRequiredSelect(elementName, msg, errorBlock){
// 	var retVal = false;
	
// 	var jqElement = $("select[name='"+elementName+"']");
	
// 	if(jqElement.val()=="invalid"){
// 		if(jqElement.parent().find('#validationErrorRequired').length==0){
// 			var span = $('<span />', {'id':'validationErrorRequired', 'class': 'bg-danger help-block' }).text(msg);
// 			jqElement.parent().append(span);
			
// 			retVal = false;
// 		}
// 	} else if(jqElement.val()!="invalid"){
// 		jqElement.parent().find("#validationErrorRequired").remove();
		
// 		retVal = true;
// 	}
	
// 	console.log("handleRequiredSelect " + retVal);
// 	return retVal;
// }

// //handles require rule for all inputs
// function handleRequiredInputs(elementName, msg, errorBlock){
// 	var retVal = false;
	
// 	console.log('in handle required inputs '+errorBlock);
	
// 	var jqElement = $("input[name='"+elementName+"']");
// 	var elementValue = jqElement.value;
	
// 	if(0==jqElement.val().length){

// 		var span = $('<span />', {'id':'validationErrorRequired', 'class': 'bg-danger help-block' }).text(msg);
		
// 		if(errorBlock===undefined){
// 			console.log('here');
// 			if(jqElement.parent().find('#validationErrorRequired').length==0){
// 				jqElement.parent().append(span);
				
// 			}
// 		} else{
// 			console.log('here2');
// 			jqElement.parent().parent().find('#'+errorBlock).append(span);
// 		}
		
// 		addErrorIndicator(jqElement);
// 		informError(jqElement);
		
// 		retVal = false;
		
// 	} else if(jqElement.val().length > 0){
// 		if(errorBlock===undefined){
// 			(jqElement.parent().find('#validationErrorRequired').length > 0)? jqElement.parent().find('#validationErrorRequired').remove(): $.noop();
// 		} else{
// 			jqElement.parent().parent().find('#'+errorBlock).find('#validationErrorRequired').remove();
// 		}
		
// 		addSuccessIndicator(jqElement);
// 		informSuccess(jqElement);
		
// 		retVal = true;
// 	}
	
// 	console.log("handleRequiredInputs " + retVal);
// 	return retVal;
// }

// //handles alphaNumeric rule for all inputs
// function handleAlphaNumericInputs(elementName, msg, errorBlock){
// 	var retVal = false;
	
// 	var jqElement = $("input[name='"+elementName+"']");
// 	var elementValue = jqElement.val();
	
// 	var regExpression = new RegExp('^[^@#$%\^&~!*"]+$', "i");
	
// 	if (regExpression.test(elementValue)) {
//         console.log('Great, you entered an valid input!');
		
// 		if(jqElement.parent().find('#validationErrorAlphaNumeric').length){
// 			jqElement.parent().find('#validationErrorAlphaNumeric').remove();
// 		}
		
// 		addSuccessIndicator(jqElement);
// 		informSuccess(jqElement);
		
// 		retVal = true;
// 	} else{
// 		if(jqElement.parent().find('#validationErrorAlphaNumeric').length==0){
// 			var span = $('<span />', {'id':'validationErrorAlphaNumeric', 'class': 'bg-danger help-block' }).text(msg);
// 			jqElement.parent().append(span);
// 		}
		
		
// 		addErrorIndicator(jqElement);
// 		informError(jqElement);
// 		retVal = false;
// 	}
	
// 	console.log("handle alpha numeric " + retVal);
// 	return retVal;
// }

// // handles numeric rule for all inputs
// function handleNumericInputs(elementName, msg, errorBlock){
// 	var retVal = false;
	
// 	console.log('handle numeric inputs '+errorBlock);
	
// 	var jqElement = $("input[name='"+elementName+"']");
// 	var elementValue = jqElement.val();
	
// 	var regExpression = new RegExp('^[0-9]+$', "i");
	
// 	if (regExpression.test(elementValue)) {
//         console.log('Great, you entered an valid input!');
		
// 		if(errorBlock===undefined){
// 			if(jqElement.parent().find('#validationErrorAlphaNumeric').length){
// 				jqElement.parent().find('#validationErrorAlphaNumeric').remove();
// 			}
// 		} else{
// 			jqElement.parent().parent().find('#'+errorBlock).text('');
// 		}
		
// 		addSuccessIndicator(jqElement);
// 		informSuccess(jqElement);
		
// 		retVal = true;
// 	} else{
// 		if(errorBlock===undefined){
// 			if(jqElement.parent().find('#validationErrorAlphaNumeric').length==0){
// 				var span = $('<span />', {'id':'validationErrorAlphaNumeric', 'class': 'bg-danger help-block' }).text(msg);
// 				jqElement.parent().append(span);
// 			}
// 		} else{
// 			jqElement.parent().parent().find('#'+errorBlock).text(msg);
// 		}
	
// 		addErrorIndicator(jqElement);
// 		informError(jqElement);
		
// 		retVal = false;
// 	}
	
// 	console.log("handle alpha numeric " + retVal);
// 	return retVal;
// }

// // handles email rule for all inputs
// function handleEmailInputs(elementName, msg, errorBlock){
// 	var retVal = false;
	
// 	var jqElement = $("input[name='"+elementName+"']");
// 	var elementValue = jqElement.val();
	
// 	var regExpression = new RegExp('^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$', "i");
	
// 	if (regExpression.test(elementValue)) {
//         console.log('Great, you entered an valid input!');
		
// 		if(jqElement.parent().find('#validationErrorAlphaNumeric').length){
// 			jqElement.parent().find('#validationErrorAlphaNumeric').remove();
// 		}
		
// 		addSuccessIndicator(jqElement);
// 		informSuccess(jqElement);
		
// 		retVal = true;
// 	} else{
// 		if(jqElement.parent().find('#validationErrorAlphaNumeric').length==0){
// 			var span = $('<span />', {'id':'validationErrorAlphaNumeric', 'class': 'bg-danger help-block' }).text(msg);
// 			jqElement.parent().append(span);
// 		}
		
// 		addErrorIndicator(jqElement);
// 		informError(jqElement);
		
// 		retVal = false;
// 	}
	
// 	console.log("handle email " + retVal);
// 	return retVal;
// }

// // add error glyph to input tag
// function addErrorIndicator(jqElement){
// 	if(jqElement.parent().find('.glyphicon-ok').length > 0){
// 		jqElement.parent().find('.glyphicon-ok').remove();
// 	}
// 	if(jqElement.parent().find('.glyphicon-remove').length == 0){
// 		jqElement.parent().append('<span class="glyphicon glyphicon-remove form-control-feedback" aria-hidden="true"></span>');
// 	}
// }

// // add error classes to input's parent
// function informError(jqElement){
// 	var parent = jqElement.parent();
// 	while(!parent.hasClass('form-group')){
// 		parent = parent.parent();
// 	}
	
// 	if(parent.hasClass('has-success')){
// 		parent.removeClass('has-success');
// 	}
// 	parent.addClass('has-error').addClass('has-feedback');
// }


// // add success glyph to input tag
// function addSuccessIndicator(jqElement){
// 	if(jqElement.parent().find('.glyphicon-remove').length > 0){
// 		jqElement.parent().find('.glyphicon-remove').remove();
// 	}
// 	if(jqElement.parent().find('.glyphicon-ok').length == 0){
// 		jqElement.parent().append('<span class="glyphicon glyphicon-ok form-control-feedback" aria-hidden="true"></span>');
// 	}
// }

// // add error classes to input's parent
// function informSuccess(jqElement){
// 	var parent = jqElement.parent();
// 	while(!parent.hasClass('form-group')){
// 		parent = parent.parent();
// 	}
	
// 	if(parent.hasClass('has-error')){
// 		parent.removeClass('has-error');
// 	}
// 	parent.addClass('has-success').addClass('has-feedback');
// }
