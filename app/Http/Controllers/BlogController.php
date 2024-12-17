<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Blog;
use App\Http\Resources\BlogRes;
use App\Models\Activity;
use Illuminate\Support\Facades\Auth;


class BlogController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $blogs = Blog::paginate(10);
        return response()->json( $blogs);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
      
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
       $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            "description" => "nullable|string",
            "user_id" => "required|integer"
        ]);
        $imageName = time().'.'.$request->image->extension();  
        $request->image->move(public_path('images'), $imageName);
        $blog = new Blog([
            'title' => $request->title,
            'content' => $request->content,
            'image' => $imageName,
            'description' => $request->description,
            'user_id' => $request->user_id
        ]);
        $blog->save();
        Activity::create([
            'user_id' => Auth::user()->id,
            "log" => Auth::user()->name ."  with an email of ". Auth::user()->email . " created a blog with an id of ". $blog->id . "and title of ". $blog->title,
        ]);
        return response()->json(['message' => 'Blog created successfully'], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $blog = Blog::find($id);

        if (!$blog) {
            return response()->json(['message' => 'Blog not found'], 404);
        }

        return response()->json($blog, 200);
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
        $blog = Blog::find($id);

        if (!$blog) {
            return response()->json(['message' => 'Blog not found'], 404);
        }

        $request->validate([
            'title' => 'sometimes|required|string|max:255',
            'content' => 'sometimes|required|string',
            'image' => 'sometimes|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'description' => 'nullable|string',
            'user_id' => 'required|integer'
        ]);

        if ($request->hasFile('image')) {
            $imagePath = public_path('images') . '/' . $blog->image;
            if (file_exists($imagePath)) {
                unlink($imagePath);
            }

            $imageName = time().'.'.$request->image->extension();  
            $request->image->move(public_path('images'), $imageName);
            $blog->image = $imageName;
        }

        $blog->title = $request->get('title', $blog->title);
        $blog->content = $request->get('content', $blog->content);
        $blog->description = $request->get('description', $blog->description);
        $blog->user_id = $request->user_id;

        $blog->save();
        Activity::create([
            'user_id' => Auth::user()->id,
            "log" => Auth::user()->name ."  with an email of ". Auth::user()->email . " updated a blog with an id of ". $blog->id . "and name of ". $blog->title,
        ]);
        return response()->json(['message' => 'Blog updated successfully'], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $blog = Blog::find($id);

        if (!$blog) {
            return response()->json(['message' => 'Blog not found'], 404);
        }

        $imagePath = public_path('images') . '/' . $blog->image;
        if (file_exists($imagePath)) {
            unlink($imagePath);
        }
        Activity::create([
            'user_id' => Auth::user()->id,
            "log" => Auth::user()->name ."  with an email of ". Auth::user()->email . " deleted a blog with an id of ". $blog->id . "and name of ". $blog->title,
        ]);
        $blog->delete();

        return response()->json(['message' => 'Blog deleted successfully'], 200);
    }
}
