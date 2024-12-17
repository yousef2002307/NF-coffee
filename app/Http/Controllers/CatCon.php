<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Category;
class CatCon extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $cats = Category::all();
        return response()->json(['success' => true, 'data' => $cats]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'namear' => 'nullable|string',
        ]);

        $cat = Category::create([
            'name' => $request->input('name'),
            'namear' => $request->input('namear'),
        ]);

        if ($cat) {
            return response()->json(['success' => true, 'data' => $cat], 201);
        } else {
            return response()->json(['success' => false, 'message' => 'Failed to create category'], 400);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $cats = Category::find($id);
        return response()->json(['success' => true, 'data' => $cats]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'namear' => 'nullable|string',
        ]);

        $cat = Category::findOrFail($id);

        $cat->update([
            'name' => $request->input('name'),
            'namear' => $request->input('namear'),
        ]);

        if ($cat) {
            return response()->json(['success' => true, 'data' => $cat], 200);
        } else {
            return response()->json(['success' => false, 'message' => 'Failed to update category'], 400);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $cat = Category::findOrFail($id);
        if ($cat->delete()) {
            return response()->json(['success' => true, 'message' => 'Category deleted successfully'], 200);
        } else {
            return response()->json(['success' => false, 'message' => 'Failed to delete category'], 400);
        }
    }
}
