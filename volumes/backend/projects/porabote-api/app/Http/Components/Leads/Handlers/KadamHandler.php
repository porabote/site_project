<?php
namespace App\Http\Components\Leads\Handlers;

use App\Http\Components\Curl\Curl;
use App\Models\Lead;

class KadamHandler extends AbstractHandler{

    function postProcess(Lead $lead)
    {
        if (!$lead->utm_guid) {
            return;
        }

        Curl::setUrl('https://kdtrk.net/ru/postback/')
            ->appendUriData([
                'status' => 'hold',
                'data' => $lead->utm_guid,
            ])
            ->setLogData([
                'label' => 'kadam',
                'client_id' => $lead->client_id,
                'entity_id' => $lead->id,
                'entity_name' => 'lead',
            ])
            ->get();
    }

}
