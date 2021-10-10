<?php

namespace App\Http\Controllers\Admin;
use Illuminate\Http\Request;
use App\Http\Controllers\BaseController as BaseController;
use App\Models\User;
use App\Models\Role;
use App\Models\Warehouse;
use App\Models\Branch;
use Validator;
use Illuminate\Support\Facades\Auth;

class AdminController extends BaseController
{
    public function makeAdmin(Request $request)
    {
   
        $admin = User::where('username','admin')->first();
        $warehouse = Warehouse::first();
        $branch = Branch::first();

        if($branch == null){
            $branch = Branch::create([ 
                'name' => 'chi nhánh chính',
                'parent_id' => '',
            ]);
        }
        if($warehouse == null){
            $warehouse = Warehouse::create([ 
                'name' => 'kho chi nhánh chính',
                'branch_id' =>  $branch-> id,
            ]);
        }
   
        if($admin == null){
            
            Role::insert([
                [
                    'name'=>'admin',
                ],
                [
                    'name'=>'shopManage',
                ],
                [
                    'name'=>'shopEmployee',
                ],
                [
                    'name'=>'customer'
                ],
            ]);

            $admin = User::create([ 
                'username' => 'admin',
                'name' => 'admin',
                'password' => bcrypt('admin@123'),
                'email' => 'admin@gmail.com'
            ]);

            $shopManage = User::create([ 
                'username' => 'shopManage',
                'name' => 'shopManage',
                'password' => bcrypt('admin@123'),
                'email' => 'shopManage@gmail.com'
            ]);

            $shopEmployee = User::create([ 
                'username' => 'shopEmployee',
                'name' => 'shopEmployee',
                'password' => bcrypt('admin@123'),
                'email' => 'shopEmployee@gmail.com'

            ]);

            $customer = User::create([ 
                'username' => 'customer',
                'name' => 'customer',
                'password' => bcrypt('admin@123'),
                'email' => 'customer@gmail.com'
            ]);

            $admin->roles()->attach(['role_id' => Role::where('name','admin')->first()->id]);

            $shopManage->roles()->attach(['role_id' => Role::where('name','shopManage')->first()->id]);

            $shopEmployee->roles()->attach(['role_id' => Role::where('name','shopEmployee')->first()->id]);
            
            $customer->roles()->attach(['role_id' => Role::where('name','customer')->first()->id]);
            
            return $this->sendResponse('empty', 'Admin created success');
        }
        return $this->sendResponse('empty','Admin created !');
    }


    public function createUser(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'username' => 'required|unique:users',
            'email' => 'required|email|unique:users',
            'role' => 'required',
            'password' => 'required',
            'c_password' => 'required|same:password'
        ]);

        if($validator->fails()){

            return $this->sendError('Validation Error.', $validator->errors());       

        }

        $foundRole = Role::where('name',$request->role)->first();
        if($foundRole == null){
            return $this->sendError('Role Error.', 'Role not found');  
        }

           
        $input = $request->all();
        $input['password'] = bcrypt($input['password']);
   

        $user = User::create($input);
        $user->roles()->attach(['role_id' => $foundRole->id]);

        return $this->sendResponse($user,'user success !');
    }
}
