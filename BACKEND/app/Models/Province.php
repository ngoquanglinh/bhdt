<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Province extends Model
{
    use HasFactory;
    
    protected $table = 'province';

    public $timestamps = true;
     
    // public function user(){
    //     return $this->belongsTo(User ::class);
    // }
}
