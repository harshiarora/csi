<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Payment extends Model
{
    protected $fillable = ['paid_for', 'payment_head_id', 'service_id'];

    public function journals() {
    	return $this->hasMany('App\Journal', 'payment_id', 'id');
    }

	public function paidFor() {
    	return $this->hasOne('App\Member', 'id', 'member_id');
    }

    public function service() {
        return $this->hasOne('App\Service', 'id', 'service_id');
    }

    public function paymentHead() {
        return $this->hasOne('App\PaymentHead', 'id', 'payment_head_id');
    }

}
