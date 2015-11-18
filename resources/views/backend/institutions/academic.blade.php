@extends('backend.master')

@section('page-header')
    <div class="col-md-5">
        <h4>{{$typeName}} Institutions</h4>
    </div>
    <div class="col-md-5">
        
    </div>
@endsection

@section('main')
            <!-- /.row -->
            <div class="row">
                <div class="col-md-12">
			        

                    <h3>Listing All {{$typeName}}</h3>
                    @if (Session::has('flash_notification.message'))
			            <div class="alert alert-{{ Session::get('flash_notification.level') }}">
			                <button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>

			                {{ Session::get('flash_notification.message') }}
			            </div>
			        @endif
                    	@if(!($academics->isEmpty()))
                    		<div class="row">
                				<div class="col-md-12">
				                    <div class="panel panel-default">
				                        <div class="panel-heading">
											Filters
				                        </div>
				                        <!-- /.panel-heading -->
				                        <div class="panel-body">
				                            <div class="table-responsive">
				                                <table class="table table-hover">
				                                    <thead>
				                                        <tr>
				                                            <th>#</th>
				                                            <th>Name of institution</th>
				                                            <th>verified</th>
				                                            <th>account status</th>
				                                        </tr>
				                                    </thead>
				                                    <tbody>
				                                    	
				                                        @foreach ($academics as $inst)
									                    	
									                    	<tr>
					                                            <td>{{ ++$counter }}</td>
					                                            <td>{{ $inst->name }}</td>
					                                            <td>
					                                            @if ($inst->member->is_verified)
					                                            	verified

					                                            @else
					                                            	
                    		
<a class="btn btn-success" href={{ route('backendInstitutionVerifyById', ['typeId' => $typeId, 'id' => $inst->id]) }}>Verify</a>
					                                            	
					                                            @endif
					                                           	</td>
					                                           	<td>
					                                            	<a class="btn btn-primary" href={{ route('backendInstitutionById', ['typeId' => $typeId, 'id' => $inst->id]) }}>View Profile</a>
					                                            </td>
					                                        </tr>
									                    @endforeach

				                                        
				                                    </tbody>
				                                </table>
				                            </div>
				                            <!-- /.table-responsive -->
				                        </div>
				                        <!-- /.panel-body -->
				                    </div>
				                    <!-- /.panel -->
				                </div>
                    		</div>
		                    
	                    @else
	                    	<p>No {{$typeName}} are in records</p>
	                    @endif
                    
                </div>
            <!-- /.row -->
            </div>
        <!-- /#page-wrapper -->
@endsection