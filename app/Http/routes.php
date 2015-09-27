<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

// routes for all the admin panel comes here
Route::group(['prefix'=> 'admin' ,'namespace'=>'Admin'], function(){
    Route::get('/', ['as' => 'admin', 'uses' => 'Auth\AdminAuthController@index']);
    
    Route::get('login', [ 'middleware' => 'guest.admin', 'uses' => 'Auth\AdminAuthController@getLogin'] );
	Route::post('login', [ 'as' => 'adminLogin', 'uses' => 'Auth\AdminAuthController@postLogin'] );
	Route::get('logout', [ 'as' => 'logout', 'uses' => 'Auth\AdminAuthController@getLogout']);

	Route::get('dashboard', ['middleware'=>'auth.admin', 'uses'=>'AdminDashboardController@index']);	
	
	Route::group(['prefix' => 'institutions', 'middleware'=>'auth.admin'], function(){
		Route::get('{typeId}/verify/{id}', [ 'as' => 'backendInstitutionVerifyById', 'uses'=>'InstitutionController@verify' ]);
		Route::get('{typeId}/profile/{id}', [ 'as' => 'backendInstitutionById', 'uses'=>'InstitutionController@profile' ]);
		Route::get('{typeId}/profile/{id}/reject/{pid}', [ 'as' => 'backendInstitutionRejectById', 'uses'=>'InstitutionController@reject_payment' ]);
		Route::post('{typeId}/profile/{id}/reject/{pid}', [ 'as' => 'backendInstitutionRejectById', 'uses'=>'InstitutionController@store_reject_payment' ]);
		Route::get('{typeId}/profile/{id}/accept/{pid}', [ 'as' => 'backendInstitutionAcceptById', 'uses'=>'InstitutionController@accept_payment' ]);
		Route::get('{typeId}', [ 'as' => 'backendInstitution', 'uses'=>'InstitutionController@index' ]);
		Route::get('/', [ 'as' => 'backendInstitutionHome', 'uses'=>'AdminDashboardController@index' ]);
	});

	Route::group(['prefix' => 'individual', 'middleware'=>'auth.admin'], function(){
		Route::get('{typeId}/verify/{id}', [ 'as' => 'backendIndividualVerifyById', 'uses'=>'IndividualController@verify' ]);
		Route::get('{typeId}/profile/{id}', [ 'as' => 'backendIndividualById', 'uses'=>'IndividualController@profile' ]);
		Route::get('{typeId}/profile/{id}/reject/{pid}', [ 'as' => 'backendIndividualRejectById', 'uses'=>'IndividualController@reject_payment' ]);
		Route::post('{typeId}/profile/{id}/reject/{pid}', [ 'as' => 'backendIndividualRejectById', 'uses'=>'IndividualController@store_reject_payment' ]);
		Route::get('{typeId}/profile/{id}/accept/{pid}', [ 'as' => 'backendIndividualAcceptById', 'uses'=>'IndividualController@accept_payment' ]);
		Route::get('{typeId}', [ 'as' => 'backendIndividual', 'uses'=>'IndividualController@index' ]);
		Route::get('/', [ 'as' => 'backendIndividualHome', 'uses'=>'AdminDashboardController@index' ]);
	});

});

Route::get('register/{entity}', [
		'as'=>'register', 'uses'=>'RegisterController@create'
]);
Route::post('register/getresource/{resource}', 'RegisterController@getResource');
Route::post('register/{entity}', 'RegisterController@store');

// all the routes for front-end site
Route::get('/', function () {
	return View('frontend.index');

});

// Authentication routes...
Route::get('login', ['middleware' =>['guest'] ,'uses' => 'Auth\AuthController@getLogin']);
Route::get('logout', 'Auth\AuthController@getLogout');

// Authentication routes...
Route::post('login', 'Auth\AuthController@postLogin');
Route::get('/dashboard', ['middleware'=>'auth', 'uses'=>'UserDashboardController@index']);	

Route::get('/profile', ['middleware'=>'auth', 'as' => 'profile', 'uses'=>'UserDashboardController@showProfile']);
Route::get('/card', ['middleware'=>'auth.individual', 'as' => 'card', 'uses'=>'UserDashboardController@showCard']);



// Registration routes...
// Route::group(['prefix' => 'admin'], function() {
// 	// Authentication routes...
	

// 	// Registration routes...
// 	//Route::get('auth/register', 'Auth\AdminAuthController@getRegister');
// 	//Route::post('auth/register', 'Auth\AdminAuthController@postRegister');
	
	
// });
// Registration routes...
// Route::get('/dashboard', ['middleware' => 'auth' ,'uses' => 'UserDashboardController@index']);
