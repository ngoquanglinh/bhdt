<?php

namespace App\Http\Controllers\Slide;

use Illuminate\Http\Request;
use App\Http\Controllers\BaseController as BaseController;
use App\Models\Category;
use App\Models\Slide;
use App\Models\ProductSlides;
use App\Models\Role;
use App\Models\Profile;
use Validator;
use Illuminate\Support\Facades\Auth;

class SlideController extends BaseController
{

    public function index(Request $request){

        $page = $request->query('page') ?? 1;
        $pageSize = $request->query('pageSize') ?? 25;


        $slides = 
        Slide::orderBy('id','desc')
        ->where('status',1)
        ->with('products_slides')
        ->skip( ($page - 1) * $pageSize )
        ->take($pageSize)
        ->get();

        $total = Slide::count();
      
           
        return $this->sendResponse(
            $data = [
                     'items' => $slides , 
                     'total' => $total
                    ]
          );
    }



    public function search(Request $request){

        $page = $request->query('page') ?? 1;
        $pageSize = $request->query('pageSize') ?? 25;

        $query = Category::query();
        $searchKey = $request->query('q');
        $price = $request->query('price');

        if($searchKey != null){
            
            $query = $query
                           ->orWhere('name','like','%'.$searchKey.'%')
                           ->orWhere('description','like','%'.$searchKey.'%');
                           
        }

        if($price != null)
        {
            $query = $query->Where('price' , '>' , $price);
        }

        $categories = $query
        ->orderBy('id','desc')
        ->skip( ($page - 1) * $pageSize )
        ->take($pageSize)
        ->get();

        return $this->sendResponse(
            $data = [
                     'items' => $categories , 
                     'total' => $categories-> count()
                    ]
          );
    }

    
    public function showChildren($id){

        $found = Category::where('id',$id)->with('children')->first();

        return $this->sendResponse(
            $data = $found
        );

    }

    
    public function update($id,Request $request){

        $validator = Validator::make($request->all(), [
            'title' => 'required',
            'disception' => 'required',
            'image' =>  'required',
        ]);

        if($validator->fails()){
            return $this->sendError('Validation Error.', $validator->errors());       
        }

        $slide = Slide::find($id);
        
        if($slide != null){

            $slide -> status = $request->status ?? 1;
            $slide -> title = $request->title ;
            $slide -> disception = $request->disception;
            $slide -> image = $request->image;
            $slide->save();

            $ps = ProductSlides::where("slide_id",$id)->get();

            foreach($ps as $item)
            {
                ProductSlides::where("slide_id",$item->slide_id)->delete();
            }

            $slideProducts = [];
            
            foreach($request->products as $item)
            {
                $slideProducts[] = [
                    'product_id' => $item
                ];
            }

            $slide->products_slides()->attach($slideProducts);

            return $this->sendResponse(
                $data = $slide,
                'Update category successfully.'
            );
        }

        return $this->sendError('Category Errors.',['error' => 'Category not found !']);
    }

    public function create(Request $request){

        $validator = Validator::make($request->all(), [

            'title' => 'required',
            'disception' => 'required',
            'image' =>  'required',
        ]);

        if($validator->fails()){
            return $this->sendError('Validation Error.', $validator->errors());       
        }

        
        $slide = new Slide();

        $slideProducts = [];
        foreach($request->products as $item)
        {
            $slideProducts[] = [
                'product_id' => $item
            ];
        }

        $slide -> status = $request->status ?? 1;
        $slide -> title = $request->title ;
        $slide -> disception = $request->disception;
        $slide -> image = $request->image;
        $slide->save();
        $slide->products_slides()->attach($slideProducts);
      

            return $this->sendResponse(
                $data = $slide,
                'Create slide successfully.'
            );
    }

    public function delete($id,Request $request){

        $found = Slide::find($id); 
        $ps = ProductSlides::where("slide_id",$id)->get();

        foreach($ps as $item)
        {
           ProductSlides::where("slide_id",$item->slide_id)->delete();
        }

        if($found == null){
            
            return $this->sendError('Category Errors.',['error' => 'slide not found !']);
        }

        $found->delete();

        return $this->sendResponse(
            $found, 
            'Delete category successfully'
          );
    }

}
