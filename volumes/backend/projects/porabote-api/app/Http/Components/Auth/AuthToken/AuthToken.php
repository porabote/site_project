<?php
namespace App\Http\Components\Auth\AuthToken;

use App\Http\Components\Auth\AuthException;
use App\Models\ApiClient;

class AuthToken {

    /**
     * @throws AuthException
     */
    public static function authenticate(string $clientId, string $token)
    {
        try {
            $clientRecord = ApiClient::where('id', $clientId)
                ->where('token', $token)
                ->first();

            if (!$clientRecord) {
                //TODO logs
                throw new AuthException('Client ' . $clientId . ' doesn\'t exists', 401);
            } else {
                return true;
            }
        } catch (AuthException $e) {
            $e->json();
        }

    }

}
