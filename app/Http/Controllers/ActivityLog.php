<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Activity;
use Illuminate\Http\Response;
class ActivityLog extends Controller
{
 /**
     * Display a listing of the resource.
     * 
     * @group 111 Activity Log
     * 
     * @response 200 {
     *   "data": [
     *     {
     *       "id": 1,
     *       "log": "User logged in",
     *       "user_id": 1,
     *       "created_at": "2024-11-19T16:38:04.000000Z",
     *       "updated_at": "2024-11-19T16:38:04.000000Z"
     *     }
     *   ]
     * }
     * @response 500 {
     *   "message": "Internal Server Error"
     * }
     */
    public function index()
    {
        try {
            $activities = Activity::all();
            return response()->json(['data' => $activities], Response::HTTP_OK);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Internal Server Error'], Response::HTTP_INTERNAL_SERVER_ERROR);
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
        //
    }

       // ... existing code ...

    /**
     * Display the specified resource.
     * 
     * @group 111 Activity Log
     * 
     * @urlParam id required The ID of the activity. Example: 1
     * 
     * @response 200 {
     *   "id": 1,
     *   "log": "User logged in",
     *   "user_id": 1,
     *   "created_at": "2024-11-19T16:38:04.000000Z",
     *   "updated_at": "2024-11-19T16:38:04.000000Z"
     * }
     * @response 404 {
     *   "message": "Activity not found"
     * }
     */
    public function show(string $id)
    {
        $activity = Activity::find($id);

        if (!$activity) {
            return response()->json(['message' => 'Activity not found'], Response::HTTP_NOT_FOUND);
        }
        return response()->json($activity, Response::HTTP_OK);
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
        //
    }

    /**
     * Remove the specified resource from storage.
     * 
     * @group 111 Activity Log
     * 
     * @urlParam id required The ID of the activity. Example: 1
     * 
     * @response 204 {
     *   "message": "Activity deleted successfully"
     * }
     * @response 404 {
     *   "message": "Activity not found"
     * }
     */
    public function destroy(string $id)
    {
        $activity = Activity::find($id);

        if (!$activity) {
            return response()->json(['message' => 'Activity not found'], Response::HTTP_NOT_FOUND);
        }

        $activity->delete();

        return response()->json(['message' => 'Activity deleted successfully'], Response::HTTP_NO_CONTENT);
    }
}
