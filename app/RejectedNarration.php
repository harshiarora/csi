<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class RejectedNarration extends Model
{
    protected $fillable = ['narration_id', 'reason'];

    public function narration() {
    	return $this->hasOne('App\Narration', 'id', 'narration_id');
	}
}
