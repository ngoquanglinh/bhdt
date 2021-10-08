<?php

namespace App\Http\Controllers\Shop;

use Illuminate\Http\Request;
use App\Http\Controllers\BaseController as BaseController;
use App\Models\Shop;
use App\Models\Role;
use App\Models\Product;
use App\Models\Profile;
use App\Models\Comment;
use App\Models\User;
use App\Models\ShopUser;
use Validator;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;

class ShopController extends BaseController
{


  public function newProducts(Request $request){

        $Products = Product::orderBy('created_at','desc')
        ->with('user')
        ->with('images')
        ->with('colors')
        ->with('sizes')
        ->take(6)
        ->get();

        return $this->sendResponse(
            $data = [
                     'items' => $Products ,
                    ]
          );
    }


     public function manProducts(Request $request){

        $Products = Product::orderBy('created_at','desc')
        ->with('user')
        ->with('images')
        ->with('colors')
        ->with('sizes')
        ->take(6)
        ->get();

        return $this->sendResponse(
            $data = [
                     'items' => $Products ,
                    ]
          );
    }
     public function womanProducts(Request $request){

        $Products = Product::orderBy('created_at','desc')
        ->with('user')
        ->with('images')
        ->with('colors')
        ->with('sizes')
        ->take(6)
        ->get();

        return $this->sendResponse(
            $data = [
                     'items' => $Products ,
                    ]
          );
    }
    public function topProduct(Request $request){
  
        $Products = Product::orderBy('created_at','desc')
        ->with('user')
        ->with('images')
        ->with('colors')
        ->with('sizes')
        ->take(8)
        ->get();

        return $this->sendResponse(
            $data = [
                        'items' => $Products ,
                    ]
            );
    }
    public function saleMen(Request $request){

        $Products = Product::orderBy('created_at','desc')
            ->with('user')
            ->with('images')
            ->with('colors')
            ->with('sizes')
            ->take(1)
            ->get();

        return $this->sendResponse(
            $data = [
                        'items' => $Products ,
                    ]
            );
    }
    public function saleWomen(Request $request){

        $Products = Product::orderBy('created_at','desc')
        ->with('user')
        ->with('images')
        ->with('colors')
        ->with('sizes')
        ->take(1)
        ->get();

    return $this->sendResponse(
        $data = [
                    'items' => $Products ,
                ]
        );
    }
    public function index(Request $request){
        $page = $request->query('page') ? $request->query('page') : 1;
        $pageSize = $request->query('pageSize') ? $request->query('pageSize') : 25;

        $query = Product::query();
           $min = $request->query('min');
           $max = $request->query('max');
           $color = $request->query('color');
           $brand = $request->query('brand');

            if($min != null){
                $query = $query->whereBetween('price',[$min, $max]);
            }
            if($color){
                $query = $query->whereHas('colors', function ($q)  use ($color) {
                    $q->where('color_id', $color);
                });
            }
            $total =  $query->get();
            $Products = $query
            ->orderBy('id','desc')
            ->with('user')
            ->with('images')
            ->with('colors')
            ->with('sizes')
            ->with('category')
            ->skip( ($page - 1) * $pageSize )
            ->take($pageSize)
            ->get();
        
        return $this->sendResponse(
            $data = [
                     'items' => $Products , 
                     'total' => $total->count()
                    ]
          );
    }

    public function all(Request $request){

        $page = $request->query('page') ?  $request->query('page') : 1 ;
        $pageShop = $request->query('pageShop') ? $request->query('pageShop') :25 ;

        $Shops = Shop::orderBy('id','desc')
        ->with('users')
        ->skip( ($page - 1) * $pageShop )
        ->take($pageShop)
        ->get();

        return $this->sendResponse(
            $data = [
                     'items' => $Shops ,
                     'total' => $Shops->count()
                    ]
          );
    }

    public function show($id){
        $found = Product::where('id', $id)
                        ->with('user')
                        ->with('images')
                        ->with('colors')
                        ->with('sizes')
                        ->first();

        if($found == null){

            return $this->sendError('Product Errors.',['error' => 'Product not found !']);
        }

        return $this->sendResponse(
            $data = $found
        );

    }


        public function productsCategory($categoryId ,Request $request){

        $page = $request->query('page') ? $request->query('page') : 1;
        $pageSize = $request->query('pageSize') ? $request->query('pageSize') : 25;

        $query = Product::query()->where('category_id',$categoryId);
           $min = $request->query('min');
           $max = $request->query('max');
           $color = $request->query('color');
           $barnd = $request->query('brand');

            if($min != null){
                $query = $query->whereBetween('price',[$min, $max]);
            }

            $Products = $query
            ->orderBy('id','desc')
            ->with('user')
            ->with('images')
            ->with('colors')
            ->with('sizes')
            ->with('category')
            ->skip( ($page - 1) * $pageSize )
            ->take($pageSize)
            ->get();

        return $this->sendResponse(
            $data = [
                     'items' => $Products , 
                     'total' => Product::where('category_id',$categoryId)->count()
                    ]
          );
    }
    
}
