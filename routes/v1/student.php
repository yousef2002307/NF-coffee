<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Models\About;
use App\Models\User;
use App\Models\OrderDetail;
use App\Models\Activity;
use App\Models\Product;
use App\Http\Middleware\AdminMiddleware;
use GuzzleHttp\Psr7\Response;
use App\Models\BestSeller;
use App\Models\Favorite;
use App\Models\Menushop;
use App\Http\Middleware\TrackVisits;
use App\Models\Cart;
use Illuminate\Support\Facades\Auth;
use App\Models\Visit;
use Illuminate\Support\Facades\DB;

Route::get("/test",function(){
    // return Favorite::find(1)->product;
    // return User::find(7)->favorites;
    // return Product::find(49)->users;
})->withoutMiddleware('auth:sanctum');
Route::post('/register', 'App\Http\Controllers\SecuirtyController@register')->withoutMiddleware('auth:sanctum');
Route::post('/login', 'App\Http\Controllers\SecuirtyController@login')->withoutMiddleware('auth:sanctum');
Route::post('/loginphone', 'App\Http\Controllers\SecuirtyController@loginphone')->withoutMiddleware('auth:sanctum');
Route::post('/editprofile', 'App\Http\Controllers\SecuirtyController@updateprofile');
Route::post('/logout', 'App\Http\Controllers\SecuirtyController@logout');
Route::resource('/menu', 'App\Http\Controllers\MenuController')->withoutMiddleware('auth:sanctum');
Route::resource('/order', 'App\Http\Controllers\OrderDetailController');
Route::resource('/blog', 'App\Http\Controllers\BlogController')->middleware([AdminMiddleware::class])->except(['create','edit','update']);
Route::post("updblog/{id}",'App\Http\Controllers\BlogController@update')->middleware([AdminMiddleware::class]);
Route::get("allblog",'App\Http\Controllers\BlogControlleruser@index')->middleware(([TrackVisits::class]))->withoutMiddleware('auth:sanctum');
Route::get("allblog/{id}",'App\Http\Controllers\BlogControlleruser@show')->middleware(([TrackVisits::class]))->withoutMiddleware('auth:sanctum');
Route::resource('/cart', 'App\Http\Controllers\CartCon')->middleware(([TrackVisits::class]));
Route::resource('/fav', 'App\Http\Controllers\FavCon')->middleware(([TrackVisits::class]));
Route::resource('/aduser', 'App\Http\Controllers\AdminOptOnUser')->middleware([AdminMiddleware::class]);
Route::resource('/adproduct', 'App\Http\Controllers\AdminOptOnProd')->middleware([AdminMiddleware::class]);
Route::resource('/cat', 'App\Http\Controllers\CatCon')->middleware(([TrackVisits::class]))->withoutMiddleware('auth:sanctum');
Route::post("/directorder", 'App\Http\Controllers\DirectOrder@directorder');
Route::get('/products', 'App\Http\Controllers\products@index')->middleware(([TrackVisits::class]))->withoutMiddleware('auth:sanctum');
Route::resource("/rating", "App\Http\Controllers\RatingCon")->middleware(([TrackVisits::class]));
Route::resource("/menushop", "App\Http\Controllers\MenushopCon")->except(["update"])->middleware([AdminMiddleware::class]);
Route::post("/menushop/{id}", "App\Http\Controllers\MenushopCon@update")->middleware([AdminMiddleware::class]);
Route::resource("/activitylog","App\Http\Controllers\ActivityLog")->except(['create','store','edit','update']);

