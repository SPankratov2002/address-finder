<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    /**
     * Логин пользователя и выдача токена
     * 
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function login(Request $request)
    {
        // Извлекаем только email и пароль из запроса
        $credentials = $request->only('email', 'password');

        // Проверяем учетные данные, если неуспешно, возвращаем ошибку авторизации
        if (!auth()->attempt($credentials)) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        // Если аутентификация успешна, генерируем токен для пользователя
        $token = auth()->user()->createToken('authToken')->plainTextToken;

        // Возвращаем токен в формате JSON
        return response()->json(['token' => $token]);
    }
}
