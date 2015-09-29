<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class RequestType extends Model
{
    protected $fillable = ['type'];

    public function requests() {
    	return $this->hasMany('App\CsiRequest', 'request_type', 'id');
    }
}
