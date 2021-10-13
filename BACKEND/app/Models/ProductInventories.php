<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductInventories  extends Model
{
    use HasFactory;
    
    protected $table = 'product_inventories';

    protected $primaryKey = null;
    public $incrementing = false;

    protected $fillable = [ 'product_id', 'warehouse_id','inventory'];
    
    public $timestamps = false;

}
