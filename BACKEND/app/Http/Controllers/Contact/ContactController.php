<?php

namespace App\Http\Controllers\Contact;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Contact;
use App\Models\User;
use App\Models\Profile;
use App\Models\Role;    
use Validator;
use App\Http\Controllers\BaseController as BaseController;
use Illuminate\Support\Facades\Auth;

class ContactController extends BaseController
{
      public function create(Request $request){

        $validator = Validator::make($request->all(), [

            'name' => 'required',
            'email' =>  'email',
            // 'phone' => 'required|numeric',
            // 'address' => 'required',
            'message' => 'required',
        ]);

        if($validator->fails()){
            return $this->sendError('Validation Error.', $validator->errors());       
        }

        $contact = new Contact();

        $contact->message = $request->message;

        if($request->idUser != null ){
            $user = User::where('id',$request->idUser)->first();
            $user->profile->phone = $request->phone;
            $user->profile->address = $request->address;
            $user->profile->name = $request->name;
            $user->save();
            $contact->user_id = $request->idUser;
        }else{
            $user = new User();
            $user->username = $request->name;
            $user->email = $request->email;
            $user->password = bcrypt("123456");
            $user->save();
            $user->roles()->attach(['role_id' => Role::where('name','customer')->first()->id]);

            $profile['phone'] = $request->phone;
            $profile['address'] = $request->address;
            $profile['name'] = $request->name;
            $profile['user_id'] = $user->id;

            $profile = Profile::create($profile);

            $profile->save();

            $contact->user_id = $user->id;

        }
        $contact->save();
        return $this->sendResponse(
            $data = $contact,
            'Create contact successfully.'
        );

    }
     public function index(Request $request){
        $page = $request->query('page') ? $request->query('page') : 1;
        $pageSize = $request->query('pageSize') ? $request->query('pageSize') : 25;

            $Contact = Contact::orderBy('id','desc')
            ->with('user')
            ->skip( ($page - 1) * $pageSize )
            ->take($pageSize)
            ->get();
        
        $total = Contact::get();
        return $this->sendResponse(
            $data = [
                     'items' => $Contact , 
                     'total' => $Contact->count()
                    ]
          );
    }

    public function search(Request $request){
        $page = $request->query('page') ? $request->query('page') : 1;
        $pageSize = $request->query('pageSize') ? $request->query('pageSize') : 25;
        $query = Contact::query();
        $searchKey = $request->query('q');

        if($searchKey != null){

            $query = $query->join('users','contacts.user_id','=','users.id')
                           ->join('profiles','profiles.user_id','=','users.id')
                           ->where('profiles.name','like','%'.$searchKey.'%')
                           ->orWhere('contacts.message','like','%'.$searchKey.'%')
                           ->orWhere('profiles.phone','like','%'.$searchKey.'%');
        }

        $Contact = $query
        ->orderBy('contacts.id','desc')
        ->skip( ($page - 1) * $pageSize )
        ->take($pageSize)
        ->get();
        
        $total = Contact::get();
        return $this->sendResponse(
            $data = [
                     'items' => $Contact , 
                     'total' => $Contact->count()
                    ]
          );
    }


    public function update($id,Request $request){


        $Contact = Contact::where('id',$id)
                ->first();
        if($Contact != null){
            $Contact->status = $request->status;
            
            $Contact->save();
            return $this->sendResponse(
                $data = $Contact,
                'Update Order successfully.'
            );
        }

        return $this->sendError('Order Errors.',['error' => 'Order not found !']);
    }


       public function delete($id,Request $request){

        $found = Contact::find($id); 

        if($found == null){
            
            return $this->sendError('Shop Errors.',['error' => 'Shop not found !']);
        }

        $found->delete();

        return $this->sendResponse(
            $found, 
            'Delete Shop successfully'
          );
    }
}
