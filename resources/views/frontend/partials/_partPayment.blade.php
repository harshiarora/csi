<div class="steps">
	<div class="form-group">
		<label for="exampleInputPassword1">Mode of transaction</label>
			{!! Form::select('paymentMode', $payModes, null, ['class'=>'form-control'])!!}

	</div>
	<div class="form-group">
		<label for="exampleInputPassword1">Transaction Number</label>
		{!! Form::text('tno', null, ['class'=>'form-control', 'placeholder'=>'Transaction/ Cheque/ DD number'])!!}
		<span class="help-text">(in case of online payment)/Cheque/DD Number, not required in case of cash</span>
	</div>
	<div class="form-group">
		<label for="exampleInputPassword1">Payable Amount</label>
		<p class="card card_amount">
			<span>Membership Fee:&nbsp;</span><span id="fee"></span>
			<br>
			<span>Service Tax:&nbsp;</span><span id="tax"></span>%
			<br>
			<span>Total Payable Amount:&nbsp;</span><span id="payable"></span>								
		</p>
	</div>
	<div class="form-group">
		<label for="exampleInputPassword1">Drawn On</label>
		{!! Form::text('drawn', null, ['class'=>'form-control', 'id'=>'drawn_on'])!!}
		<span class="help-text"></span>
	</div>
	<div class="form-group">
		<label for="exampleInputPassword1">Bank Name</label>
		{!! Form::text('bank', null, ['class'=>'form-control', 'placeholder'=>'Enter the Bank Name'])!!}
		<span class="help-text"></span>
	</div>
	<div class="form-group">
		<label for="exampleInputPassword1">Branch Name</label>
		{!! Form::text('branch', null, ['class'=>'form-control', 'placeholder'=>'Enter the Branch of the bank'])!!}
		<span class="help-text"></span>
	</div>
	<div class="form-group">
		<label for="exampleInputFile">Payment Receipt</label>
		<input type="file" name="paymentReciept" id="paymentReciept">
		<p class="help-block">Please upload your payment receipt.</p>
	</div>
	<div class="form-group">
		<label for="exampleInputPassword1">Total Amount Paid</label>
		{!! Form::text('amountPaid', null, ['class'=>'form-control', 'id'=>'amount_paid'])!!}
		<span class="help-text"></span>
	</div>
	<button class="btn btn-default previous">Previous</button>
	<button class="btn btn-default" name="submit" id="submit">Submit</button>
</div>