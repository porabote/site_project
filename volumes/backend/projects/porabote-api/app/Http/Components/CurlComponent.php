<?php
namespace App\Http\Components;

class CurlComponent {

    private static $protocol = 'https';

    public static function post($params)
    {
        $defaultParams = [
            'url' => '',
            'data' => '',
        ];

        $params = array_merge($defaultParams, $params);

        $ch = curl_init($params['url']);
        curl_setopt($ch, CURLOPT_POST, 1);
        curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0); // do not verify that ssl cert is valid (it is not the case for failover server)
        curl_setopt($ch, CURLOPT_USERAGENT, 'sms.php class 1.0 (curl ' . self::$protocol . ')');
        curl_setopt($ch, CURLOPT_TIMEOUT, 5); // 5 seconds
        curl_setopt($ch, CURLOPT_POSTFIELDS, $params['data']);

        ob_start();
        $bSuccess = curl_exec($ch);
        $response = ob_get_contents();

        ob_end_clean();
        $http_result_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);

        return ($bSuccess && $http_result_code == 200) ? $response : null;
    }

    public static function get($params)
    {
        $defaultParams = [
            'url' => '',
            'data' => '',
        ];

        $params = array_merge($defaultParams, $params);

        $ch = curl_init($params['url']);
        //curl_setopt($ch, CURLOPT_POST, 1);
        curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0); // do not verify that ssl cert is valid (it is not the case for failover server)
      //  curl_setopt($ch, CURLOPT_USERAGENT, 'sms.php class 1.0 (curl ' . self::$protocol . ')');
        curl_setopt($ch, CURLOPT_TIMEOUT, 5); // 5 seconds
      //  curl_setopt($ch, CURLOPT_POSTFIELDS, $params['data']);

        ob_start();
        $bSuccess = curl_exec($ch);
        $response = ob_get_contents();

        ob_end_clean();
        $http_result_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);

        return ($bSuccess && $http_result_code == 200) ? $response : null;
    }

}
?>

