<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use App\Functions\CartFunction;
use Illuminate\Support\Facades\Auth;
use App\Models\Activity;
/**
 * @group 1 Security
 *
 * APIs for user registration and login and logout
 */
class SecuirtyController extends Controller
{
    /**
     * Register a new user
     *
     * @bodyParam name string required The user's name
     * @bodyParam email string required The user's email
     * @bodyParam password string required The user's password
     * @bodyParam phone string required The user's phone number
     *
     * @response 201 {
     *   "message": "User registered successfully"
     * }
     */
    public function register(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed',
            'phone' => 'required|string|max:15|unique:users',
        ]);

        $user = new \App\Models\User([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'phone' => $request->phone,
        ]);
        $cartfunction = (new CartFunction)->deleteallcartsthatpassedtwodayson();
        $user->save();

        return response()->json(['message' => 'User registered successfully'], 201);
    }

    /**
     * Login a user
     *
     * @bodyParam email string required The user's email
     * @bodyParam password string required The user's password
     *
     * @response 200 {
     *   "token": "string"
     * }
     * @response 401 {
     *   "message": "Invalid credentials"
     * }
     */
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string',
        ]);

        $user = User::where('email', $request->email)->first();
        
        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json(['message' => 'Invalid credentials'], 401);
        }
        if($user->is_admin == 1){
            Activity::create([
                'user_id' =>$user->id,
                "log" => $user->name ."  with an email of ". $user->email . " logged in",
            ]);
        }
        // Assuming you are using Laravel Passport or Sanctum for API authentication
        $token = $user->createToken('authToken')->plainTextToken;
        
        /**
         * Deletes all carts that have passed two days.
         *
         * This function utilizes the CartFunction class to remove all carts
         * that have been inactive for more than two days.
         *
         * @return void
         */
        $cartfunction = (new CartFunction)->deleteallcartsthatpassedtwodayson();
        // Activity::create([
        //     'user_id' => $user->id,
        //     "log" => $user->name ." logged in",
        // ]);
        return response()->json(['token' => $token,"userinfo"=>$user], 200);
    }
    public function loginphone(Request $request)
    {
        $request->validate([
           'phone' => 'required|string|max:15',
            
        ]);

        $user = User::where('phone', $request->phone)->first();

        if (!$user) {
            return response()->json(['message' => 'Invalid credentials'], 401);
        }

        // Assuming you are using Laravel Passport or Sanctum for API authentication
        $token = $user->createToken('authToken')->plainTextToken;
        // Activity::create([
        //     'user_id' => $user->id,
        //     "log" => $user->name ." logged in",
        // ]);
       
        $cartfunction = (new CartFunction)->deleteallcartsthatpassedtwodayson();
        return response()->json(['token' => $token,"userinfo"=>$user], 200);
    }
    /**
     * Logout a user
     *
     * @response 200 {
     *   "message": "Logged out"
     * }
     */
    public function logout(Request $request)
    {
        if(Auth::user()->is_admin == 1){
            
        
        Activity::create([
            'user_id' => Auth::user()->id,
            "log" => Auth::user()->name ." with an email of " . Auth::user()->email . " logged out",
        ]);
    }
        $request->user()->currentAccessToken()->delete();
        $cartfunction = (new CartFunction)->deleteallcartsthatpassedtwodayson();
        
        return response()->json(['message' => 'Logged out'], 200);
    }


    public function updateprofile(Request $request){
        $id = Auth::user()->id;
        try {
           
            $validatedData = $request->validate([
                'name' => 'required|max:255',
                'email' => 'required|email|unique:users,email,' . $id,
                'password' => 'nullable|min:8',
                'phone' => 'nullable|max:15|unique:users,phone,' . $id,
            ]);
           
            $user = User::findOrFail($id);
         
            if(!$user){
                return response()->json(['error' => 'User not found'], 404);
            }
            $user->name = $validatedData['name'];
            $user->email = $validatedData['email'];
            if (!empty($validatedData['password'])) {
                $user->password = bcrypt($validatedData['password']);
            }
            if (!empty($validatedData['phone'])) {
                $user->phone = $validatedData['phone'];
            }
            $user->save();
            $cartfunction = (new CartFunction)->deleteallcartsthatpassedtwodayson();
            return response()->json(['success' => 'User updated successfully', 'user' => $user], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to update user'], 500);
        }

    }
}

