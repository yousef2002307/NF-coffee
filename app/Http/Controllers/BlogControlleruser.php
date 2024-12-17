<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Blog;

use App\Http\Resources\BlogRes;

class BlogControlleruser extends Controller
{
    public function index()
    {
        $blogs = Blog::paginate(5);
        return response()->json($blogs);
    }


    public function show(string $id)
    {
        $blog = Blog::find($id);
        if (!$blog) {
            return response()->json(['message' => 'Blog not found'], 404);
        }
        $arr = [];
        $blogs = Blog::all();
        foreach($blogs as $blog){
            if($blog->id == $id){
                continue;
            }
            array_push($arr, $blog->id);
        }
      
       if(count($arr) > 3){
           $arr2 = array_rand($arr, 3);
       }else if(count($arr) == 0){
           $arr2 = [];
       }
       else{
        $arr2 = array_rand($arr, count($arr));
       }
      if($arr2 == []){
          $related = [];

      }else{
        $arr3 = [];
        foreach($arr2 as $ar){
            array_push($arr3, $arr[$ar]);
        }
       
        $related = Blog::whereIn('id', $arr3)->get();
      }
      
        
        return response()->json(["post" => Blog::find($id),"recommended posts" => $related]);
    }
}
