<div class="steps">						
	<div class="form-group">
		<label for="exampleInputPassword1">Primary Email-ID</label>
		{!! Form::email('email1', null, ['class' => 'form-control', 'placeholder' => 'Primary Email ID ']) !!}
	</div>
	<div class="form-group">
		<label for="exampleInputPassword1">Secondary Email-ID</label>
		{!! Form::text('email2', null, ['class' => 'form-control', 'placeholder' => 'Secondary Email ID']) !!}
	</div>
	<div class="form-group">
		<label for="exampleInputPassword1">Landline</label>
		<div class="input-group">
	    	<span class="input-group-addon">+</span>
			  	{!! Form::text('std', null, ['class' => 'form-control', 'placeholder' => 'STD Code', 'id' => 'std-code', 'style'=>"width: 30%; float: left;"]) !!}
			  	{!! Form::text('phone', null, ['class' => 'form-control', 'placeholder' => 'Landline Number', 'id' => 'phone', 'style'=>"width: 70%; float: left;"]) !!}
	    </div>
	    <div class="row">
			<div class="col-md-4" id="errorSTD">
				<span class="help-block ">STD Code</span>
		    		
			</div>
			<div class="col-md-6" id="errorPhone">
				<span class="help-block ">Landline number</span>
	    				
			</div>
		</div>

		@if ( ($entity == 'individual-student') || ($entity == 'individual-professional'))

						<div class="form-group">
							<label for="exampleInputPassword1">Mobile</label>
							<div class="input-group">
						    	<span class="input-group-addon">+</span>
		      				 	{!! Form::text('country-code', null, ['class' => 'form-control', 'placeholder' => 'Country Code', 'id'=>'country-code', 'style'=> 'width: 30%; float:left']) !!}
						   		{!! Form::text('mobile', null, ['class' => 'form-control', 'placeholder' => 'Mobile Number', 'id'=>'mobile', 'style'=> 'width: 70%; float:left']) !!}
						    </div>
						    <div class="row">
					    		<div class="col-md-4" id="errorCountry">
					    			<span id="helpBlock" class="help-block ">STD Code</span>
							    		
					    		</div>
					    		<div class="col-md-6" id="errorMobile">
					    			<span id="helpBlock" class="help-block ">Mobile number</span>
						    				
					    		</div>
					    	</div>
						</div>
		@endif
	</div>
	<button class="btn btn-default previous">Previous</button>
	<button class="btn btn-default next">Next</button>
</div>