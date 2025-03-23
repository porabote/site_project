<?php

namespace App\Http\Controllers;

use App\Http\Components\Rest\ApiTrait;
use App\Http\Components\Rest\Exceptions\ApiException;
use App\Http\Components\Thyssen\DailyReportExporter;
use App\Models\WorkbookDailyReport;
use App\Models\WorkbookMinerReport;
use App\Models\WorkbookPlanning;
use Carbon\Carbon;

class WorkbookDailyReportsController extends Controller
{
    use ApiTrait;

    public static function authAllow()
    {
        return [
            'downloadExcel'
        ];
    }

    public function add()
    {
        try {

            $saveRecord = WorkbookDailyReport::where('date', request()->date)
                ->where('project_id', request()->project_id)
                ->first();

            if ($saveRecord) {
                throw new ApiException("Отчет на эту дату и этот контракт уже существует.");
            }

            $record = WorkbookDailyReport::create(request()->all());
            return response()->json(['data' => $record]);
        } catch (ApiException $e) {
            $e->json();
        }
    }

    public function getReports() {

        $dailyReport = WorkbookDailyReport::with('project.objects')->find(request()->id);

        $objects = $dailyReport->project->objects->pluck('id')->toArray();

        $reports = WorkbookMinerReport::whereIn('object_id', $objects)
            ->where('date', $dailyReport->date)
            ->with([
                'shift', 'head', 'comment', 'shift_day', 'user', 'horizon', 'project', 'status', 'site',
                'project', 'object', 'history.user', 'works_completed', 'works_not_completed', 'workers',
                'params.param', 'descent_request.object', 'descent_request.shift_day',
            ])
            ->get();

        return response()->json(['data' => $reports]);
    }

    public function getPlanData()
    {
        $report = WorkbookDailyReport::find(request()->id);

        $plan = WorkbookPlanning::where('project_id', $report->project_id)
            ->with(['params_values', 'objects_params'])
            ->where('date_from', '<=', $report->date)
            ->where('date_to', '>=', $report->date)
            ->first();

        if ($plan) {
            $plan->miner_reports = $plan->getMinerReports();
            $plan->miner_reports_project = $plan->getMinerReports(true);
        }

        return response()->json(['data' => $plan]);
    }

    public function downloadExcel()
    {
        try {

            config(['database.connections.mysql_client.database' => 'client_th_kazakhstan']);

            if (!request()->id) {
                throw new ApiException("ID not set");
            }

            $xlsxFile = DailyReportExporter::create(request()->id);

        } catch (ApiException $e) {
            $e->json();
        }

    }

}
