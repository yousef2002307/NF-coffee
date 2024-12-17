<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Favorite;
class FavCon extends Controller
{
    /**
     * @api {get} /fav Get all favorite products
     * @apiName GetAllFavoriteProducts
     * @apiGroup Favorite
     * @apiPermission User
     *
     * @apiParam {Number} user_id The id of the user
     *
     * @apiSuccess {Object[]} products List of products that the user has as favorite
     * @apiSuccess {Number} products.id The id of the product
     * @apiSuccess {String} products.name The name of the product
     * @apiSuccess {String} products.description The description of the product
     * @apiSuccess {String} products.image The image of the product
     * @apiSuccess {Number} products.price The price of the product
     * @apiSuccess {Number} products.quantity The quantity of the product
     * @apiSuccess {Number} products.category_id The category id of the product
     * @apiSuccess {Number} products.created_at The creation date of the product
     * @apiSuccess {Number} products.updated_at The update date of the product
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *          "products": [
     *              {
     *                  "id": 1,
     *                  "name": "Product 1",
     *                  "description": "This is a description of the product 1",
     *                  "image": "https://example.com/product1.jpg",
     *                  "price": 10.99,
     *                  "quantity": 10,
     *                  "category_id": 1,
     *                  "created_at": "2022-01-01 12:00:00",
     *                  "updated_at": "2022-01-01 12:00:00"
     *              },
     *              {
     *                  "id": 2,
     *                  "name": "Product 2",
     *                  "description": "This is a description of the product 2",
     *                  "image": "https://example.com/product2.jpg",
     *                  "price": 9.99,
     *                  "quantity": 5,
     *                  "category_id": 2,
     *                  "created_at": "2022-01-01 12:00:00",
     *                  "updated_at": "2022-01-01 12:00:00"
     *              }
     *          ]
     *     }
     *
     * @apiError NoFavoriteProductsFound No favorite products found for the user.
     * @apiErrorExample {json} Error-Response:
     *     HTTP/1.1 404 Not Found
     *     {
     *         "message": "No favorite products found for the user"
     *     }
     */
    public function index()
    {
        if (!count(Favorite::where('user_id', auth()->user()->id)->with('product')->get())){
            return response()->json(['message' => 'No favorite products found'], 404);
        }else{
            return response()->json(Favorite::where('user_id', auth()->user()->id)->with('product')->get());
        }
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        // Implement logic to show form for creating a new resource
    }

    /**
     * Store a newly created resource in storage.
     *
     * @bodyParam product_id int required The ID of the product to be favorited.
     *
     * @response 201 {
     *      "message": "Favorite product added successfully"
     * }
     * @response 400 {
     *      "message": "The product_id must be an integer",
     *      "errors": {
     *          "product_id": [
     *              "The product_id must be an integer"
     *          ]
     *      }
     * }
     *
     */
    public function store(Request $request)
    {
      $request->validate([
        'product_id' => 'required|exists:products,id',
      ]);
      if(count(Favorite::where('user_id', auth()->user()->id)->where('product_id', $request->product_id)->get())){
        return response()->json(['message' => 'Product is already in favorites'], 400);
    }else{
       
   
        $favorite = new Favorite();
        $favorite->user_id = auth()->user()->id;
        $favorite->product_id = $request->product_id;
        $favorite->save();
        return response()->json(['message' => 'Favorite product added successfully'], 201);
    }
}

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        if(!count(Favorite::where('user_id', auth()->user()->id)->where('id', $id)->with('product')->get())){
            return response()->json(['message' => 'No favorite products found'], 404);
        }else{
            return response()->json(Favorite::where('user_id', auth()->user()->id)->where('id', $id)->with('product')->first());
        }
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        // Implement logic to show form for editing a specific resource
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $request->validate([
            'product_id' => 'required|exists:products,id',
        ]);

        $favorite = Favorite::where('user_id', auth()->user()->id)->where('id', $id)->first();
        if (!$favorite) {
            return response()->json(['message' => 'No favorite product found with the given id'], 404);
        }

        $favorite->product_id = $request->product_id;
        $favorite->save();

        return response()->json(['message' => 'Favorite product updated successfully'], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $favorite = Favorite::where('user_id', auth()->user()->id)->where('id', $id)->first();
        if (!$favorite) {
            return response()->json(['message' => 'No favorite product found with the given id'], 404);
        }

        $favorite->delete();

        return response()->json(['message' => 'Favorite product deleted successfully'], 200);
    }
}


