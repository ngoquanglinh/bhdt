<?php

namespace App\Http\Controllers\Product;

use Illuminate\Http\Request;
use App\Http\Controllers\BaseController as BaseController;
use App\Models\Product;
use App\Models\Order;
use App\Models\Category;
use App\Models\comment;
use App\Models\Role;
use App\Models\Profile;
use App\Models\Image;
use App\Models\User;
use Validator;

use Illuminate\Support\Facades\Auth;

class ProductController extends BaseController
{

    public function index(Request $request){

        $user = auth('api')->user();
        $page = $request->query('page') ?? 1;
        $pageSize = $request->query('pageSize') ?? 25;
        $sort = $request->query('sortBy');
        $name = $request->query('name');
        $categoryId = $request->query('category'); // arr
        $brandId = $request->query('brand'); // arr
        $slide = $request->query('slide');
        $order =  $request->query('order'); // asc
        $minPrice = $request->query('minPrice');
        $maxPrice =  $request->query('maxPrice');

        $query = Product::query();
        $query = $query
        ->with('user')
        ->with('images')
        ->with('colors')
        ->with('sizes')
        ->with('category')
        ->with('productSlides')
        ->with('inventories');

        if($slide != null){
            $query = $query->whereHas('productSlides', function ($query) use ($slide){
                return $query->where('products_slides.slide_id', '=', $slide);
            });
        }

        if($brandId != null){
            if(is_array($brandId)){
                $query = $query->whereIn('products.brand_id',$brandId);
            }else{
                $query = $query->where('products.brand_id', $brandId );
            }
        }

        if($categoryId != null ){
            if(is_array($categoryId)){
                $query = $query->whereIn('products.category_id', $categoryId );
            }else{
                $query = $query->where('products.category_id', $categoryId );
            }
        }

        if($name != null){
            $query = $query->where('products.name','LIKE',"%$name%");
        }

        if($sort != null){
            if($sort == "price"){
                if($order == "asc"){
                    $query = $query->orderBy('products.price', 'asc');
                }else{
                    $query = $query->orderBy('products.price', 'desc');
                }
            }else if($sort == "sold"){
                $query = $query->orderBy('products.sale', 'desc');
            }else{
                $query = $query->orderBy('products.created_at', 'desc');
            }
        }

        if($minPrice != null){
            $query = $query->where('products.price','>=',$minPrice);
        }

        if($maxPrice != null){
            $query = $query->where('products.price','<=',$maxPrice);
        }

        $total = $query->count();

        $Products = $query
            ->skip( ($page - 1) * $pageSize)
            ->take($pageSize)
            ->get();

        return $this->sendResponse(
            $data = [
                        'items' => $Products ,
                        'total' => $total,
                    ]
          );
    }

    public function search(Request $request){

        $page = $request->query('page') ?? 1;
        $pageSize = $request->query('pageSize') ?? 25;

        $query = Product::query();
        $query = $query
        ->with('user')
        ->with('images')
        ->with('colors')
        ->with('sizes')
        ->with('category');

        $searchCategory = $request->query('c');
        $searchKey = $request->query('q');
        $searchSale = $request->query('sale');
        $searchNew = $request->query('is_new');
        $sort = $request->query('sort');

        if($searchCategory != null){

            $query = $query->whereHas('category', function ($query) use ($searchCategory){
                return $query->where('categories.name', '=', $searchCategory);
            });
        }

        if($searchKey != null){

            $query = $query
                           ->where('name','like','%'.$searchKey.'%');
        }

        if($searchSale != null){

            $query = $query
                           ->where('sale', '>=' ,$searchSale);
            $query = $query
                           ->orderBy('products.sale','desc');
        }

        if($searchNew != null){

            $query = $query
                           ->where('is_new', '>=' , 1);
        }

        if($sort != null){
            if($sort == 1){
                $query = $query->where('products.price', 'asc');
            }else if($sort == 2){
                $query = $query->where('products.price', 'desc');
            }else{
                    $query = $query
            ->orderBy('products.id','desc');
            }

        }else{
            $query = $query
            ->orderBy('products.id','desc');
        }

        $Products = $query
        ->skip( ($page - 1) * $pageSize )
        ->take($pageSize)
        ->get();

        return $this->sendResponse(
            $data = [
                     'items' => $Products ,
                     'total' => $Products->count()
                    ]
          );
    }


