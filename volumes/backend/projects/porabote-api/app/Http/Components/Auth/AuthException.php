<?php
namespace App\Http\Components\Auth;

class AuthException extends \Exception
{

    public function json()
    {
        return response()->json(
            [
                'error' => $this->getMessage(),
                'code' => $this->getCode(),
            ],
            $this->getCode(),
            [
                'Access-Control-Allow-Origin' => '*',
                'Content-Type: application/json;' => 'charset=UTF-8',
                'Access-Control-Allow-Methods' => 'GET, POST, PUT, PATCH, DELETE, OPTIONS',
                'Access-Control-Allow-Headers' => 'Origin, X-Requested-With, Content-Type, Accept,Authorization, Api-Version,Access-Control-Allow-Credentials, X-CSRF-TOKEN',
            ]
        )->send();
    }

}

?>
