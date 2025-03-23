<?php

namespace App\Http\Controllers;

use App\Http\Components\Rest\ApiTrait;
use App\Models\Workbook\DictDescentRequestsOrdersOperation;
use App\Models\Workbook\DictDescentRequestsOrdersType;
use App\Models\WorkbookLocation;

class WorkbookDescentRequestsOrdersController extends Controller
{
    use ApiTrait;

    public function getDicts()
    {

        $horizons = WorkbookLocation::where('type', 'horizon');
        if (request()->site_id) {
            $horizons->where('parent_id', request()->site_id);
        }

        return response()->json([
            'data' => [
                'types' => DictDescentRequestsOrdersType::get(),
                'operations' => DictDescentRequestsOrdersOperation::class::get(),
                'horizons' => $horizons->get(),
            ],
        ]);
    }
}

