<?php

namespace App\Services;

use Illuminate\Http\JsonResponse;

class ApiResponse
{
    public static function success(
        mixed $data = null,
        string $message = 'Success',
        int $status = 200,
        array $meta = []
    ): JsonResponse {
        return response()->json([
            'success' => true,
            'message' => $message,
            'data' => $data,
            'errors' => null,
            'meta' => array_merge([
                'timestamp' => now()->toISOString(),
            ], $meta),
        ], $status);
    }

    public static function error(
        string $message = 'Error',
        int $status = 400,
        mixed $errors = null,
        string $code = 'GENERAL_ERROR',
        array $meta = []
    ): JsonResponse {
        return response()->json([
            'success' => false,
            'message' => $message,
            'data' => null,
            'errors' => $errors,
            'code' => $code,
            'meta' => array_merge([
                'timestamp' => now()->toISOString(),
            ], $meta),
        ], $status);
    }
}