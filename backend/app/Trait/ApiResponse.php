<?php

namespace App\Trait;

trait ApiResponse
{
    public function successResponse( $message = null, $data = null, $code = 200)
    {
        return response()->json([
            'success' => true,
            'message' => $message,
            'data' => $data,
        ], $code);
    }

    public function errorResponse($message = null, $data = null, $code = 400)
    {
        return response()->json([
            'success' => false,
            'message' => $message,
            'data' => $data,
        ], $code);
    }   
}
