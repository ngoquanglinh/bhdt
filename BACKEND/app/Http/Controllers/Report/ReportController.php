<?php

namespace App\Http\Controllers\Report;

use Illuminate\Http\Request;
use App\Http\Controllers\BaseController as BaseController;
use App\Models\Order;
use App\Models\Role;
use App\Models\Profile;
use App\Models\User;
use App\Models\Product;
use App\Models\Shop;
use App\Models\Contact;
use Validator;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class ReportController extends BaseController
{

    public function index(Request $request){

        $user = $request->user();

        // check role shop


        $toDate = Carbon::now();
        $fromDate =  new Carbon('first day of December 2020', 'UTC +7');

        $totalDiscount = Order::where('status',2)->whereBetween('created_at',[$fromDate,$toDate])->sum('total');

        $countNewCustomer = User::whereBetween('created_at',[$fromDate,$toDate])->whereHas('roles', function($q){
                                $q->where('name', '=', 'user');
                            })->count();

        $countContact = Contact::whereBetween('created_at',[$fromDate,$toDate])->count();
        $countNewOrder =  Order::where('type',1)->whereBetween('created_at',[$fromDate,$toDate])->count();
        $productHots = Product::with('inventories')->orderBy('bought','desc')->take(6)->get() ;


        // $totalAmount = DB::select("select Date(created_at) date, sum(total) total
        //                            from `orders` where `created_at` between '$fromDate' and '$toDate'
        //                            and status = 1
        //                            group by Date(created_at)
        //                            order by date
        //                            ");

        $totalAmount = DB::select("select Date(created_at) date, sum(total) total
                                   from `orders` where `created_at` between '$fromDate' and '$toDate' and type = 1
                                   group by Date(created_at)
                                   order by date
                                   ");
        // fill total amount

        $totalAmountFill = [];
        $dayStart = $fromDate->day;
        $dayEnd = $toDate->day;

        while($dayStart <= $dayEnd)
        {
            $dayStart ++;
            $set = false;

            foreach($totalAmount as $item){
                $itemDate = new Carbon($item->date);
                if($itemDate->day == $dayStart - 1){
                    $totalAmountFill[] = ['day' => $dayStart - 1, 'total' => $item->total];
                    $set = true;
                }
            }
            if($set) continue;
            $totalAmountFill[] = ['day' => $dayStart - 1 , 'total' => 0];
        }



        $success['totalDiscount'] = $totalDiscount;
        $success['countNewCustomer'] = $countNewCustomer;
        $success['countContact'] =  $countContact;
        $success['countNewOrder'] = $countNewOrder;
        $success['productHots'] = $productHots;
        $success['totalAmount'] = $totalAmountFill;



        return $this->sendResponse($success, 'Get data successfully.');


    }
    public function revenue(Request $request){


        $user = $request->user();

        $now = Carbon::now();
        $fromDate = $request->query('fromDate');
        $toDate = $request->query('toDate');

        $dataFill = [];
        $dayStart = (new Carbon($fromDate))->day ;
        $dayEnd = (new Carbon($toDate))->day;


            $data = Order::whereBetween ('created_at',[$fromDate,$toDate])
                         ->get()
                         ->groupBy(function($date) {
                            return Carbon::parse($date->created_at)->format('d');
                        });

            $data = DB::select("select cast(o2.created_at as date) day,
                                sum(o2.total) as totalAmount,
                                sum(case when o2.type = 1 then 1 else 0 end)  as totalOrder,
                                sum(a.totalProduct) totalProduct,
                                sum(case when o2.status = 2 then 1 else 0 end) totalOrderSuccess
                                from (
                                    select o.id, sum(oi.quantity) totalProduct
                                    from orders o
                                    join orders_items oi
                                    on o.id = oi.order_id
                                    group by o.id
                                ) as a
                                join orders o2
                                on o2.id = a.id
                                where o2.created_at between '$fromDate' and '$toDate'
                                group by cast(o2.created_at as date)");
        // fill total amount
        while($dayStart <= $dayEnd)
        {
            $dayStart ++;
            $set = false;

            foreach($data as $item){

                $itemDate = new Carbon($item->day);

                if($itemDate->day == $dayStart - 1){
                    $dataFill[] =
                                        [
                                            'day' => $dayStart - 1,
                                            'totalAmount'  => $item->totalAmount,
                                            'totalOrder'  => $item->totalOrder,
                                            'totalProduct'  => $item->totalProduct,
                                            'totalOrderSuccess'  => $item->totalOrderSuccess
                                        ];
                    $set = true;
                }
            }

            if($set) continue;

            $dataFill[] =
            [
                'day' => $dayStart - 1,
                'totalAmount'  => 0 ,
                'totalOrder'  => 0,
                'totalProduct'  =>  0,
                'totalOrderSuccess'  =>  0
            ];
        }

        return $dataFill;

    }
    public function employee(Request $request){
        return 'employee';
    }
    public function customer(Request $request){
        $user = $request->user();

        $now = Carbon::now();
        $fromDate = $request->query('fromDate');
        $toDate = $request->query('toDate');

        $dataFill = [];
        $dayStart = (new Carbon($fromDate))->day ;
        $dayEnd = (new Carbon($toDate))->day;



            $data = Order::whereBetween ('created_at',[$fromDate,$toDate])
                         ->get()
                         ->groupBy(function($date) {
                            return Carbon::parse($date->created_at)->format('d');
                        });

            $data = DB::select("select cast(o2.created_at as date) day,
                                sum(o2.total) as totalAmount,
                                sum(case when o2.type = 1 then 1 else 0 end)  as totalOrder,
                                sum(a.totalProduct) totalProduct,
                                sum(case when o2.status = 2 then 1 else 0 end) totalOrderSuccess
                                from (
                                    select o.id, sum(oi.quantity) totalProduct
                                    from orders o
                                    join orders_items oi
                                    on o.id = oi.order_id
                                    group by o.id
                                ) as a
                                join orders o2
                                on o2.id = a.id
                                where o2.created_at between '$fromDate' and '$toDate'
                                group by cast(o2.created_at as date)");

            $dataCount = DB::select("select count(id) totalOrderSuccess ,
                                    sum( case when exists (select 1 from users u2 where u2.id= o.user_id and u2.created_at between '$fromDate' and '$toDate') then 1 else 0 end ) totalOrderSucessNewCustomer
                                    from orders o
                                    where o.created_at between '$fromDate' and '$toDate' and  o.status != 0
                                    group by user_id");


        // fill total amount
        while($dayStart <= $dayEnd)
        {
            $dayStart ++;
            $set = false;

            foreach($data as $item){

                $itemDate = new Carbon($item->day);

                if($itemDate->day == $dayStart - 1){
                    $dataFill[] =
                                        [
                                            'day' => $dayStart - 1,
                                            'totalAmount'  => $item->totalAmount,
                                            'totalOrder'  => $item->totalOrder,
                                            'totalProduct'  => $item->totalProduct,
                                            'totalOrderSuccess'  => $item->totalOrderSuccess
                                        ];
                    $set = true;
                }
            }

            if($set) continue;

            $dataFill[] =
            [
                'day' => $dayStart - 1,
                'totalAmount'  => 0 ,
                'totalOrder'  => 0,
                'totalProduct'  =>  0,
                'totalOrderSuccess'  =>  0
            ];
        }

        $data = [];

        $data['dataCount'] = $dataCount[0] ?? 0;
        $data['dataFill'] = $dataFill  ;

        return $this->sendResponse(
            $data
        );

    }

}
