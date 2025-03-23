<?php

namespace App\Http\Components\TelegramBot;

use App\Http\Components\DataReader\DataReader;
use App\Http\Components\TelegramBot\TelegramBotRequest;
use App\Models\TelegramLog;
use App\Models\TelegramMessage;
use Carbon\Carbon;

class TelegramBotWebhookHandler
{

    /*
     * https://api.telegram.org/bot6592403605:AAEOT-WzgRXltSsqFeCIZYGmPNyX41cM3sQ/getWebhookInfo
     * https://api.telegram.org/bot6592403605:AAEOT-WzgRXltSsqFeCIZYGmPNyX41cM3sQ/getUpdates
     *
     *
     * */


    public static function handle(TelegramBot $bot)
    {
        self::saveLog($bot->requestData);
        self::saveMessage($bot);
    }

    private static function saveLog($requestData): void
    {
        TelegramLog::create([
            'log' => json_encode($requestData->toArray()),
            'user_id' => null,
        ]);
    }

    private static function saveMessage($bot): void
    {

        $message = $bot->requestData->get('callback_query') ? $bot->requestData->get('callback_query.message') :
            $bot->requestData->get('message');

        $message = new DataReader($message);

        TelegramMessage::create([
            'message_id' => $message->get('message_id'),
            'sent_at' => Carbon::createFromTimestamp($message->get('date')),
            'from_id' => $message->get('from.id'),
            'chat_id' => $message->get('chat.id'),
            'text' => $message->get('text'),
            'is_bot' => $message->get('from.is_bot'),
            'language_code' => $message->get('from.language_code'),
            'chat_type' => $message->get('chat.type'),
        ]);
    }
}
