<?php

namespace App\Http\Components\Auth\AuthForm;

use App\Http\Components\Rest\Exceptions\ApiException;
use App\Models\User;
use Illuminate\Http\Request;

class AuthForm
{

    /**
     * @throws ApiException
     */
    public static function auth($data, $usernameFiled = 'username')
    {
        try {

            $user = User::where($usernameFiled, $data[$usernameFiled])
                ->with('accounts', 'aro')
                ->first();

            if (!$user) {
                throw new ApiException('Пользователь не найден', 200);
            }

            if (!password_verify($data['password'], $user->password)) {
                throw new ApiException('Неверные логин или пароль', 200);
            }

            if ($user->status != 'active') {
                throw new ApiException('Пользователь не активирован', 200);
            }

            return $user;

        } catch (ApiException $e) {
            $e->json();
        }
    }
}
