  <header>
        <nav class="navbar navbar-default navbar-fixed-top">
          <div class="container-fluid">
            <div class="navbar-header">
              <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar1" id="navbar_fixed_top" aria-expanded="false" aria-controls="navbar">
                <span class="sr-only">Toggle navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
              </button>
            </div>
            <div id="navbar1" class="navbar-collapse collapse">
             <!-- <ul class="nav navbar-nav">
                <li class="active"><a href="#">Home</a></li>
                <li><a href="#about">About</a></li>
                <li><a href="#contact">Contact</a></li>
                <li class="dropdown">
                  <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Dropdown <span class="caret"></span></a>
                  <ul class="dropdown-menu">
                    <li><a href="#">Action</a></li>
                    <li><a href="#">Another action</a></li>
                    <li><a href="#">Something else here</a></li>
                    <li role="separator" class="divider"></li>
                    <li class="dropdown-header">Nav header</li>
                    <li><a href="#">Separated link</a></li>
                    <li><a href="#">One more separated link</a></li>
                  </ul>
                </li>
             </ul>-->
              <ul class="nav navbar-nav navbar-right">
                @if ( Auth::user()->check() )
                    <li><a href={{ url("logout") }}><span class="glyphicon glyphicon-log-out"></span> logout <span style="font-family:'open sans condensed', sans-serif; font-weight:normal; text-transform: lowercase;">{ {{ Auth::user()->user()->email }} }</span></a></li>
                @else
                    <li><a href={{ url("login") }}><span class="glyphicon glyphicon-log-in"></span>&nbsp;login</a></li>
                @endif
                {{-- <li class="active"><a href="./">Fixed top <span class="sr-only">(current)</span></a></li> --}}
              </ul>
            </div><!--/.nav-collapse -->
          </div>
        </nav>
        
        <div class="container">
            <div class="row">
                <div class="col-md-12" id="csi-logo">
                    <img src={{ asset('img/csi-logo.png') }} class="pull-left logo_image">
                    <p class="logo_text">Computer Society of India</p>
                </div>
            </div>
        </div>
        
       <div class="container-fluid" id="main-nav-bar">
            <div class="row" style="margin: 5px 0px;">
                <div class="col-md-12" style="padding: 0px">
                    <nav class="navbar navbar-default">
                        <div class="container-fluid">
                            <div class="navbar-header">
                                <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                                    <span class="sr-only">Toggle navigation</span>
                                    <span class="icon-bar"></span>
                                    <span class="icon-bar"></span>
                                    <span class="icon-bar"></span>
                                </button>
                                <a class="navbar-brand only-side-padding" id="brand_logo" href="#">
                                    <img src={{ asset('img/brand-logo-white.png') }} class="pull-left brand_img">
                                    <!-- <p class="pull-left brand_text">CSI</p> -->
                                </a>
                            </div>
                            <div id="navbar" class="navbar-collapse collapse navbar-right">
                                <ul class="nav navbar-nav">
                                    <li class="active">
                                        <a href="home"><span class="glyphicon glyphicon-home">&nbsp;</span>Home</a>
                                    </li>
                                    <li>
                                        <a href="#about">About</a>
                                    </li>
                                    <li>
                                        <a href="#contact"><span class="glyphicon glyphicon-envelope">&nbsp;</span>Contact</a>
                                    </li>
                                    
                                    @if ( Auth::user()->check() )
                                        

                                        <li>
                                            <a href={{ url("/dashboard") }}><span class="glyphicon glyphicon-folder-close">&nbsp;</span>DashBoard</a>
                                        </li>
                                        <li class="dropdown">
                                            <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"><span class="glyphicon glyphicon-user">&nbsp;</span>My Account <span class="caret"></span></a>
                                            <ul class="dropdown-menu">
                                                <li>
                                                    <a href={{ route('profile') }}>Profile</a>
                                                </li>
                                                @if (Auth::user()->user()->membership->type == 'individual')
                                                    <li><a href={{ route('card') }}>Print CSI-Card</a></li>
                                                @endif
                                                <li>
                                                    <a href={{ url('/logout') }}>Logout</a>
                                                </li>
                                                  
                                            <!--    <li>
                                                    <a href="members/payments/">View Payments</a>
                                                </li>
                                                <li role="separator" class="divider"></li>
                                                <li>
                                                    <a href="members/csi_card">Print CSI Card</a>
                                                </li>-->
                                                
                                            </ul>
                                        </li>
                                    @else                                    
                                        <li class="dropdown">
                                            <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Register <span class="caret"></span></a>
                                            <ul class="dropdown-menu">
                                                <li>
                                                    <a href={{ route('register', [ 'entity' => 'institution-academic' ]) }}>Institution - Academic</a>
                                                </li>
                                                <li>
                                                    <a href={{ route('register', [ 'entity' => 'institution-non-academic' ]) }}>Institution - Non Academic</a>
                                                </li>
                                                <li role="separator" class="divider"></li>
                                                <li>
                                                    <a href={{ route('register', [ 'entity' => 'individual-student' ]) }}>Individual - student membership</a>
                                                </li>
                                                <li>
                                                    <a href={{ route('register', [ 'entity' => 'individual-professional' ]) }}>Individual - professional membership</a>
                                                </li>
                                                
                                            </ul>
                                        </li>
                                    @endif
                                </ul>
                           
                            </div><!--/.nav-collapse -->
                        </div>
                    </nav>
                </div>
            </div>
        </div>
        
        
    </header>