<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Narration extends Model
{
    protected $fillable = [ 'payer_id', 'mode', 'transaction_number', 'bank', 'branch', 'date_of_payment', 'drafted_amount', 'paid_amount', 'proof'];

    public function paymentMode() {
        return $this->hasOne('App\PaymentMode', 'id', 'mode');
    }

    public function journals() {
    	return $this->hasMany('App\Journal', 'narration_id', 'id');
    }

	public function payer() {
    	return $this->hasOne('App\Member', 'id', 'payer_id');
    }

    public function scopeRejected($query) {
    	return $query->where('is_rejected', 1);
    }

	public function rejection() {
    	return $this->hasOne('App\RejectedNarration', 'narration_id', 'id');
    }


}
