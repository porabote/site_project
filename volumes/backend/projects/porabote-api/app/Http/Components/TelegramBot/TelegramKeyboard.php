<?php

namespace App\Http\Components\TelegramBot;

use App\Http\Components\Rest\Exceptions\ApiException;

class TelegramKeyboard
{
    public $keyboard = [];

    function __construct()
    {

    }

    public function setButton($data): void
    {
        if (isset($data['callback_data']) && gettype($data['callback_data']) == "array") {
            $data['callback_data'] = json_encode($data['callback_data']);
        }

        $this->keyboard[][] = $data;

    }

    public function getButtons()
    {
        return $this->keyboard;
    }
}
