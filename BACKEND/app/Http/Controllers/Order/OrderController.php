<?php

namespace App\Http\Controllers\Order;

use Illuminate\Http\Request;
use App\Http\Controllers\BaseController as BaseController;
use App\Models\Order;
use App\Models\Role;
use App\Models\Profile;
use App\Models\Product;
use App\Models\OrderItem;
use App\Models\ProductInventories;
use App\Models\User;
use App\Models\Shop;
use App\Models\Warehouse;
use Validator;
use Illuminate\Support\Facades\Auth;
use Maatwebsite\Excel\Facades\Excel;
use App\Exports\OrderExport;

class OrderController extends BaseController
{
    public function index(Request $request){


        $page = $request->query('page') ?? 1;
        $pageOrder = $request->query('pageSize') ?? 25;
        $userId = $request->query('userId');
        $type = $request->query('type');
        $query = Order::query();

        $query =  $query->orderBy('id','desc')
        ->with('orderItems','orderItems.product','orderItems.size','orderItems.color','orderItems.product.images')
        ->with('creator')
        ->with('customer');

        if($userId != null){
            $query = $query->where('orders.user_id', $userId );
        }

        if($type != null){
            $query = $query->where('orders.type', $type );
        }

        $Orders =  $query
                    ->skip( ($page - 1) * $pageOrder )
                    ->take($pageOrder)
                    ->get();

        return $this->sendResponse(
            $data = [
                     'items' => $Orders ,
                     'total' => $query->count(),
                    ]
          );
    }

    public function search(Request $request){

        $page = $request->query('page') ?? 1;
        $pageOrder = $request->query('pageSize') ?? 25;
        $query = Order::query();
        $searchKey = $request->query('q');

        if($searchKey != null){

            $query = $query->join('users','orders.user_id','=','users.id')
                           ->join('profiles','profiles.user_id','=','users.id')
                           ->where('profiles.name','like','%'.$searchKey.'%');

        }

        $total = $query->count();

        $Orders = $query
        ->orderBy('orders.id','desc')
        ->skip( ($page - 1) * $pageOrder )
        ->take($pageOrder)
        ->get();

        return $this->sendResponse(
            $data = [
                     'items' => $Orders ,
                     'total' => $total
                    ]
          );
    }

    public function show($id){

        $found = Order::where('id',$id)
        ->with('orderItems','orderItems.product','orderItems.size','orderItems.color','orderItems.product.images')
        ->with('creator')
        ->with('customer','customer.profile')
        ->first();

        return $this->sendResponse(
            $data = $found
        );

    }

    public function update($id,Request $request){


        $Order = Order::where('id',$id)
                ->with('customer')
                ->with('orderItems')
                ->first();
        if($Order != null){
            $Order->status = $request->status;

            $Order->save();
            return $this->sendResponse(
                $data = $Order,
                'Update Order successfully.'
            );
        }

        return $this->sendError('Order Errors.',['error' => 'Order not found !']);
    }

