<?php

namespace App\Http\Controllers;

use App\Http\Components\Auth\AuthBearer\JwtToken;
use App\Http\Components\Rest\ApiTrait;
use App\Http\Components\Rest\Exceptions\ApiException;
use App\Models\AclPermissions;
use App\Models\WorkbookLocation;
use App\Models\WorkbookPlanning;
use App\Models\WorkbookPlanningsParamsStatus;
use App\Models\WorkbookPlanningsParamsValue;
use App\Models\WorkbookProject;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Carbon\Carbon;

class WorkbookPlanningsController extends Controller
{
    use ApiTrait;

    public function create()
    {
        try {

            $dateFrom = Carbon::create(request()->input('date_from'));
            $dateTo = Carbon::create(request()->input('date_to'));
            $project_id = request()->input('project_id');

            if (!$dateFrom || !$dateTo || !$project_id) {
                throw new ApiException('Не все параметры указаны');
            }

            if ($dateFrom->gt($dateTo)) {
                throw new ApiException('Дата начала не может быть позже даты окончания');
            }

            $sameRecord = WorkbookPlanning::where('date_from', '>=', $dateFrom)
                ->where('date_to', '<=', $dateTo)
                ->where([
                    // 'project_id' => $project_id,
                    'horizon_id' => request()->horizon_id,
                ])->first();
            if (!empty($sameRecord)) {
                throw new ApiException('Извините. План с таким периодом уже существует.');
            }


            $record = WorkbookPlanning::create([
                'date_from' => $dateFrom,
                'date_to' => $dateTo,
                'project_id' => $project_id,
                'horizon_id' => request()->horizon_id,
                'section_size' => str_replace(',', '.', request()->section_size),
                'purpose_type' => request()->purpose_type,
            ]);

            // Если это клонирование
            if (request()->parent_id) {

                $parentRecord = WorkbookPlanning::with([
                    'params',
                    'params_statuses'
                ])->find(request()->parent_id);

                foreach ($parentRecord['params'] as $param) {
                    $record->params()->attach($param['id']);
                }

                foreach ($parentRecord['params_statuses'] as $param) {
                    WorkbookPlanningsParamsStatus::create([
                        'name_ru' => $param['name_ru'],
                        'name_de' => $param['name_de'],
                        'color' => $param['color'],
                        'plan_id' => $record->id,
                    ]);
                }
            } else {
                $this->attachObjectsParams($record->id);
            }

            return response()->json([
                'data' => $record,
            ]);
        } catch (ApiException $e) {
            $e->json();
        }
    }

    public function attachObjectsParams($id)
    {
        $record = WorkbookPlanning::with('horizon.objects.plans_param')->find($id);
        foreach ($record->horizon->objects as $object) {
            if (!empty($object->plans_param)) {
                $record->params()->attach($object->plans_param->id);
            }
        }
    }

    public function bindParam()
    {
        $record = WorkbookPlanning::find(request()->planning_id);

        if (request()->status) {
            $record->params()->attach(request()->param_id);
        } else {
            $record->params()->detach(request()->param_id);
        }

        return response()->json(['data' => ['result' => 'ok']]);
    }

    public function setDayParamValue()
    {
        $data = request()->all();

        $_query = WorkbookPlanningsParamsValue::where([
            'planning_id' => request()->planning_id,
            'param_id' => request()->param_id,
        ]);

        if (request()->date) {
            $_query->where('date', request()->date);
        } else {
            $_query->whereNull('date');
        }

        $paramValue = $_query->first();

        if (!$paramValue) {
            $paramValue = WorkbookPlanningsParamsValue::create($data);
        }

        if (isset($data['value'])) {
            $paramValue->value = str_replace(',', '.', $data['value']);
        }
        if (isset($data['section_size'])) {
            $paramValue->section_size = str_replace(',', '.', $data['section_size']);
        }
        if (isset($data['color'])) {
            $paramValue->color = $data['color'];
        }
        $paramValue->update();


        return response()->json([
            'data' => $paramValue,
        ]);
    }

    public function getDicts()
    {
        return response()->json([
            'data' => [
                'objects' => WorkbookLocation::where('type', 'object')->get(),
                'sites' => WorkbookLocation::where('type', 'site')->get(),
                'horizons' => WorkbookLocation::where('type', 'horizon')->get(),
                'projects' => WorkbookProject::get(),
            ],
        ]);
    }
}