Route::get("/menutocat/{catid}",function($catid){
//get all menushops related to specific catagory
    return Menushop::where("category_id",$catid)->get();
})->withoutMiddleware('auth:sanctum');
Route::get("/ratingproduct/{id}",function($id){
    if(!Product::find($id)){
        return response()->json(["message"=>"Product not found"],404);
    }
    return Product::with('ratings')->findOrFail($id);

});
Route::get('/about',function(){
    return About::first()->description;
})->withoutMiddleware('auth:sanctum');
Route::post('/about',function(Request $request){
  $text = $request->text;
    $about = About::first();
    $about->description = $text;
    $about->save();
    return response()->json(["message"=>"About us updated successfully"]);
})->middleware([AdminMiddleware::class]);
Route::get('/r', function (Request $request) {
    return 2;
});
//de
Route::get("/allorders",function(){
    return OrderDetail::with("product")->get();
})->middleware([AdminMiddleware::class]);
Route::get("/specificorder/{id}",function($id){
    return OrderDetail::with("product")->where("id",$id)->get();
})->middleware([AdminMiddleware::class]);
Route::get("/specificuserorder/{id}",function($id){
    return OrderDetail::with("product")->where("user_id",$id)->get();
})->middleware([AdminMiddleware::class]);


Route::get("/stat",function(){
    return response()->json([
        "totalusers"=>User::count(),
        "totalorders"=>OrderDetail::count(),
        "totalproducts"=>Product::count()
    ]);
})->middleware([AdminMiddleware::class]);









Route::post("/updproduct2/{id}",function(Request $request,$id){
    $request->validate([
        'image' => 'required|image',
       
    ]);
    $product = Product::findOrFail($id);

    if ($request->hasFile('image')) {
        // Delete the old image
        if ($product->image) {
            
            if (file_exists(public_path('images/' . $product->image))) {
               
                unlink(public_path('images/' . $product->image));
            }
        }
        $imagePath = time().'.'.$request->image->extension();  
        $request->image->move(public_path('images'), $imagePath);
        $product->image = $imagePath;
    }
    $product->save();
return asset("images/".$imagePath);
   
      
    
});





Route::get('/email', [App\Http\Controllers\EmailController::class, 'create'])->withoutMiddleware('auth:sanctum');
Route::post('/email', [App\Http\Controllers\EmailController::class, 'sendEmail'])->name('send.email')->withoutMiddleware('auth:sanctum');








//products final route
//dget last four products from products table
Route::get("/lastfour",function(){
    return Product::orderBy('id', 'desc')->take(4)->get();
})->withoutMiddleware('auth:sanctum');
Route::get("/lastarrivals",function(){
    return Product::orderBy('id', 'desc')->get();
})->withoutMiddleware('auth:sanctum');
//recommand four random products
Route::get("/recommand",function(){
    return Product::inRandomOrder()->take(4)->get();
})->withoutMiddleware('auth:sanctum');
Route::get("/recommandation",function(){
    return Product::inRandomOrder()->get();
})->withoutMiddleware('auth:sanctum');
//best selling logic

//get last for item in best_selling table
// Route::get("/bestselling",function(){
//     return BestSeller::orderBy('id', 'desc')->take(4)->get();
// })->withoutMiddleware('auth:sanctum');

Route::get("/bestselling",function(){
    $bestSellingProducts = OrderDetail::select('product_id', DB::raw('count(*) as total'))
        ->groupBy('product_id')
        ->orderBy('total', 'desc')
        ->take(4)
        ->get();

    $products = Product::whereIn('id', $bestSellingProducts->pluck('product_id'))->get();

    return response()->json($products);
})->withoutMiddleware('auth:sanctum');

Route::get("/bestsell",function(){
    $bestSellingProducts = OrderDetail::select('product_id', DB::raw('count(*) as total'))
        ->groupBy('product_id')
        ->orderBy('total', 'desc')
       
        ->get();


    $products = Product::whereIn('id', $bestSellingProducts->pluck('product_id'))->get()->load('ratings');

    return response()->json($products);
})->withoutMiddleware('auth:sanctum');
//put all items in user cart in orderdetail table
Route::post("/orderal",function(Request $request){
   
    $phone = $request->phone;
    $addressIndetail = $request->addressIndetail;
$userid = auth()->user()->id;
$carts = Cart::where("user_id",$userid)->get();
if(count($carts) == 0){
    return response()->json("no items in cart",404);
}
foreach($carts as $cart){
     OrderDetail::create([
        'user_id' => $userid,
        'product_id' => $cart->product_id,
        'quantity' => $cart->quantity,
        'price' => $cart->price,
        'phone' => $phone,
        'addressIndetail' => $addressIndetail,
    ]);
    $product = Product::where('id', $cart->product_id)->first();
    Activity::create([
        'user_id' => Auth::user()->id,
        "log" => Auth::user()->name ." ordered ( ". $cart->quantity . " ) ". $product->name ." product ",
    ]);
   $cart->delete();
} 
return response()->json(['message' => 'Orders created successfully to all items in carts'], 201);

});


