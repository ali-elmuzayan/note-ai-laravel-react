<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\Models\User;
use DateTime;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    /**
     * Register
     * @param RegisterRequest $request
     */
    public function register(RegisterRequest $request) {
        $user = User::create($request->validated());

        $token = $user->createToken('auth_token')->plainTextToken;

        // Return the created user with the token: 
        return response()->json([
            'message' => 'User Registered Successfully',
            'user' => $user,
            'access_token' => $token,
            'token_type' => 'Bearer',
        ], 201);
    }

    /**
     * 
     * @param LoginRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function login(LoginRequest $request) {
       // 01) Attempt to Authenticated the user    
        if (!Auth::attempt($request->only('email', 'password'))) {
            return response()->json([
                'message' => 'Invalid Credentials'
            ], 401);
        }

        // 02) Get User Info & Generate a Sanctum Token for the authenticated user 
        $user = User::where('email', $request->email)->firstOrFail();
        $token = $user->createToken('auth_token')->plainTextToken;

        // 02) Return the token to the client
         return response()->json([
            'message' => 'Login Successfully',
            'access_token' => $token,
            'token_type' => 'Bearer',
        ]);

    }


    /**
     * Get the authenticated User
     */
    public function me() {
        return response()->json([
            'message' => 'Authentication Successfully', 
            'userId'=> Auth::user()->id, 
            'sessionId' => session()->getId(),
            'timestamp' => new DateTime(),
        ]);
    }

    /**
     * Summary of logout
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout() {
        // Revoke the token that was used to authenticate the current request
        Auth::user()->currentAccessToken()->delete();

        return response()->json([
            'message' => 'Logged out successfully'
        ]);
    }
}
