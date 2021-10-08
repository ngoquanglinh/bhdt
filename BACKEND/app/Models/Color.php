<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Color extends Model
{
    use HasFactory;
    protected $fillable = [
        'name',
    ];

    public $timestamps = false;

    public function products(){
        return $this->belongsToMany(Product::class);
    }

    public function user(){
        return $this->belongsTo(User::class);
    }
}
