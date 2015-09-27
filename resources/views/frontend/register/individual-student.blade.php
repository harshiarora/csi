@extends('frontend.master')

@section('title', 'Register')
@section('main')
	<section id="main">
   		<div class="container">
   			<div class="row">
   				<div class="col-md-12">
   					<div>
					  <h1 class="section-header-style">student membership form</h1>
					</div>
   					<ul id="progressbar">
						<li class="active">General Details</li>
						<li>Address Details</li>
						<li>Contact Details</li>
						<li>Student Details</li>
						<li>Payment Details</li>
					</ul>

					@if ( $errors->any() )
   						
   						<ul class="list-unstyle">
   						<li>
   						@foreach ($errors->all() as $error)
   							<li>{{ $error }}</li>
   						@endforeach
   						</ul>
   					@endif
   					<div class="page-header">
					  <h1 id="stepText"> <small id="stepSubText"></small></h1>
					</div>
   					{!! Form::open(['url' => ['register', 'entity'=>$entity], 'files' => true]) !!}
					  <div class="steps">
						<div class="form-group">
							<label for="membership-period">Membership period</label>
							<div class="radio">
							    @foreach($membershipPeriods as $period)
								    <label class="radio-inline">
										{!! Form::radio('membership-period', $period->id) !!} {{ $period->name }}
									</label>
							    @endforeach
							    
						 	</div>
						</div>
						<div class="form-group">
							<label for="exampleInputPassword1">Title of applicant</label>
							<div class="radio">
							    <label class="radio-inline">
									{!! Form::radio('salutation', 1) !!}
									Mr
								</label>
								<label class="radio-inline">
									{!! Form::radio('salutation', 2) !!}
									Miss
								</label>
								<label class="radio-inline">
									{!! Form::radio('salutation', 3) !!}
									Mrs
								</label>
								<label class="radio-inline">
									{!! Form::radio('salutation', 4) !!}
									Dr
								</label>
								<label class="radio-inline">
									{!! Form::radio('salutation', 5) !!}
									Prof 
								</label>								
							</div>
						</div>
						<div class="form-group">
							<label for="exampleInputPassword1">First Name</label>
							{!! Form::text('fname', null, ['class' => 'form-control', 'placeholder' => 'First Name ']) !!}
						</div>						
						<div class="form-group">
							<label for="exampleInputPassword1">Middle Name</label>
							{!! Form::text('mname', null, ['class' => 'form-control', 'placeholder' => 'Middle Name ']) !!}
						</div>
						<div class="form-group">
							<label for="exampleInputPassword1">Last Name</label>
							{!! Form::text('lname', null, ['class' => 'form-control', 'placeholder' => 'Last Name ']) !!}
						</div>
						<div class="form-group">
							<label for="exampleInputPassword1">Name on CSI Card</label>
							{!! Form::text('card_name', null, ['class' => 'form-control', 'placeholder' => 'Name on CSI Card ']) !!}
						</div>

						<div class="form-group">
							<label for="exampleInputPassword1">Date of Birth</label>
							{!! Form::text('dob', null, ['class'=>'form-control', 'id'=>'dob_student'])!!}
							<span class="help-text"></span>
						</div>

						<div class="form-group">
					    <label class="control-label">Gender</label>
	      				  <div class="radio">
						    <label class="radio-inline">
							  <input type="radio" name="gender" id="gender" value="m"> Male
							</label>
							<label class="radio-inline">
							  <input type="radio" name="gender" id="gender" value="f"> Female
							</label>
						  	
						  </div>
					  </div>

						<button class="btn btn-default next">Next</button>
					  </div>
					  
					  
					  @include('frontend.partials._partAddress')
					  @include('frontend.partials._partContact')


					  <div class="steps">
					  	
						<div class="form-group">
					    <label class="control-label">College Name</label>
					    {!! Form::text('college', null, ['class' => 'form-control', 'placeholder' => 'Enter your college name']) !!}
					  </div>
					
					<div class="form-group
										">
					    <label class="control-label">Course
					    	<span id="helpBlock" class="text-danger">*</span>
					    	</label>
					    {!! Form::text('course', null, ['class' => 'form-control', 'placeholder' => 'Enter your course name']) !!}
					 </div>

					  <div class="form-group
					  					  ">
					    <label class="control-label">Course Branch
					    	</label>
					    {!! Form::text('cbranch', null, ['class' => 'form-control', 'placeholder' => 'Enter your course branch']) !!}
					  </div>
					  
					  <div class="form-group
					  						  ">
					    <label class="control-label">Course Duration(in years)
					    	<span id="helpBlock" class="text-danger">*</span>
					    	</label>
					    {!! Form::text('cduration', null, ['class' => 'form-control', 'placeholder' => 'Enter your course duration']) !!}
					    </div>

						<button class="btn btn-default previous">Previous</button>
						<button class="btn btn-default next">Next</button>
					  </div>


					  @include('frontend.partials._partPayment')


					{!! Form::Close() !!}
   				</div>
   			</div>
   		</div>
   		<br/>
   		<br/>
   	</section>
@endsection


@section('footer-scripts')
	<script src={{ asset("js/validateit.js") }}></script>
	<script src={{ asset('js/function9.js') }}></script>
@endsection

