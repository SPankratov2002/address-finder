<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\AddressController;
use Illuminate\Support\Facades\Route;

/**
 * Маршрут для логина
 */
Route::post('login', [AuthController::class, 'login']);

/**
 * Маршруты, защищённые аутентификацией
 */
Route::middleware('auth:sanctum')->group(function () {

    // Получение всех адресов аутентифицированного пользователя
    Route::get('addresses', [AddressController::class, 'index']);

    // Сохранение нового адреса для аутентифицированного пользователя
    Route::post('addresses', [AddressController::class, 'store']);
});

/**
 * Обработка CORS preflight-запросов
 */
Route::options('{any}', function () {
    return response()->json([], 200);
})->where('any', '.*');
