<?php

namespace App\Http\Controllers;

use App\Http\Components\Rest\ApiTrait;

class HistoryController extends Controller
{
    use ApiTrait;

    public function getModelName()
    {
        return 'History';
    }
}
