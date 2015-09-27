<div class="steps">
	<div class="form-group">
		<label for="exampleInputEmail1">Country</label>
		<select class="form-control" id="country" data-form="0" name="country">
		  		<option value="invalid">Please select a country</option>
		  		<option value="IND">India</option>							
		  	</select>
	</div>
	<div class="form-group">
		<label for="exampleInputEmail1">State</label>
			<select class="form-control" id="state" data-state={{ ( $entity == 'individual-student')? "1" : "0" }} name="state">
		</select>
	</div>
	@if( $entity == 'individual-student')
		<div class="form-group">
		    <label class="control-label">Student Branch</label>
		  	<select class="form-control" id="stud_branch" name="stud_branch">
		  		<option>Please select a state from the drop down first</option>
		  	</select>
		</div>
	
	@elseif ( ( $entity == 'institution-academic') || ( $entity == 'institution-non-academic') || ( $entity == 'individual-professional') )
		<div class="form-group">
			<label for="exampleInputEmail1">Chapters</label>
			<select class="form-control" id="chapter" name="chapter">
			  		<option value="invalid" selected="selected">Please select a state from the drop down first</option>							
			  	</select>
		</div>
	@endif
	<div class="form-group">
		<label for="exampleInputPassword1">Address</label>
		{!! Form::text('address', null, ['class' => 'form-control', 'placeholder' => 'Parmanent Address']) !!}
	</div>
	<div class="form-group">
		<label for="exampleInputPassword1">City</label>
		{!! Form::text('city', null, ['class' => 'form-control', 'placeholder' => 'City']) !!}
	</div>
	<div class="form-group">
		<label for="exampleInputPassword1">Pincode</label>
		{!! Form::text('pincode', null, ['class' => 'form-control', 'placeholder' => 'Pincode']) !!}
	</div>
	<button class="btn btn-default previous">Previous</button>
	<button class="btn btn-default next">Next</button>
</div>