    public function create(Request $request){

        $userLogin = auth('api')->user();
        $validator = Validator::make($request->all(), [

            'total' => 'required',
            'name' => 'required',
            'email' => 'email',
            'phone' => 'required',
            'username' => 'required',
            'address' => 'required'
        ]);

        if($validator->fails()){
            return $this->sendError('Validation Error.', $validator->errors());
        }

        $warehouses = Warehouse::first();
        $warehouseId = $request-> warehouseId || $warehouses->id;
        $Order = new Order();
        $Order->status = 0;
        $Order->ship_address = $request->ship_address;
        $Order->total = $request->total;
        $Order->type = $request->type;
        $Order->warehouse_id =  $warehouseId;
        $Order -> creator_id =  $userLogin->id;

        if($request->user_id != null ){

            $user = User::where('id',$request->user_id)->first();
            $user->email = $request->email;

            if( $user->profile == null ){
                $profile['phone'] = $request->phone;
                $profile['address'] = $request->address;
                $profile['name'] = $request->name;
                $profile['user_id'] = $user->id;
                $profile = Profile::create($profile);
                $profile->save();
            }else{
                $user->profile->phone = $request->phone;
                $user->profile->address = $request->address;
                $user->profile->name = $request->name;
            }

            $user->save();
            $Order->user_id = $user->id;

        }else{
            $user = new User();
            $user->username = $request->username;
            $user->email = $request->email;
            $user->password = bcrypt('123456');
            $user->save();
            $user->roles()->attach(['role_id' => Role::where('name','customer')->first()->id]);

            $profile['phone'] = $request->phone;
            $profile['address'] = $request->address;
            $profile['name'] = $request->name;
            $profile['user_id'] = $user->id;
            $profile = Profile::create($profile);
            $profile->save();
            $Order->user_id  = $user->id;
        }

        $Order->save();
        foreach ($request->details as $item) {

            $OrderItem = new OrderItem();
            $OrderItem->product_id = $item['product_id'];
            $OrderItem->quantity = $item['quantity'];
            $OrderItem->total = $item['total'];
            $OrderItem->order_id = $Order->id;
            // $OrderItem->color_id = $item['color_id'] || null;
            $OrderItem->color_id =  null;
            $OrderItem->size_id =   null;
            $OrderItem->save();

            // quan ly kho kieu moi khong dung quantity

            $Product = Product::where('id',$item['product_id'])->first();
            $Product->quantity -= $item['quantity'];
            $Product->bought += 1;
            $Product->sale += 1;
            $Product->save();

            //

            $inven = User::where('id',$request->user_id)->first();

            // ton kho
            $inventory = ProductInventories::where('product_id',$item['product_id'])->where('warehouse_id',$warehouseId)->first();
            if( $request->type == 1 || $request->type == 3){
                // sales
                if($inventory != null){
                    $inventory -> inventory  -= $item['quantity'];
                    ProductInventories::where('product_id',$item['product_id'])->where('warehouse_id',$warehouseId)->update(['inventory' =>  $inventory -> inventory]);
                }else{
                    $inv = new ProductInventories();
                    $inv -> product_id = $item['product_id'];
                    $inv -> warehouse_id = $warehouseId;
                    $inv -> inventory  =  -$item['quantity'];
                    $inv -> save();
                }
            }else if( $request->type == 2){
                // import
                if($inventory != null){
                    $inventory -> inventory  += $item['quantity'];
                    ProductInventories::where('product_id',$item['product_id'])->where('warehouse_id',$warehouseId)->update(['inventory' =>  $inventory -> inventory]);
                }else{
                    $inv = new ProductInventories();
                    $inv -> product_id = $item['product_id'];
                    $inv -> warehouse_id = $warehouseId;
                    $inv -> inventory  =  $item['quantity'];
                    $inv -> save();
                }
            }
        }

        $order = Order::where('id',$Order->id)
        ->with('orderItems')
        ->with('customer')
        ->with('creator')
        ->first();

        return $this->sendResponse(
            $data = $order,
            'Create Order successfully.'
        );

    }

    public function delete($id,Request $request){

        // $user = $request->user();

        $found = Order::where('id', $id)->first();
        $orderItems = OrderItem::where('order_id',$id)->get();

         // ton kho
        $inventory = ProductInventories::where('product_id',$item['product_id'])->where('warehouse_id',$found -> $warehouse_id)->first();
        if($found->type == 3){
            // phieu xuat
            foreach ($orderItems as $item) {
                if($inventory != null){
                    $inventory -> inventory  += $item['quantity'];
                    $inventory -> save();
                }else{
                    $inv = new ProductInventories();
                    $inv -> product_id = $item['product_id'];
                    $inv -> warehouse_id = $warehouseId;
                    $inv -> inventory  =  $item['quantity'];
                    $inv -> save();
                }
            }

        }else if( $found->type == 2){
            // phieu nhap
            if($inventory != null){
                $inventory -> inventory  -= $item['quantity'];
                $inventory -> save();
            }else{
                $inv = new ProductInventories();
                $inv -> product_id = $item['product_id'];
                $inv -> warehouse_id = $warehouseId;
                $inv -> inventory  =  -$item['quantity'];
                $inv -> save();
            }
        }

        if($orderItems == null){
            foreach ($orderItems as $it) {
                $it->delete();
            }
        }
        if($found == null){
            return $this->sendError('Order Errors.',['error' => 'Order not found !']);
        }
        $found->delete();

        return $this->sendResponse(
            $found,
            'Delete Order successfully'
          );
    }
      public function updateStatus($id,$status,Request $request){

        $Order = Order::where('id',$id)->first();

        if($Order != null){

            $Order->status = $status;
            $Order->save();

            return $this->sendResponse(
                $data = $Order,
                'Update Order successfully.'
            );
        }

        return $this->sendError('Order Errors.',['error' => 'Order not found !']);
    }

    public function export(Request $request){
        // $user = $request->user();
        return Excel::download(new OrderExport(), 'orders.xlsx');

    }
    public function showInvoice($id){

        $found = OrderItem::where('order_id',$id)
        ->with('product')
        ->get();

        return $this->sendResponse(
            $data = $found
        );

    }
}
