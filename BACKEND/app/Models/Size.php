<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Size extends Model
{
    use HasFactory;

    protected $fillable = [
        'name'
    ];

    public $timestamps = false;

    public function products(){
        return $this->belongsToMany(Product::class, 'products_sizes', 'product_id', 'size_id');
    }

    public function user(){
        return $this->belongsTo(User::class);
    }
}
