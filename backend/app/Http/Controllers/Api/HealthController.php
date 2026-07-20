<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Trait\ApiResponse;

class HealthController extends Controller
{
    use ApiResponse;
    public function __invoke() 
    {
        return $this->successResponse('API is running', [
            'version' => 'v1',
            'service' => "Application is running",
        ], 200);
    }
}
