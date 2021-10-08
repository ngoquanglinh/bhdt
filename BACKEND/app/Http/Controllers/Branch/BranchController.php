<?php

namespace App\Http\Controllers\Branch;

use Illuminate\Http\Request;
use App\Http\Controllers\BaseController as BaseController;
use App\Models\Branch;
use App\Models\Role;
use App\Models\Profile;
use Validator;
use Illuminate\Support\Facades\Auth;

class BranchController extends BaseController
{

    public function index(Request $request){
        
        $page = $request->query('page') ?? 1;
        $pageSize = $request->query('pageSize') ?? 25;

        $branches = 
        Branch::orderBy('id','desc')
        ->skip( ($page - 1) * $pageSize )
        ->take($pageSize)
        ->get();

        $total = Branch::count();
      
           
        return $this->sendResponse(
            $data = [
                     'items' => $branches , 
                     'total' => $total
                    ]
          );
    }

    // public function search(Request $request){

    //     $page = $request->query('page') ?? 1;
    //     $pageSize = $request->query('pageSize') ?? 25;

    //     $query = Branch::query();
    //     $searchKey = $request->query('q');
    //     $price = $request->query('price');

    //     if($searchKey != null){
            
    //         $query = $query
    //                        ->orWhere('name','like','%'.$searchKey.'%')
    //                        ->orWhere('description','like','%'.$searchKey.'%');
                           
    //     }

    //     if($price != null)
    //     {
    //         $query = $query->Where('price' , '>' , $price);
    //     }

    //     $branches = $query
    //     ->orderBy('id','desc')
    //     ->skip( ($page - 1) * $pageSize )
    //     ->take($pageSize)
    //     ->get();

    //     return $this->sendResponse(
    //         $data = [
    //                  'items' => $branches , 
    //                  'total' => $branches-> count()
    //                 ]
    //       );
    // }

    
    public function update($id,Request $request){

        $validator = Validator::make($request->all(), [
            'name' => 'required'
        ]);

        if($validator->fails()){
            return $this->sendError('Validation Error.', $validator->errors());       
        }

        $branch = Branch::find($id);
        
        if($branch != null){

            $branch->name = $request->name;
            $branch->save();

            return $this->sendResponse(
                $data = $branch,
                'Update branch successfully.'
            );
        }

        return $this->sendError('Branch Errors.',['error' => 'Branch not found !']);
    }

    public function create(Request $request){

        $validator = Validator::make($request->all(), [

            'name' => 'required'
        ]);

        if($validator->fails()){
            return $this->sendError('Validation Error.', $validator->errors());       
        }

        $branch = new Branch();
        $branch->name = $request->name;
        $branch->save();
            return $this->sendResponse(
                $data = $branch,
                'Create branch successfully.'
            );

    }
    public function delete($id,Request $request){

        $found = Branch::find($id); 

        if($found == null){
            
            return $this->sendError('Branch Errors.',['error' => 'Branch not found !']);
        }

        $found->delete();

        return $this->sendResponse(
            $found, 
            'Delete branch successfully'
          );
    }

}
