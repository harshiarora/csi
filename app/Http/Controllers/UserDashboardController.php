<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests;
use Illuminate\Http\Request;
use Auth;

class UserDashboardController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {   
        $verified = Auth::user()->user()->is_verified;
        return view('frontend.dashboard.home', compact('verified') );
    }

    /**
     * [showProfile - profile show for any user]
     * @return [type] [description]
     */
    public function showProfile(){

        $user = Auth::user()->user();

        return view('frontend.dashboard.profile', compact('user'));
    }

    /**
     * [addNominee - to add nominee, use middleware for verifying if a logged in institution]
     * @return  [type] [<description>]
     */
    public function addNominee(){

    }


    /**
     * [applyStudentBranch apply for student branch, use middleware to check for logged in academic institution]
     * @return [type] [description]
     */
    public function applyStudentBranch(){

    }


    /**
     * [showCard show CSI card details]
     * @return [type] [description]
     */
    public function showCard(){
        $user = Auth::user()->user();

        return view('frontend.dashboard.card', compact('user'));
    }

    /**
     * [bulkPayments for doing bulk payments]
     * @return [type] [description]
     */
    public function bulkPayments(){

    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
