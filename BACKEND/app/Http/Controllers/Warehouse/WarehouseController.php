<?php

namespace App\Http\Controllers\Warehouse;

use Illuminate\Http\Request;
use App\Http\Controllers\BaseController as BaseController;
use App\Models\Warehouse;
use App\Models\Role;
use App\Models\Profile;
use Validator;
use Illuminate\Support\Facades\Auth;

class WarehouseController extends BaseController
{

    public function index(Request $request){
        
        $page = $request->query('page') ?? 1;
        $pageSize = $request->query('pageSize') ?? 25;

        $warehousees = 
        Warehouse::orderBy('id','desc')
        ->skip( ($page - 1) * $pageSize )
        ->take($pageSize)
        ->get();

        $total = Warehouse::count();
      
           
        return $this->sendResponse(
            $data = [
                     'items' => $warehousees , 
                     'total' => $total
                    ]
          );
    }

    // public function search(Request $request){

    //     $page = $request->query('page') ?? 1;
    //     $pageSize = $request->query('pageSize') ?? 25;

    //     $query = Warehouse::query();
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

    //     $warehousees = $query
    //     ->orderBy('id','desc')
    //     ->skip( ($page - 1) * $pageSize )
    //     ->take($pageSize)
    //     ->get();

    //     return $this->sendResponse(
    //         $data = [
    //                  'items' => $warehousees , 
    //                  'total' => $warehousees-> count()
    //                 ]
    //       );
    // }

    
    public function update($id,Request $request){

        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'branchId' => 'required'
        ]);

        if($validator->fails()){
            return $this->sendError('Validation Error.', $validator->errors());       
        }

        $warehouse = Warehouse::find($id);
        
        if($warehouse != null){

            $warehouse->name = $request->name;
            $warehouse->branch_id = $request->branchId;
            $warehouse->save();

            return $this->sendResponse(
                $data = $warehouse,
                'Update warehouse successfully.'
            );
        }

        return $this->sendError('Warehouse Errors.',['error' => 'Warehouse not found !']);
    }

    public function create(Request $request){

        $validator = Validator::make($request->all(), [

            'name' => 'required',
            'branchId' => 'required'
        ]);

        if($validator->fails()){
            return $this->sendError('Validation Error.', $validator->errors());       
        }

        $warehouse = new Warehouse();
        $warehouse->name = $request->name;
        $warehouse->branch_id = $request->branchId;
        $warehouse->save();
            return $this->sendResponse(
                $data = $warehouse,
                'Create warehouse successfully.'
            );

    }
    public function delete($id,Request $request){

        $found = Warehouse::find($id); 

        if($found == null){
            
            return $this->sendError('Warehouse Errors.',['error' => 'Warehouse not found !']);
        }

        $found->delete();

        return $this->sendResponse(
            $found, 
            'Delete warehouse successfully'
          );
    }

}
