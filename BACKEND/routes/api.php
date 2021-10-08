<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Upload\UploadController as UploadController;
use App\Http\Controllers\Admin\AdminController as AdminController;
use App\Http\Controllers\User\UserController as UserController;
use App\Http\Controllers\Category\CategoryController as CategoryController;
use App\Http\Controllers\Product\SizeController as SizeController;
use App\Http\Controllers\Product\ColorController as ColorController;
use App\Http\Controllers\Product\ProductController as ProductController;
use App\Http\Controllers\Order\OrderController as OrderController;
use App\Http\Controllers\Report\ReportController as ReportController;
use App\Http\Controllers\Shop\ShopController as ShopController;
use App\Http\Controllers\Blog\BlogController as BlogController;
use App\Http\Controllers\Contact\ContactController as ContactController;
use App\Http\Controllers\Product\BrandController as BrandController;
use App\Http\Controllers\Slide\SlideController as SlideController;
use App\Http\Controllers\Branch\BranchController as BranchController;
use App\Http\Controllers\Warehouse\WarehouseController as WarehouseController;
use App\Models\User;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/



Route::get('/test',function(){
    return 'test'; 
 });



//================================== Admin


Route::prefix('admins')->group(function(){

    Route::get('/make-admin', [AdminController::class,'makeAdmin'] );
    Route::middleware(['auth:api', 'role'])->group(function() {
        Route::post('/user', [AdminController::class,'createUser'] );

    });
});



//================================== Upload file 

Route::prefix('uploads')->group(function(){

    Route::post('/{any}', [UploadController::class,'store'] )->where('any', '.*');

});



//================================== User 

Route::prefix('users')->group(function(){

    Route::post('/login', [UserController::class,'login'] )->name('login');
    Route::post('/register', [UserController::class,'register'] );
    Route::post('/facebook', [UserController::class,'loginFacebook'] );
    
    Route::get('/{id}', [UserController::class,'show'] );

    Route::put('/{id}', [UserController::class,'updateProfile'] );

    Route::put('/avatar/{id}', [UserController::class,'updateAvatar'] );

    Route::middleware(['auth:api'])->group(function() {
         
        Route::middleware(['scope:admin,shopManage,shopEmployee'])->get('/', [UserController::class,'index'] );
        Route::get('/search', [UserController::class,'search'] );
        // Route::get('/{id}', [UserController::class,'show'] );
        Route::post('/', [UserController::class,'create'] );
        Route::put('/{id}', [UserController::class,'update'] );
        Route::delete('/{id}', [UserController::class,'delete'] );

    });

});

//================================== Customer 

Route::prefix('customers')->group(function(){
    Route::middleware(['auth:api'])->group(function() {
        Route::middleware(['scope:admin,shopManage,shopEmployee'])->group(function() {
            Route::get('/', [UserController::class,'index'] );
            Route::get('/search', [UserController::class,'search'] );
            Route::get('/{id}', [UserController::class,'show'] );
            Route::post('/', [UserController::class,'create'] );
            Route::put('/{id}', [UserController::class,'update'] );
            Route::delete('/{id}', [UserController::class,'delete'] );

        });
    });
});

 // Route::middleware(['auth:api', 'role'])->group(function() {
      
 //     Route::middleware(['scope:shop'])->get('/', [CustomerController::class,'index'] );

 // });





//================================== Category 


Route::prefix('categories')->group(function(){
    
   Route::get('/', [CategoryController::class,'index'] );
   Route::get('/search', [CategoryController::class,'search'] );
   Route::get('/{id}', [CategoryController::class,'showChildren'] );

   Route::middleware(['auth:api'])->group(function() {
       Route::middleware(['scope:admin,shopManage,shopEmployee'])->post('/', [CategoryController::class,'create'] );
       Route::middleware(['scope:admin,shopManage,shopEmployee'])->put('/{id}', [CategoryController::class,'update'] );
       Route::middleware(['scope:admin,shopManage,shopEmployee'])->delete('/{id}', [CategoryController::class,'delete'] );
   });


});



//================================== Size 


