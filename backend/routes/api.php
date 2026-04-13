<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\NoteController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;





/***
 * Authentication Token 
 *  GET:  /me   => to access the token an profile of the user 
 *  POST: /login => to login 
 *  POST: /register => to create an additional usr 
 *  
 */
Route::post('/login', [AuthController::class, 'login' ]);
Route::post('/register', [AuthController::class, 'register']);
Route::middleware('auth:sanctum')->post('/logout', [AuthController::class, 'logout']);
Route::middleware('auth:sanctum')->get('/me', [AuthController::class, 'me']);



// Note Endpoints 
Route::middleware('auth:sanctum')->apiResource('notes', NoteController::class); 


// Test endpoint 
Route::get('/test', function() {
    return response()->json([
        'message' => 'Test Endpoint'
    ]);
});
