<?php

namespace App\Http\Controllers;

use App\Http\Components\Rest\ApiTrait;
use App\Http\Components\Rest\Exceptions\ApiException;
use App\Models\WorkbookPlanningsParamsStatus;

class WorkbookPlanningsParamsStatusesController extends Controller
{
    use ApiTrait;

    public function getModelName()
    {
        return 'WorkbookPlanningsParamsStatus';
    }

    function edit()
    {
        $data = request()->all();

        $record = WorkbookPlanningsParamsStatus::find($data['id']);

        foreach ($data as $field => $value) {
            if (array_key_exists($field, $record->getAttributes())) $record->$field = $value;
        }

        $record->update();

        return response()->json([
            'data' => $record,
            'meta' => []
        ]);
    }
}
