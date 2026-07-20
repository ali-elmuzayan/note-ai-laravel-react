<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\HealthController;
use App\Http\Controllers\Api\AuthenticatedController;


Route::get('/health', HealthController::class); 

// authentication: 
Route::get('/me',[AuthenticatedController::class, 'show']);