<?php

namespace App\Http\Components\JwtToken;

use App\Http\Components\DataReader\DataReader;

class JwtTokenBuilder
{
    private $tokenHandler;
    private DataReader $data;

    public function __construct()
    {
        $this->tokenHandler = new JwtTokenHandler();
    }

    public function setData($data)
    {
        $this->data = new DataReader($data);
        return $this;
    }

    public function createAccessToken(): string
    {
        return $this->tokenHandler->createAccessToken($this->data);
    }

    public function createRefreshToken(): string
    {
        return $this->tokenHandler->createRefreshToken($this->data);
    }

//    public function __call($funcName, array $params)
//    {
//        if (strpos($funcName, 'set', 0) === 0) {
//            $paramName = lcfirst(str_replace('set', '', $funcName));
//            if (property_exists($this, $paramName)) {
//                $this->{$paramName} = $params[0];
//            }
//        }
//
//        if (strpos($funcName, 'get', 0) === 0) {
//            $paramName = lcfirst(str_replace('get', '', $funcName));
//            if (property_exists($this, $paramName)) {
//                return $this->{$paramName};
//            }
//        }
//
//        return $this;
//    }

    public function toArray(): array
    {
        $class_vars = get_class_vars(get_class($this));

        $data = [];
        foreach ($class_vars as $name => $value) {
            $data[$name] = $this->{$name};
        }
        return $data;
    }
}
