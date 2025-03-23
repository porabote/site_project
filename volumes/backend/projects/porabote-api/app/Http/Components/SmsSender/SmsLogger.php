<?php
namespace App\Http\Components\SmsSender;

use Auth;
use App\SMS;
use App\User;

class SmsLogger {

    private function write($sms)
    {
        $sms = new SMS;
       // $sms->operator_id = $operatorId;
        if (Auth::check()) {
            $user = Auth::user();
        } else {
            $user = User::where('phone', $sms->getCode() . $sms->getPhone())->first();
        }
        $user_id = isset($user) ? $user->id : 0;
        $sms->user_id = $user_id;
        $sms->text = $sms->getMessage();
        $sms->save();
    }

}