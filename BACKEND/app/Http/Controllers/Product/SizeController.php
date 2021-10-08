<?php

namespace App\Http\Controllers\Product;

use Illuminate\Http\Request;
use App\Http\Controllers\BaseController as BaseController;
use App\Models\Size;
use App\Models\ProductSize;
use App\Models\Role;
use Validator;
use Illuminate\Support\Facades\Auth;

class SizeController extends BaseController
{
    public function index(Request $request){

        $page = $request->query('page') ?? 1;
        $pageSize = $request->query('pageSize') ?? 25;

        $Sizes = Size::orderBy('id','desc')
            ->skip( ($page - 1) * $pageSize )
            ->take($pageSize)
            ->get();

        return $this->sendResponse(
            $data = [
                     'items' => $Sizes , 
                     'total' => $Sizes->count()
                    ]
          );
    }
    public function search(Request $request){

        $page = $request->query('page') ?? 1;
        $pageSize = $request->query('pageSize') ?? 25;

        $query = Size::query();

        $searchKey = $request->query('q');

        if($searchKey != null){
            
            $query = $query
                           ->where('name','like','%'.$searchKey.'%');
                           
        }

        $Sizes = $query
        ->orderBy('id','desc')
        ->skip( ($page - 1) * $pageSize )
        ->take($pageSize)
        ->get();

        return $this->sendResponse(
            $data = [
                     'items' => $Sizes , 
                     'total' => $Sizes->count()
                    ]
          );
    }

    
    public function show($id){

        $found = Size::find($id);

        if($found == null){
            
            return $this->sendError('Size Errors.',['error' => 'Size not found !']);
        }

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

        $Size = Size::where('id',$id)->first();
        
        if($Size != null){

            $Size->name = $request->name;
            $Size->save();

            return $this->sendResponse(
                $data = $Size,
                'Update Size successfully.'
            );
        }

        return $this->sendError('Size Errors.',['error' => 'Size not found !']);
    }

    public function create(Request $request){

        $validator = Validator::make($request->all(), [

            'name' => 'required|unique:sizes'
        ]);

        if($validator->fails()){
            return $this->sendError('Validation Error.', $validator->errors());       
        }

        $Size = new Size();

        $Size->name = $request->name;
        $Size->save();

        return $this->sendResponse(
            $data = $Size,
            'Create Size successfully.'
        );

    }

    public function delete($id,Request $request){

        $ProductSize = ProductSize::where('size_id', $id);

        if($ProductSize != null){
            $ProductSize->delete();
        }

        $found = Size::find($id); 

        if($found == null){
            
            return $this->sendError('Size Errors.',['error' => 'Size not found !']);
        }

        $found->delete();

        return $this->sendResponse(
            $found, 
            'Delete Size successfully'
          );
    }
  
}
