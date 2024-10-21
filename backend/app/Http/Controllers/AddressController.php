<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Address;

class AddressController extends Controller
{
    /**
     * Получить все адреса, привязанные к аутентифицированному пользователю
     * 
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        // Получаем все адреса, которые принадлежат текущему аутентифицированному пользователю
        $addresses = auth()->user()->addresses;

        // Возвращаем адреса в формате JSON
        return response()->json($addresses);
    }

    /**
     * Сохранить новый адрес, привязанный к аутентифицированному пользователю
     * 
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        // Создаем новый объект адреса
        $address = new Address();

        // Привязываем адрес к текущему аутентифицированному пользователю
        $address->user_id = auth()->id();

        // Устанавливаем адрес из данных запроса
        $address->address = $request->input('address');

        // Сохраняем адрес в базу данных
        $address->save();
        return response()->json(['message' => 'Address saved successfully', 'address' => $address]);
    }
}
