<?php

namespace App\Http\Controllers\Product;

use Illuminate\Http\Request;
use App\Http\Controllers\BaseController as BaseController;
use App\Models\Brand;
use App\Models\Role;
use App\Models\Profile;
use Validator;
use Illuminate\Support\Facades\Auth;

class BrandController extends BaseController
{

    public function index(Request $request){
        
        $page = $request->query('page') ?? 1;
        $pageSize = $request->query('pageSize') ?? 25;

        $brands = 
        Brand::orderBy('id','desc')
        ->skip( ($page - 1) * $pageSize )
        ->take($pageSize)
        ->get();

        $total = Brand::count();
      
           
        return $this->sendResponse(
            $data = [
                     'items' => $brands , 
                     'total' => $total
                    ]
          );
    }

    public function search(Request $request){

        $page = $request->query('page') ?? 1;
        $pageSize = $request->query('pageSize') ?? 25;

        $query = Brand::query();
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

        $brands = $query
        ->orderBy('id','desc')
        ->skip( ($page - 1) * $pageSize )
        ->take($pageSize)
        ->get();

        return $this->sendResponse(
            $data = [
                     'items' => $brands , 
                     'total' => $brands-> count()
                    ]
          );
    }
    
    public function showChildren($id){

        $found = Brand::where('id',$id)->with('children')->first();

        return $this->sendResponse(
            $data = $found
        );

    }

    public function update($id,Request $request){

        $validator = Validator::make($request->all(), [
            'name' => 'required'
        ]);

        if($validator->fails()){
            return $this->sendError('Validation Error.', $validator->errors());       
        }

        $brands = Brand::find($id);
        
        if($brands != null){

            $brands->name = $request->name;
            $brands->parent_id = $request->parentId;
            $brands->save();

            return $this->sendResponse(
                $data = $brands,
                'Update brands successfully.'
            );
        }

        return $this->sendError('Brand Errors.',['error' => 'Brand not found !']);
    }

    public function create(Request $request){

        $validator = Validator::make($request->all(), [

            'name' => 'required'
        ]);

        if($validator->fails()){
            return $this->sendError('Validation Error.', $validator->errors());       
        }

        $parentId = $request->parentId;
        $parentBrand = Brand::find($parentId);
        $brands = new Brand();
        
        if($parentBrand == null ){
                $brands->name = $request->name;
                $brands->parent_id = $parentId;
        }
        else {
                $brands->name = $request->name;
                $brands->parent_id = $parentId;
        }
        $brands->save();
            return $this->sendResponse(
                $data = $brands,
                'Create brands successfully.'
            );

    }
    public function delete($id,Request $request){

        $found = Brand::find($id); 

        if($found == null){
            
            return $this->sendError('Brand Errors.',['error' => 'Brand not found !']);
        }

        $found->delete();

        return $this->sendResponse(
            $found, 
            'Delete brands successfully'
          );
    }

}
