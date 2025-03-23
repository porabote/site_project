<?php
namespace App\Http\Components\SmsSender;

use App\Http\Components\CurlComponent;
use App\Http\Components\SmsSender\AbstractSmsSender;

class TeraSmsComponent extends AbstractSmsSender
{
    private static $login;
    private static $psw;

    private static $protocol = 'https';
    private static $host = 'auth.terasms.ru';
    private static $path = '/outbox/send/json';

    public function setSender($sender)
    {
        $this->sender = $sender;
        self::$login = env('TERA_LOGIN_' . $sender);
        self::$psw = env('TERA_PASSWORD_' . $sender);

        return $this;
    }

    public function getSender()
    {
        return $this->sender;
    }

    function sendSms()
    {
        $params = [
            'login' => self::$login,
            'password' => self::$psw,
            'target' => $this->getCode() . $this->getPhone(),
            'message' => $this->getMessage(),
            'sender' => $this->getSender(),
        ];

        return CurlComponent::post([
            'url' => self::$protocol . '://' . self::$host . self::$path,
            'data' => json_encode($params),
        ]);
    }
}
