<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Rating;
use Illuminate\Support\Facades\Validator;

class RatingCon extends Controller
{
public function index()
{
    $ratings = Rating::all();
    return response()->json($ratings);
}

public function create()
{
    return response()->json(['message' => 'Use the store method to create a new rating.']);
}

public function store(Request $request)
{
    $validator = Validator::make($request->all(), [
        'product_id' => 'required|integer|exists:products,id',
        'rating' => 'required|integer|min:1|max:5',
        'user_id' => 'required|integer|exists:users,id',
    ]);

    if ($validator->fails()) {
        return response()->json(['errors' => $validator->errors()], 400);
    }

    Rating::where('user_id', $request->user_id)
          ->where('product_id', $request->product_id)
          ->delete();

    $rating = Rating::create($request->only(['product_id', 'rating', 'user_id']));

    return response()->json($rating, 201);
}

public function show(string $id)
{
    $rating = Rating::find($id);

    if (!$rating) {
        return response()->json(['message' => 'Rating not found'], 404);
    }

    return response()->json($rating);
}

public function edit(string $id)
{
    return response()->json(['message' => 'Use the update method to edit a rating.']);
}

public function update(Request $request, string $id)
{
    $rating = Rating::find($id);

    if (!$rating) {
        return response()->json(['message' => 'Rating not found'], 404);
    }

    $validator = Validator::make($request->all(), [
        'product_id' => 'required|integer|exists:products,id',
        'rating' => 'required|integer|min:1|max:5',
        'user_id' => 'required|integer|exists:users,id',
    ]);

    if ($validator->fails()) {
        return response()->json(['errors' => $validator->errors()], 400);
    }

    $rating->update($request->only(['product_id', 'rating', 'user_id']));

    return response()->json($rating);
}

public function destroy(string $id)
{
    $rating = Rating::find($id);

    if (!$rating) {
        return response()->json(['message' => 'Rating not found'], 404);
    }

    $rating->delete();

    return response()->json(['message' => 'Rating deleted successfully']);
}
}