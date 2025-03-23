<?php
namespace App\Http\Components\Leads\Handlers;
use App\Models\Lead;

abstract class AbstractHandler {

    // Обработка данных перед сохранением записи лида
    function preProcess(array $data) {}

    // Коллбек после сохранения лида
    function postProcess(Lead $lead) {}

}
