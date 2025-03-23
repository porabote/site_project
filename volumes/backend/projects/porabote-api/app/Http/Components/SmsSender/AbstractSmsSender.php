<?php

namespace App\Http\Components\SmsSender;

abstract class AbstractSmsSender
{
    private $phone;
    private $code;
    private $message;
    private $sender;

    public function setPhone($phone)
    {
        $this->phone = preg_replace('/[^0-9.]+/', '', $phone);
        return $this;
    }

    public function getPhone()
    {
        return $this->phone;
    }

    public function setCode($code)
    {
        $this->code = preg_replace('/[^0-9.]+/', '', $code);
        return $this;
    }

    public function getCode() {
        return $this->code;
    }

    public function setSender($sender)
    {
        $this->sender = $sender;
        return $this;
    }

    public function getSender()
    {
        return $this->sender;
    }

    public function setMessage($message)
    {
        $this->message = $message;
        return $this;
    }

    public function getMessage()
    {
        return $this->message;
    }

    abstract function sendSms();

}