    public function searchAdmin(Request $request){

        $user = auth('api')->user();
        $page = $request->query('page') ?? 1;
        $pageSize = $request->query('pageSize') ?? 25;

        $query = Product::query();

        $searchKey = $request->query('q');

        if($searchKey != null){

            $query = $query
                           ->where('name','like','%'.$searchKey.'%');
        }

        if($user->roles->contains('name', 'admin')){

            $Products = $query->orderBy('id','desc')
            ->with('user')
            ->with('images')
            ->with('colors')
            ->with('sizes')
            ->with('category')
            ->skip( ($page - 1) * $pageSize )
            ->take($pageSize)
            ->get();



            $total = Product::where('name','like','%'.$searchKey.'%')->count();

        }

        else if($user->roles->contains('name', 'shop')){


            $shopId = $user->shops()->first()->id;
            $userIdsOfShop = Shop::find($shopId)->users->pluck('id');
            $Products = $query->whereIn('user_id',$userIdsOfShop)
            ->orderBy('id','desc')
            ->with('user')
            ->with('images')
            ->with('colors')
            ->with('sizes')
            ->with('category')
            ->skip( ($page - 1) * $pageSize )
            ->take($pageSize)
            ->get();


            $total = Product::where('name','like','%'.$searchKey.'%')
                            ->whereIn('user_id',$userIdsOfShop)
                            ->count();

        }

        return $this->sendResponse(
            $data = [
                     'items' => $Products ,
                     'total' => $total
                    ]
          );
    }

    public function show($id){


     $found = Product::where('id', $id)
            ->where('id', $id)
            ->with('user')
            ->with('images')
            ->with('colors')
            ->with('sizes')
            ->with('category')
            ->with('ratings')
            ->with('brands')
            ->with('inventories')
            ->first();

        if($found == null){

            return $this->sendError('Product Errors.',['error' => 'Product not found !']);
        }

        return $this->sendResponse(
            $data = $found
        );

    }

    public function update($id,Request $request){

        $validator = Validator::make($request->all(), [
            "name" => 'required',
            "description" => 'required',
            "price" => 'required',
            "quantity" => 'required',
            "trend_count" => 'required',
            "category_id" => 'required',
            "brand_id" => 'required',
            "discount" => 'required'
        ]);

        if($validator->fails()){
            return $this->sendError('Validation Error.', $validator->errors());
        }

        $Product = Product::where('id',$id)->first();

        if($Product != null){


            $colors = [];
            foreach($request->colors as $item)
            {
                $colors[] = [
                     'color_id' => $item
                ];
            }

            $sizes = [];
            foreach($request->sizes as $item)
            {
                $sizes[] = [
                    'size_id' => $item
                ];
            }

            $Product->name = $request->name;
            $Product->description = $request->description;
            $Product->price = $request->price;
            $Product->bought = 0;
            $Product->quantity = $request->quantity;
            $Product->trend_count = $request->trend_count ?? 0;
            $Product->category_id = $request->category_id;
            $Product->brand_id = $request->brand_id;
            $Product->discount = $request->discount;
            $Product->save();

            $Product->images()->delete();

            $Product->images()->createMany($request->images);

            $Product->colors()->detach();

            $Product->colors()->attach($colors);

            $Product->sizes()->detach();

            $Product->sizes()->attach($sizes);

            $Product = Product::where('id',$Product->id)
            ->with('user')
            ->with('images')
            ->with('colors')
            ->with('sizes')
            ->with('category')
            ->first();

            return $this->sendResponse(
                $data = $Product,
                'Update Product successfully.'
            );
        }

        return $this->sendError('Product Errors.',['error' => 'Product not found !']);
    }