Route::get("/userinfo",function(){
$id = Auth::user()->id;
$user = User::find($id);

return response()->json(['user' => $user], 200);
});

/////////////////////////////change order status
Route::put("/orderstatus/{id}",function(Request $request,$id){
    if($request->status == 0){
    $order = OrderDetail::find($id)->update(["status" => "processing"]);
    }else if($request->status == 1){
        $order = OrderDetail::find($id)->update(["status" => "completed"]);
    }else if($request->status == 2){
        $order = OrderDetail::find($id)->update(["status" => "shipped"]);
    }else{
        $order = OrderDetail::find($id)->update(["status" => "canceled"]); 
    }
    if($order){
        return response()->json(['message' => "product updated successfully"],200);
    }else{
        return response()->json(['message' => "failed to update order status"], 500); 
    }
});




Route::post("/filterbasedorderstatus",function(Request $request){
    $statusMap = [
        0 => 'processing',
        1 => 'completed',
        2 => 'shipped',
        3 => 'canceled'
    ];

    $status = $request->status;

    // Validate the status input
    if (!array_key_exists($status, $statusMap)) {
        return response()->json(['message' => 'Invalid status'], 400);
    }

    // Retrieve orders with the specified status
    $orders = OrderDetail::where('status', $statusMap[$status])->get();

    if ($orders->isEmpty()) {
        return response()->json(['message' => 'No orders found with the specified status'], 404);
    }

    return response()->json(['orders' => $orders], 200);
});


//get number of visits
Route::get("/visits",function(){
return response()->json(["count" => count(Visit::all())]);
})->withoutMiddleware('auth:sanctum');


//get all orders with product and cart items with product and favourite item with product
Route::get("/usercof/{id}",function($id){
    $user = User::find($id);

    if (!$user) {
        return response()->json(['message' => 'User not found'], 404);
    }

    $orders = OrderDetail::where('user_id', $id)->with('product')->get();
    $cartItems = Cart::where('user_id', $id)->with('product')->get();
    $favoriteItems = Favorite::where('user_id', $id)->with('product')->get();

    return response()->json([
        'orders' => $orders,
        'cartItems' => $cartItems,
        'favoriteItems' => $favoriteItems,
        "count of orders user made" => count($orders)
    ], 200);
})->middleware([AdminMiddleware::class]);



// show the revenue in this day and this month and this year and from the beggings based on prices column in order details table
Route::get("/revenue",function(){
    $today = OrderDetail::whereDate('created_at', today())->sum('price');
    $thisMonth = OrderDetail::whereMonth('created_at', date('m'))->whereYear('created_at', date('Y'))->sum('price');
    $thisYear = OrderDetail::whereYear('created_at', date('Y'))->sum('price');
    $fromBeginning = OrderDetail::sum('price');
    $totalProducts = Product::count();

    $bestSellingToday = OrderDetail::select('product_id', DB::raw('count(*) as total'))
        ->whereDate('created_at', today())
        ->groupBy('product_id')
        ->orderBy('total', 'desc')
        ->take(4)
        ->get()
        ->map(function($order) {
            $product = Product::find($order->product_id);
            return [
                'product' => $product,
                'total' => $order->total
            ];
        });

    $bestSellingThisMonth = OrderDetail::select('product_id', DB::raw('count(*) as total'))
        ->whereMonth('created_at', date('m'))
        ->whereYear('created_at', date('Y'))
        ->groupBy('product_id')
        ->orderBy('total', 'desc')
        ->take(4)
        ->get()
        ->map(function($order) {
            $product = Product::find($order->product_id);
            return [
                'product' => $product,
                'total' => $order->total
            ];
        });

    $bestSellingThisYear = OrderDetail::select('product_id', DB::raw('count(*) as total'))
        ->whereYear('created_at', date('Y'))
        ->groupBy('product_id')
        ->orderBy('total', 'desc')
        ->take(4)
        ->get()
        ->map(function($order) {
            $product = Product::find($order->product_id);
            return [
                'product' => $product,
                'total' => $order->total
            ];
        });

    return response()->json([
        'revenueToday' => $today,
        'revenueThisMonth' => $thisMonth,
        'revenueThisYear' => $thisYear,
        'revenueFromBeginning' => $fromBeginning,
        'totalProducts' => $totalProducts,
        'bestSellingToday' => $bestSellingToday,
        'bestSellingThisMonth' => $bestSellingThisMonth,
        'bestSellingThisYear' => $bestSellingThisYear
    ], 200);
})->middleware([AdminMiddleware::class]);



