<?php
namespace App\Http\Components\SmsSender;

use App\Http\Components\SmsSender\AbstractSmsSender;
use App\Http\Components\SmsSender\DevinoSmsComponent;
use App\Http\Components\SmsSender\TeraSmsComponent;

class SmsComponent extends AbstractSmsSender
{
    private $provider = 'devino';

    public function setProvider($provider)
    {
        $this->provider = $provider;
        return $this;
    }

    public static function init()
    {
        return new SmsComponent();
    }

    function sendSms()
    {
        switch ($this->provider) {
            case 'devino':
                $devinoSms = new DevinoComponent();
                $devinoSms
                    ->setCode($this->getCode())
                    ->setPhone($this->getPhone())
                    ->setMessage($this->getMessage())
                    ->setSender($this->getSender())
                    ->sendSms();
                break;
            case 'tera':
                $teraSms = new TeraSmsComponent();
                $teraSms
                    ->setCode($this->getCode())
                    ->setPhone($this->getPhone())
                    ->setMessage($this->getMessage())
                    ->setSender($this->getSender())
                    ->sendSms();
                break;
        }
    }
}
