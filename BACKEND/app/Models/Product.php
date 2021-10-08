<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;


    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name',
        'description',
        'price',
        'bought',
        'quantity',
        'trend_count',
        'count_purchases',
        'sale',
        'is_new',
        'image',
    ];

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function orderItems()
    {
        return $this->hasMany(Order::class);
    }

    public function comments()
    {
        return $this->hasMany(Comment::class);
    }

    public function images()
    {
        return $this->hasMany(Image::class);
    }

    public function ratings()
    {
        return $this->hasMany(Rating::class);
    }

    public function colors(){
        return $this->belongsToMany(Color::class, 'products_colors');
    }

    public function sizes(){
        return $this->belongsToMany(Size::class, 'products_sizes');
    }

    public function brands(){
        return $this->belongsTo(Brand::class,'brand_id');
    }

    public function productSlides(){
        return $this->belongsToMany(Slide::class, 'products_slides');
    }

    public function inventories()
    {
        return $this->hasMany(ProductInventories::class);
    }
}