Route::post("/dashboard",function(Request $request){
    $day = $request->day;
    $month = $request->month;
    $year = date('Y'); // Assuming you want the current year

    // Create a Carbon instance for the given day and month
    $startDate = \Carbon\Carbon::create($year, $month, $day);

    // Calculate the end date of the week (6 days after the start date)
    $endDate = $startDate->copy()->addDays(6);

    // Query the Visit model to count the number of visitors in the specified week
    $visitorCount = Visit::whereBetween('created_at', [$startDate, $endDate])->count();
    $year = date('Y'); // Current year
    $orderCount = OrderDetail::whereMonth('created_at', $month)
                              ->whereYear('created_at', $year)
                              ->count();

              $bestSellingThisYear = OrderDetail::select('product_id', DB::raw('count(*) as total'))
            ->whereYear('created_at', date('Y'))
                  ->groupBy('product_id')
             ->orderBy('total', 'desc')
             ->take(5)
             ->get()
            ->map(function($order) {
             $product = Product::find($order->product_id);
                 return [
                 'product' => $product,
                                      
                 ];
                 });
$productCount = Product::count();
return response()->json(['productCount' => $productCount,'visitors count' =>  $visitorCount,"sales count this month"=> $orderCount,"best selling products" =>  $bestSellingThisYear ], 200);

});


Route::post("/comparesales",function(Request $request){
    $product_ids = $request->product_ids;
    $array = [];
    foreach($product_ids as $id){
        $array[$id] = [];
    }
    for($i = 1; $i <= 12; $i++){
        foreach($product_ids as $id){
           array_push( $array[$id] , OrderDetail::where('product_id', $id)->whereYear("created_at",$request->year)->whereMonth("created_at",$i)->sum("price"));
        }
         
    }
  
return response()->json($array, 200);
    
});

Route::post("/addadmin",function(Request $request){
    $user = User::where('email', $request->email)->first();
    if(!$user){
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password),
            'role' => $request->role,
            "is_admin" => 1
        ]);
    }else{
       return response()->json(['message' => 'email already exists'], 400);
    }
    return response()->json(['message' => 'Admin added successfully'], 200);
})->middleware([AdminMiddleware::class]);


















