<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Warehouse  extends Model
{
    use HasFactory;
    
    protected $table = 'warehouses';

    public $timestamps = false;

    public function branch(){
        return $this->belongsTo(Branch::class);
    }
     
}
