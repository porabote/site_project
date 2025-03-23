<?php

namespace App\Http\Components\Google;

class GoogleSheetsService
{
    private $client;
    private $service;
    private $tokenPath;
    protected $spreadsheetId;
    protected $sheetName;
    protected $rows;

    public static function init()
    {
        $service = new GoogleSheetsService();
        $service->setTokenPath(storage_path('google/credentials.json'));
        return $service;
    }

    public function setTokenPath($tokenPath)
    {
        $this->tokenPath = $tokenPath;
        return $this;
    }

    public function setSpreadsheetId($id)
    {
        $this->spreadsheetId = $id;

        $this->setClient();

        return $this;
    }

    private function setClient()
    {
        $client = new \Google_Client();
        $client->setApplicationName('brlsq_client');
        $client->setScopes([\Google_Service_Sheets::SPREADSHEETS]);
        $client->setAccessType('offline');
        $client->setAuthConfig($this->tokenPath);
        $client->setIncludeGrantedScopes(true);

        $this->client = $client;

        $this->service = new \Google_Service_Sheets($this->client);
    }

    public function setSheetByName($name)
    {
        $this->sheetName = $name;
        return $this;
    }

    public function setRows($data)
    {
        $this->rows = $data;
        return $this;
    }

    public function append()
    {
        $valueRange = new \Google_Service_Sheets_ValueRange();
        $valueRange->setValues($this->rows);
        // $range = 'Sheet1'; // the service will detect the last row of this sheet
        $options = ['valueInputOption' => 'RAW'];

        $this->service->spreadsheets_values->append($this->spreadsheetId, $this->sheetName, $valueRange, $options);
    }

}