Route::prefix('sizes')->group(function(){
    
    Route::get('/', [SizeController::class,'index'] );
    Route::get('/search', [SizeController::class,'search'] );
    Route::get('/{id}', [SizeController::class,'show'] );
 
    Route::middleware(['auth:api'])->group(function() {
        Route::middleware(['scope:admin,shopManage,shopEmployee'])->post('/', [SizeController::class,'create'] );
        Route::middleware(['scope:admin,shopManage,shopEmployee'])->put('/{id}', [SizeController::class,'update'] );
        Route::middleware(['scope:admin,shopManage,shopEmployee'])->delete('/{id}', [SizeController::class,'delete'] );
    });
 
 
 });


 
//================================== Color 


Route::prefix('colors')->group(function(){
    
    Route::get('/', [ColorController::class,'index'] );
    Route::get('/search', [ColorController::class,'search'] );
    Route::get('/{id}', [ColorController::class,'show'] );
 
    Route::middleware(['auth:api'])->group(function() {
        Route::middleware(['scope:admin,shopManage,shopEmployee'])->post('/', [ColorController::class,'create'] );
        Route::middleware(['scope:admin,shopManage,shopEmployee'])->put('/{id}', [ColorController::class,'update'] );
        Route::middleware(['scope:admin,shopManage,shopEmployee'])->delete('/{id}', [ColorController::class,'delete'] );
    });
 
 
 });


//================================== Product 


Route::prefix('products')->group(function(){

    Route::get('/', [ProductController::class,'index'] );
    Route::get('/search', [ProductController::class,'search'] );
    Route::get('/products-category/{categoryId}', [ShopController::class,'productsCategory'] );
    
    // Route::get('/search-admin', [ProductController::class,'searchAdmin'] );

    Route::middleware(['auth:api'])->group(function() {
        Route::middleware(['scope:admin,shopManage,shopEmployee'])->post('/', [ProductController::class,'create'] );
        Route::middleware(['scope:admin,shopManage,shopEmployee'])->put('/{id}', [ProductController::class,'update'] );
        Route::middleware(['scope:admin,shopManage,shopEmployee'])->delete('/{id}', [ProductController::class,'delete'] );
    });

    Route::get('/check/{id}/{userId}', [ProductController::class,'checkOrder'] );

    Route::get('/comment', [ProductController::class,'getComment'] );
    Route::post('/comment', [ProductController::class,'comment']);

    Route::get('/{id}', [ProductController::class,'show'] );

});




//================================== Order 


Route::prefix('orders')->group(function(){
    Route::post('/', [OrderController::class,'create'] );
    Route::get('/export', [OrderController::class,'export'] );
    Route::middleware(['auth:api'])->group(function() {
        
        Route::middleware(['scope:admin,shopManage,shopEmployee'])->get('/', [OrderController::class,'index'] );
        Route::middleware(['scope:admin,shopManage,shopEmployee'])->get('/search', [OrderController::class,'search'] );
        Route::middleware(['scope:admin,shopManage,shopEmployee'])->get('/{id}', [OrderController::class,'show'] );
        Route::middleware(['scope:admin,shopManage,shopEmployee'])->put('/{id}', [OrderController::class,'update'] );
        Route::middleware(['scope:admin,shopManage,shopEmployee'])->delete('/{id}', [OrderController::class,'delete'] );
        Route::middleware(['scope:admin,shopManage,shopEmployee'])->put('/status/{id}/{status}', [OrderController::class,'updateStatus'] );
        Route::middleware(['scope:admin,shopManage,shopEmployee'])->get('invoice/{id}', [OrderController::class,'showInvoice'] );

    });

});


//================================== REPORT 


Route::prefix('reports')->group(function(){
    Route::middleware(['auth:api'])->group(function() {
        Route::middleware(['scope:admin,shopManage,shopEmployee'])->get('/overview', [ReportController::class,'index'] );
        Route::middleware(['scope:admin,shopManage,shopEmployee'])->get('/revenue', [ReportController::class,'revenue'] );
        Route::middleware(['scope:admin,shopManage,shopEmployee'])->get('/employee', [ReportController::class,'employee'] );
        Route::middleware(['scope:admin,shopManage,shopEmployee'])->get('/customer', [ReportController::class,'customer'] );
    });

});




//======================================== PAGE =====================================


//================================== Shop 

