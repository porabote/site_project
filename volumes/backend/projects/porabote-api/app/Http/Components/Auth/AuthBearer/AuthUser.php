<?php

namespace App\Http\Components\Auth\AuthBearer;

class AuthUser {

    private $id;
    private $username;
    private $name;
    private $accounts;
    private $accountId;
    private $accountAlias;
    private $avatar;
    private $postName;
    private $isSu;
    private $phone;
    private $role;
    private $roleId;
    private $clubId;

    static public function init()
    {
        return new AuthUser();
    }

    public function __call($funcName, array $params)
    {
        if( strpos($funcName, 'set', 0) === 0) {
            $paramName = lcfirst(str_replace('set', '', $funcName));
            if (property_exists($this, $paramName)) {
                $this->{$paramName} = $params[0];
            }
        }

        if( strpos($funcName, 'get', 0) === 0) {
            $paramName = lcfirst(str_replace('get', '', $funcName));
            if (property_exists($this, $paramName)) {
                return $this->{$paramName};
            }
        }

        return $this;
    }

    public function getAccountAlias()
    {
        return strtolower($this->accountAlias);
    }

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
