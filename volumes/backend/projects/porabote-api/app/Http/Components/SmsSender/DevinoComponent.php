<?php
namespace App\Http\Components\SmsSender;

use App\Http\Components\CurlComponent;
use App\Http\Components\SmsSender\AbstractSmsSender;

class DevinoComponent extends AbstractSmsSender
{
    private static $login = 'Burlesque1';
    private static $protocol = 'https';
    private static $host = 'integrationapi.net';
    private static $path = '/rest/v2/Sms/Send';

    function sendSms()
    {
        $params =
            'Login=' . self::$login
            . '&Password=' . env('DEVINO_PASSWORD')
            . '&DestinationAddress=' . $this->getCode() . $this->getPhone()
            . '&SourceAddress=' . urlencode($this->getSender())
            . '&Data=' . urlencode($this->getMessage());

        return CurlComponent::post([
            'url' => self::$protocol . '://' . self::$host . self::$path,
            'data' => $params,
        ]);
    }

}
