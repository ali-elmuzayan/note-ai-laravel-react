<?php

namespace App\Http\Controllers;

use App\Services\ApiResponse;

abstract class Controller
{
    // success response helper method
    protected function success(
        mixed $data = null,
        string $message = 'Success',
        int $status = 200,
        array $meta = []
    ) {
        return ApiResponse::success($data, $message, $status, $meta);
    }

    // error response helper method 
        protected function error(
        string $message = 'Error',
        int $status = 400,
        mixed $errors = null,
        string $code = 'GENERAL_ERROR'
    ) {
        return ApiResponse::error($message, $status, $errors, $code);
    }
}
