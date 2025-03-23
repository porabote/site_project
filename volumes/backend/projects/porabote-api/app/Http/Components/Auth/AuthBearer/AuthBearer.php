<?php

namespace App\Http\Components\Auth\AuthBearer;

use App\Http\Components\Auth\AuthException;
use Firebase\JWT\JWT;

class AuthBearer {

    /**
     * @throws AuthException
     */
    static function authenticate(String $token)
    {
        try {
//            $jwt = new JwtToken();
//            $decoded = $jwt->decode($token);

            $tokenSplotedArray = explode(".", $token);
            if (isset($tokenSplotedArray[1])) {
                $payload = json_decode(base64_decode($tokenSplotedArray[1]));
                return $payload;
            } else {
                return false;
            }

           // $decoded = JWT::jsonDecode(JWT::urlsafeB64Decode($token));
//            $decoded_array = (array) $decoded;
//            echo "Decode:\n" . print_r($decoded_array, true) . "\n";
//          //  print_r($decoded);
//            if (!$jwt) {
//                //TODO logs
//                throw new AuthException('Client expired', 401);
//            } else {
//                return true;
//            }

        } catch (AuthException $e) {
            $e->json();
        }
    }

}
