<?php

namespace App\Http\Controllers\Product;

use Illuminate\Http\Request;
use App\Http\Controllers\BaseController as BaseController;
use App\Models\Color;
use App\Models\Role;
use App\Models\Profile;
use App\Models\Shop;
use Validator;
use Illuminate\Support\Facades\Auth;

class ColorController extends BaseController
{
    public function index(Request $request){

        $page = $request->query('page') ?? 1;
        $pageSize = $request->query('pageSize') ?? 25;


            $colors = Color::orderBy('id','desc')
            ->skip( ($page - 1) * $pageSize )
            ->take($pageSize)
            ->get();
    

        return $this->sendResponse(
            $data = [
                     'items' => $colors , 
                     'total' => $colors->count()
                    ]
          );
    }


    public function search(Request $request){

        $page = $request->query('page') ?? 1;
        $pageSize = $request->query('pageSize') ?? 25;

        $query = Color::query();

        $searchKey = $request->query('q');

        if($searchKey != null){
            
            $query = $query
                           ->where('name','like','%'.$searchKey.'%');
                           
        }

        $colors = $query
        ->orderBy('id','desc')
        ->skip( ($page - 1) * $pageSize )
        ->take($pageSize)
        ->get();

        return $this->sendResponse(
            $data = [
                     'items' => $colors , 
                     'total' => $colors->count()
                    ]
          );
    }

    
    public function show($id){

        $found = Color::find($id);

        if($found == null){
            
            return $this->sendError('Color Errors.',['error' => 'Color not found !']);
        }

        return $this->sendResponse(
            $data = $found
        );

    }

    public function update($id,Request $request){

        $validator = Validator::make($request->all(), [

            'name' => 'required',
            'color' => 'required'
        ]);

        if($validator->fails()){
            return $this->sendError('Validation Error.', $validator->errors());       
        }

        $Color = Color::where('id',$id)->first();
        
        if($Color != null){

            $Color->name = $request->name;
            $Color->color = $request->color;
            $Color->save();

            return $this->sendResponse(
                $data = $Color,
                'Update Color successfully.'
            );
        }

        return $this->sendError('Color Errors.',['error' => 'Color not found !']);
    }

    public function create(Request $request){

        $validator = Validator::make($request->all(), [

            'name' => 'required|unique:colors',
            'color' => 'required'
        ]);

        if($validator->fails()){
            return $this->sendError('Validation Error.', $validator->errors());       
        }

        $Color = new Color();

        $Color->name = $request->name;
        $Color->color = $request->color;
        $Color->save();

        return $this->sendResponse(
            $data = $Color,
            'Create Color successfully.'
        );

    }

    public function delete($id,Request $request){

        $found = Color::find($id); 

        if($found == null){
            
            return $this->sendError('Color Errors.',['error' => 'Color not found !']);
        }

        $found->delete();

        return $this->sendResponse(
            $found, 
            'Delete Color successfully'
          );
    }
  
}