Route::prefix('shops')->group(function(){

    Route::get('/sale-men', [ShopController::class,'saleMen'] );
    Route::get('/sale-women', [ShopController::class,'saleWomen'] );
    Route::get('/new-products', [ShopController::class,'newProducts'] );
    Route::get('/man-products', [ShopController::class,'manProducts'] );
    Route::get('/women-products', [ShopController::class,'womanProducts'] );
    Route::get('/shops', [ShopController::class,'index'] );
    Route::get('/top-product', [ShopController::class,'topProduct'] );

});


//================================== BLOG

Route::prefix('blogs')->group(function(){

    Route::get('/', [BlogController::class,'index'] );
    Route::get('/search', [BlogController::class,'search'] );
    Route::get('/recent', [BlogController::class,'recent'] );
    Route::get('/{id}', [BlogController::class,'show'] );

    Route::middleware(['auth:api'])->group(function() {
        Route::middleware(['scope:admin,shopManage,shopEmployee'])->post('/', [BlogController::class,'create'] );
        Route::middleware(['scope:admin,shopManage,shopEmployee'])->put('/{id}', [BlogController::class,'update'] );
        Route::middleware(['scope:admin,shopManage,shopEmployee'])->delete('/{id}', [BlogController::class,'delete'] );
    });

});



//================================== Contact 


Route::prefix('contacts')->group(function(){

    Route::middleware(['auth:api'])->group(function() {
        Route::get('/', [ContactController::class,'index'] );
        Route::get('/search', [ContactController::class,'search'] );
        Route::put('/{id}', [ContactController::class,'update'] );
        Route::delete('/{id}', [ContactController::class,'delete'] );
    });
    Route::post('/', [ContactController::class,'create'] );

});



//================================== brands 


Route::prefix('brands')->group(function(){
    
   Route::get('/', [BrandController::class,'index'] );
   Route::get('/search', [BrandController::class,'search'] );
   Route::get('/{id}', [BrandController::class,'showChildren'] );

   Route::middleware(['auth:api'])->group(function() {
       Route::middleware(['scope:admin,shopManage,shopEmployee'])->post('/', [BrandController::class,'create'] );
       Route::middleware(['scope:admin,shopManage,shopEmployee'])->put('/{id}', [BrandController::class,'update'] );
       Route::middleware(['scope:admin,shopManage,shopEmployee'])->delete('/{id}', [BrandController::class,'delete'] );
   });


});


//================================== slides 


Route::prefix('slides')->group(function(){
    
   Route::get('/', [SlideController::class,'index'] );
   Route::get('/search', [SlideController::class,'search'] );

   Route::middleware(['auth:api'])->group(function() {
       Route::middleware(['scope:admin,shopManage,shopEmployee'])->post('/', [SlideController::class,'create'] );
       Route::middleware(['scope:admin,shopManage,shopEmployee'])->put('/{id}', [SlideController::class,'update'] );
       Route::middleware(['scope:admin,shopManage,shopEmployee'])->delete('/{id}', [SlideController::class,'delete'] );
   });

});


//================================== brands 


Route::prefix('branches')->group(function(){
    
    Route::get('/', [BranchController::class,'index'] );
    Route::get('/search', [BranchController::class,'search'] );

    Route::middleware(['auth:api'])->group(function() {
        Route::middleware(['scope:admin,shopManage,shopEmployee'])->post('/', [BranchController::class,'create'] );
        Route::middleware(['scope:admin,shopManage,shopEmployee'])->put('/{id}', [BranchController::class,'update'] );
        Route::middleware(['scope:admin,shopManage,shopEmployee'])->delete('/{id}', [BranchController::class,'delete'] );
    });

});


//================================== warehouse 


Route::prefix('warehouses')->group(function(){
    
    Route::get('/', [WarehouseController::class,'index'] );
    Route::get('/search', [WarehouseController::class,'search'] );

    Route::middleware(['auth:api'])->group(function() {
        Route::middleware(['scope:admin,shopManage,shopEmployee'])->post('/', [WarehouseController::class,'create'] );
        Route::middleware(['scope:admin,shopManage,shopEmployee'])->put('/{id}', [WarehouseController::class,'update'] );
        Route::middleware(['scope:admin,shopManage,shopEmployee'])->delete('/{id}', [WarehouseController::class,'delete'] );
    });

});