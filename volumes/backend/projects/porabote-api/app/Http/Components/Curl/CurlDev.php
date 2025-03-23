<?php

namespace App\Http\Components\Curl;

use App\Models\CurlLogs;
use CURLFile;

class CurlDev
{

    public $url;
    public $logLabel;
    public $uriData;
    private $options;
    private $headers;
    public $postData = [];
    public $files = [];
    private $requestFormat = 'POST';
    public $clientId = null;
    public $entityId = null;
    public $entityName = null;
    private $logData = [];


    public function setLogData(array $data)
    {
        $this->logData = array_merge($this->logData, $data);
        return $this;
    }

    // Format of request POST/JSON
    public function setRequestFormat(string $format)
    {
        $this->requestFormat = $format;
    }

    public function setHeader($headerKey, $headerValue)
    {
        $this->headers[$headerKey] = $headerValue;
        return $this;
    }

    public function setOpt(string $optKey, $optValue)
    {
        $this->options[$optKey] = $optValue;
        return $this;
    }

    public function setOpts(array $options)
    {
        foreach ($options as $optKey => $optValue) {
            $this->options[$optKey] = $optValue;
        }
        return $this;
    }

    protected function setUrl(string $url)
    {
        $this->url = $url;
        return $this;
    }

    public function appendUriData(array $data)
    {
        if (is_array($this->uriData)) {
            $this->uriData = array_merge($this->uriData, $data);
        } else {
            $this->uriData = $data;
        }

        return $this;
    }

    public function appendPostData(array $data)
    {
        $this->postData = array_merge($this->postData, $data);
        return $this;
    }

    public function attachFile(string $fieldName, string $absoluteFilePath)
    {
        $this->files[$fieldName] = new CurlFile($absoluteFilePath);
        return $this;
    }

    public static function __callStatic(string $funcName, $args)
    {
        $className = get_called_class();
        $object = new $className();
        return $object->{$funcName}(...$args);
    }

    public function get()
    {
        $url = $this->url . '?' . http_build_query($this->uriData);

        $ch = curl_init($url);
        curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0); // do not verify that ssl cert is valid (it is not the case for failover server)
        curl_setopt($ch, CURLOPT_TIMEOUT, 5); // 5 seconds

        ob_start();
        $bSuccess = curl_exec($ch);
        $response = ob_get_contents();

        ob_end_clean();
        $http_result_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);

        CurlLogs::create(
            array_merge([
            'success' => $bSuccess,
            'code' => $http_result_code,
            'response' => substr($response, 0, 255),
            'url' => $url,
        ], $this->logData));

        return [
            'success' => $bSuccess,
            'code' => $http_result_code,
            'response' => $response,
        ];
    }


    public function post()
    {
        $url = $this->url . '?' . http_build_query($this->uriData);

        $ch = curl_init($url);

        $this->setRequestHeaders($ch);
        $this->setRequestOpts($ch);
        $this->setRequestData($ch);

        ob_start();
        $bSuccess = curl_exec($ch);
        $response = ob_get_contents();

        ob_end_clean();
        $http_result_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);


        CurlLogs::create(
            array_merge([
                'success' => $bSuccess,
                'code' => $http_result_code,
                'response' => substr($response, 0, 255),
                'url' => $url,
            ], $this->logData));

        return [
            'success' => $bSuccess,
            'code' => $http_result_code,
            'response' => $response,
        ];
    }

    private function setRequestHeaders($ch)
    {
        if ($this->requestFormat == 'POST') {
            $this->headers['Content-Type'] = 'multipart/form-data';
        } elseif ($this->requestFormat == 'JSON') {
            $this->headers['Content-Type'] = 'application/json';
        }

        $headersList = [];
        foreach ($this->headers as $key => $value) {
            $headersList[] =  $key . ': ' . $value;
        }

        curl_setopt($ch, CURLOPT_HTTPHEADER, $headersList);
    }

    private function setRequestOpts($ch)
    {
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);
        curl_setopt($ch, CURLOPT_TIMEOUT, 5);
    }

    private function setRequestData($ch)
    {

        $data = [];

        foreach ($this->postData as $datumKey => $datumValue) {
            $data[$datumKey] = $datumValue;
        }

        foreach ($this->files as $datumKey => $datumValue) {
            $data[$datumKey] = $datumValue;
        }

        curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
    }

}
