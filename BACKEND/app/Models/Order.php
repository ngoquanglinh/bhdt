<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'status',
        'ship_address',
        'total'
    ];

    public function creator(){
        return $this->belongsTo(User::class,'creator_id');
    }

    public function customer(){
        return $this->belongsTo(User::class,'user_id');
    }

    public function orderItems(){
        return $this->hasMany(OrderItem::class);
    }
}
