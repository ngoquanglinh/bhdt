<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductInventories  extends Model
{
    use HasFactory;
    
    protected $table = 'Product_inventories';
    protected $primaryKey = null;
    public $incrementing = false;
    protected $fillable = ['inventory', 'product_id', 'warehouse_id'];

    public $timestamps = false;

}