// sales page
Route::get("/salespage",function(){
    //get total number of orders
    $totalOrders = OrderDetail::count();
    //get count of orders where status = shipped
    $shippedOrders =intval( OrderDetail::where('status', 'shipped')->count() / $totalOrders * 100) . "%";
    $canceledOrders = intval(OrderDetail::where('status', 'canceled')->count() / $totalOrders * 100) . "%";
    $completedOrders =intval( OrderDetail::where('status', 'completed')->count() / $totalOrders * 100 ). "%";
    $processingOrders = intval(OrderDetail::where('status', 'processing')->count() / $totalOrders * 100) . "%";

    $totalprice = DB::table('order_details')->sum('price');
    $totalpriceforshippedorders = DB::table('order_details')->where('status', 'shipped')->sum('price');
    $totalproceforprocessingorders = DB::table('order_details')->where('status', 'processing')->sum('price');
    $totalpriceforcompletedorders = DB::table('order_details')->where('status', 'completed')->sum('price');
    $totalpriceforcanceledorders = DB::table('order_details')->where('status', 'canceled')->sum('price');
    $currentMonth = \Carbon\Carbon::now()->format('m');
    $pastmonth = \Carbon\Carbon::now()->subMonth()->format('m');
    $totalpriceforcurrentmonth = DB::table('order_details')->whereYear('created_at', date('Y'))->whereMonth('created_at', $currentMonth)->sum('price');
    $totalpriceforpastmonth = DB::table('order_details')->whereYear('created_at', date('Y'))->whereMonth('created_at', $pastmonth)->sum('price');
    if($totalpriceforpastmonth == 0 ){
        $changeofprice = $totalpriceforcurrentmonth ;
     }else{
        $changeofprice = (($totalpriceforcurrentmonth - $totalpriceforpastmonth) / $totalpriceforpastmonth) * 100;
     }

   $endweek = \Carbon\Carbon::now()->toDateString();
   $startweek = \Carbon\Carbon::now()->subDays(6)->toDateString();
   $pastweek = \Carbon\Carbon::now()->subDays(12)->toDateString();
  
   $totalpriceofthisweek = OrderDetail::whereBetween('created_at', [$startweek, $endweek])->sum('price');
  
  $totalpriceoflastweek = OrderDetail::whereBetween('created_at', [$pastweek, $startweek])->sum('price');
  if( $totalpriceoflastweek == 0 ){
    $changeofpriceforweek = $totalpriceofthisweek;
  }else{
   $changeofpriceforweek = (($totalpriceofthisweek - $totalpriceoflastweek) / $totalpriceoflastweek) * 100;
  }
$montharr = [];
$weekarr = [];



$daysInCurrentMonth = \Carbon\Carbon::now()->daysInMonth;
for($i = 0; $i < $daysInCurrentMonth; $i++){
    $montharr["".$i] = OrderDetail::whereYear('created_at', date('Y'))->whereMonth('created_at', $currentMonth)->whereDay('created_at', $i + 1)->sum('price');
}
$val2 = \Carbon\Carbon::parse($endweek)->day;
$val1 =\Carbon\Carbon::parse($startweek)->day;
//do same for week 
for($i = $val1; $i <= $val2; $i++){
    $weekarr[$i] = OrderDetail::whereYear('created_at', date('Y'))->whereMonth('created_at', $currentMonth)->whereDay('created_at', $i)->sum('price');
}

    return response()->json([
       "totalOrders" => $totalOrders,
       "shippedOrdersPercentage" => $shippedOrders,
       "canceledOrdersPercentage" => $canceledOrders,
       "completedOrdersPercentage" => $completedOrders,
       "processingOrdersPercentage" => $processingOrders,
       "totalprice" => $totalprice,
       "totalPriceforShippedOrders" => $totalpriceforshippedorders,
       "totalPrceforProcessingOrders" => $totalproceforprocessingorders,
       "totalPriceforCompletedOrders" => $totalpriceforcompletedorders,
       "totalPriceforCanceledOrders" => $totalpriceforcanceledorders,
       "totalpriceforcurrentmonth" => $totalpriceforcurrentmonth,
       "totalpriceforpastmonth" => $totalpriceforpastmonth,
       "changeOfPriceMonth" => intval($changeofprice) . "%",
       
       "totalpricethisweek" => $totalpriceofthisweek,
       "totalpricelastweek" => $totalpriceoflastweek,
       "changeOfPriceWeek" => intval($changeofpriceforweek) . "%",
       "pricesThisMonth" => $montharr,
       "pricesThisWeek" => $weekarr
   ]);
})->middleware([AdminMiddleware::class]);



//
Route::get("/produucts",function(){

    $products = Product::all()->load('ratings');

    if ($products->isEmpty()) {
        return response()->json(['message' => 'No products found'], 404);
    }

    return response()->json($products);
})->withoutMiddleware("auth:sanctum");