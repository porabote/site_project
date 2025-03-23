<?php
namespace App\Http\Components\Auth;

use App\Http\Components\Auth\AuthException;
use App\Http\Components\Stringer\Stringer;

class Authorization {

    private static function checkAllows($request)
    {
        $uri = explode('/', str_replace('/api/', '', $request->getPathInfo()));

        $controllerAlias = '\App\Http\Controllers\\' . Stringer::snakeToCamel($uri[0]) . 'Controller';
        $methodAlias = $uri[1];
        if ($methodAlias == "action") {
            $methodAlias = $uri[2];
        }

        if (!class_exists($controllerAlias)) {
            throw new AuthException('Class doesn`t exists.');
        } else {
            $controller = new $controllerAlias();
            if (
                property_exists($controllerAlias, "authAllows")
                && in_array($methodAlias, $controller::$authAllows)
            ) {
                return false;
            }
        }
        return true;
    }

}