    public function create(Request $request){


        $validator = Validator::make($request->all(), [
            "name" => 'required',
            "description" => 'required',
            "price" => 'required',
            "quantity" => 'required',
            "trend_count" => 'required',
            "category_id" => 'required',
            "brand_id" => 'required',
            "discount" => 'required'
        ]);

        if($validator->fails()){
            return $this->sendError('Validation Error.', $validator->errors());
        }
        $colors = [];
        foreach($request->colors as $item)
        {
            $colors[] = [
                'color_id' => $item
            ];
        }

        $sizes = [];
        foreach($request->sizes as $item)
        {
            $sizes[] = [
                'size_id' => $item
            ];
        }

        $Product = new Product();
        $Product->name = $request->name;
        $Product->description = $request->description;
        $Product->price = $request->price;
        $Product->bought = 0;
        $Product->quantity = $request->quantity;
        $Product->trend_count = $request->trend_count ?? 0;
        $Product->category_id = $request->category_id;
        $Product->brand_id = $request->brand_id;
        $Product->discount = $request->discount;
        $Product->save();
        $Product->colors()->attach($colors);
        $Product->sizes()->attach($sizes);

        if($request->images){
            $Product->images()->createMany($request->images);
        }

        $Product = Product::where('id',$Product->id)
                        ->with('user')
                        ->with('images')
                        ->with('colors')
                        ->with('sizes')
                        ->with('category')
                        ->first();

        return $this->sendResponse(
            $data = $Product,
            'Create Product successfully.'
        );

    }

    public function delete($id,Request $request){


        $found = Product::find($id);

        if($found == null){

            return $this->sendError('Product Errors.',['error' => 'Product not found !']);
        }

        Image::where('product_id',$id)->delete();
        $found->delete();

        return $this->sendResponse(
            $found,
            'Delete Product successfully'
          );
    }

    public function comment(Request $request){

        $validator = Validator::make($request->all(), [

            'username' => 'required',
            'email' => 'required',
            'title' => 'required',
            'content' => 'required',
            'product_id' => 'required',
        ]);

        if($validator->fails()){
            return $this->sendError('Validation Error.', $validator->errors());
        }

        $comment = new Comment();

        $comment->title = $request->title;
        $comment->content = $request->content;
        $comment->product_id = $request->product_id;
        $comment->user_id = $request->user_id;

        $comment->save();

        $newComment =  Comment::where('id',$comment->id)
        ->with('user','user.profile')
        ->first();
        return $this->sendResponse(
            $data = $newComment,
            'Create contact successfully.'
        );

    }
    public function getComment(Request $request){

        $user = auth('api')->user();
        $page = $request->query('page') ? $request->query('page') :  1;
        $pageSize =  $request->query('pageSize') ? $request->query('pageSize') :  25;
        $product_id= $request->query('id');
        $id = 0;
        if($user != null){
            $id = $user -> id;
        }
        $check = Order::where('user_id', $id)->whereHas('orderItems', function ($q) use ($product_id){
                return $q->where('product_id', $product_id);
            })->get();

        $query = Comment::query();

        $query = $query
            ->where('product_id',$product_id)
            ->orderBy('id','desc')
            ->with('user','user.profile');

        $total = $query->count();

        $comments = $query
            ->skip( ($page - 1) * $pageSize)
            ->take($pageSize)
            ->get();

        return $this->sendResponse(
            $data = [
                        'items' => $comments ,
                        'total' => $total,
                        'check' => $check->count()
                    ]
          );
    }
    public function checkOrder($id , $userId,Request $request){

        $orders = Order::where('user_id',$userId)->whereHas('orderItems', function ($q)  use ($id) {
            $q->where('product_id', $id);
        })->get();
        $check = $orders->count() > 0 ? true : false ;
        return $this->sendResponse(
            $data = [
                     'check' => $check ,
                    ]
          );
    }
}
