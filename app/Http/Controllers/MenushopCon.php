<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Menushop;
use Exception;
use Illuminate\Support\Facades\Auth;
use App\Models\Activity;
class MenushopCon extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            $menushops = Menushop::all();
            return response()->json(['success' => true, 'data' => $menushops], 200);
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => 'Failed to get menu shops'], 400);
        }
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
            'image' => 'required|image',
            'price' => 'required|numeric',
            'category_id' => 'required|integer|exists:categories,id',
        ]);

        if ($request->hasFile('image')) {
            $imagePath = time().'.'.$request->image->extension();  
            $request->image->move(public_path('images'), $imagePath);
    
        }

        $menushop = Menushop::create([
            'name' => $request->input('name'),
            'namear' => $request->input('namear'),
            'image' => $imagePath,
            'price' => $request->input('price'),
            'category_id' => $request->input('category_id'),
        ]);
        Activity::create([
            'user_id' => Auth::user()->id,
            "log" => Auth::user()->name ."  with an email of ". Auth::user()->email . " created a product menu with an id of ". $menushop->id . "and name of ". $menushop->name,
        ]);
        return response()->json(['success' => true, 'data' => $menushop], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        try {
            $menushop = Menushop::findOrFail($id);
            return response()->json(['success' => true, 'data' => $menushop], 200);
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => 'Menu product not found'], 404);
        }
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
            'image' => 'nullable|image',
            'price' => 'required|numeric',
            'category_id' => 'required|integer|exists:categories,id',
        ]);

        try {
            $menushop = Menushop::findOrFail($id);
            $menushop->update([
                'name' => $request->input('name'),
                'namear' => $request->input('namear'),
                'price' => $request->input('price'),
                'category_id' => $request->input('category_id'),
            ]);

            if ($request->hasFile('image')) {
                // Delete the old image
                if ($menushop->image) {
                    if (file_exists(public_path('images/' . $menushop->image))) {
                        unlink(public_path('images/' . $menushop->image));
                    }
                }

                $imagePath = time().'.'.$request->image->extension();  
                $request->image->move(public_path('images'), $imagePath);
                $menushop->image = $imagePath;
                $menushop->save();
            }
            Activity::create([
                'user_id' => Auth::user()->id,
                "log" => Auth::user()->name ."  with an email of ". Auth::user()->email . " updated a product menu with an id of ". $menushop->id . "and name of ". $menushop->name,
            ]);
            return response()->json(['success' => true, 'data' => $menushop], 200);
        } catch (Exception $e) {
            return response()->json(['success' => false, 'message' => 'Menu product not found'], 404);
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => 'Failed to update menu shop'], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        try {
            $menushop = Menushop::findOrFail($id);
            Activity::create([
                'user_id' => Auth::user()->id,
                "log" => Auth::user()->name ."  with an email of ". Auth::user()->email . " deleted a product menu with an id of ". $menushop->id . "and name of ". $menushop->name,
            ]);
            if ($menushop->delete()) {
                return response()->json(['success' => true, 'message' => 'Menu product deleted successfully'], 200);
            } else {
                return response()->json(['success' => false, 'message' => 'Failed to delete menu shop'], 400);
            }
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => 'Menu shop not found'], 404);
        }
    }
}
