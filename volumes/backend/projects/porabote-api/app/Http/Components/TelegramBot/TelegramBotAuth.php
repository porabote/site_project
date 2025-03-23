<?php

namespace App\Http\Components\TelegramBot;

use App\Http\Components\Rest\Exceptions\ApiException;

class TelegramBotAuth
{
    /*
     * Validation telegram user token
     * */
    public static function checkAuthData($auth_data)
    {
        try {

            $token = '6592403605:AAEOT-WzgRXltSsqFeCIZYGmPNyX41cM3sQ';

            $check_hash = $auth_data['hash'];
            unset($auth_data['hash']);
            $data_check_arr = [];
            foreach ($auth_data as $key => $value) {
                $data_check_arr[] = $key . '=' . $value;
            }
            sort($data_check_arr);
            $data_check_string = implode("\n", $data_check_arr);

            $secret_key = hash('sha256', $token, true);

            $hash = hash_hmac('sha256', $data_check_string, $secret_key);
            if (strcmp($hash, $check_hash) !== 0) {
                throw new ApiException('Data is NOT from Telegram');
            }
            if ((time() - $auth_data['auth_date']) > 86400) {
                throw new ApiException('Data is outdated');
            }

            return $auth_data;
        } catch (ApiException $e) {
            $e->json();
        }
    }
}
