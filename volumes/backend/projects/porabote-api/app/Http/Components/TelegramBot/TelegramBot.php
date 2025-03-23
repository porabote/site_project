<?php

namespace App\Http\Components\TelegramBot;

use App\Http\Components\Curl\Curl;
use App\Http\Components\DataReader\DataReader;
use App\Models\TelegramBot as TelegramBotModel;

class TelegramBot
{

    private string $botApiHost;
    private string $botApiUrl;
    private string $botApiUrlFile;
    private TelegramBotModel $data;
    public $message;
    public DataReader $requestData;


    public function __construct($id)
    {
        $this->data = TelegramBotModel::find($id);
        $this->botApiHost = 'https://api.telegram.org';
        $this->botApiUrl = $this->botApiHost . '/bot' . $this->data->token;
        $this->botApiUrlFile = $this->botApiHost . '/file/bot' . $this->data->token;
    }

    public function handleWebHook($data): void
    {
        $this->requestData = new DataReader($data);
        TelegramBotWebhookHandler::handle($this);
    }

    public function sendMessage($data)
    {
        Curl::setUrl($this->botApiUrl . '/sendMessage')
            ->appendUriData($data)
            ->get();
    }

    public function getFileInfoById($fileId)
    {
        $fileInfo = Curl::setUrl($this->botApiUrl . '/getFile')
            ->appendUriData(['file_id' => $fileId])
            ->get();
        return json_decode($fileInfo['response']);
    }

    public function getFileBlob($filePath)
    {
        $file = Curl::setUrl($this->botApiUrlFile . '/' . $filePath)
            ->get();
        return $file['response'];
    }

    public function setWebhookUrl($url)
    {
        $url = $this->botApiUrl . '/setWebhook?url=' . $url;
        $resp = Curl::setUrl($url)->get();
        print_r($resp);
    }

    public function getWehookInfo()
    {
        $url = $this->botApiUrl . '/getWebhookInfo';
        $resp = Curl::setUrl($url)->get();
        print_r($resp);
    }

    public function getUpdates()
    {
        $url = $this->botApiUrl . '/getUpdates';
        $resp = Curl::setUrl($url)->get();
        print_r($resp);
    }

}
