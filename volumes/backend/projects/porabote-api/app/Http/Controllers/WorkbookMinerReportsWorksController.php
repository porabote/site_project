<?php

namespace App\Http\Controllers;

use App\Http\Components\Rest\ApiTrait;
use App\Http\Components\Rest\Exceptions\ApiException;
use App\Models\History;
use App\Models\Shift;
use App\Models\Status;
use App\Models\User;
use App\Models\WorkbookLocation;
use App\Models\WorkbookMinerReport;
use App\Models\WorkbookMinerReportsWork;
use App\Models\WorkbookParam;
use App\Models\WorkbookParamsReport;
use App\Http\Components\Auth\Authentication as Auth;
use App\Models\WorkbookParamsValue;
use App\Models\WorkbookProject;

class WorkbookMinerReportsWorksController extends Controller
{
    use ApiTrait;

    public function add()
    {
//        $record = WorkbookMinerReportsWork::find(1);
//        $record::fixTree();

        $work = request()->all();

        if ($work['is_completed'] == 1) {
            if (empty($work['param_id']) && $work['is_completed'] == 1) {
                $param = $this->addParam($work);
                $work['param_id'] = $param->id;
            } else {
                $param = WorkbookParam::find($work['param_id']);
            }

            $work['param_name_ru'] = $param['name_ru'];
            $work['param_name_de'] = $param['name_de'];
        }

        if (!isset($work['id'])) {
            $record = WorkbookMinerReportsWork::create([
                'report_id' => $work['report_id'],
                'param_id' => $work['param_id'] ?? null,
                'value' => $work['value'] ?? null,
                'time_from' => ($work['from']['hour'] ?? '00') . ':' . ($work['from']['minutes'] ?? '00'),
                'time_to' => ($work['to']['hour'] ?? '00') . ':' . ($work['to']['minutes'] ?? '00'),
                'is_completed' => $work['is_completed'],
                'name_ru' => $work['param_name_ru'] ?? null,
                'name_de' => $work['param_name_de'] ?? null,
            ]);
        } else {
            $record = WorkbookMinerReportsWork::find($work['id'])->update([
                'param_id' => $work['param_id'] ?? null,
                'value' => $work['value'] ?? null,
                'time_from' => $work['from']['hour'] . ':' . $work['from']['minutes'],
                'time_to' => $work['to']['hour'] . ':' . $work['to']['minutes'],
                'name_ru' => $work['param_name_ru'] ?? null,
                'name_de' => $work['param_name_de'] ?? null,
            ]);
        }

        return response()->json([
            'data' => $record,
        ]);
    }

    public function addParam($work)
    {
        $typeId = $work['is_completed'] == 1 ? 1 : 2;

        return WorkbookParam::create([
            'is_default' => null,
            'type_id' => $typeId,
            'name_ru' => $work['param_name_ru'],
            'name_de' => $work['param_name_de'],
        ]);
    }

    public function delete()
    {
        $record = WorkbookMinerReportsWork::find(request()->id);
        $record->delete();

        return response()->json([
            'data' => "1",
        ]);
    }
}
