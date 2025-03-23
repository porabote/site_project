<?php
namespace App\Http\Components\Thyssen;

use App\Http\Components\Documents\XlsxDocument;
use App\Models\WorkbookDailyReport;
use App\Models\WorkbookMinerReport;

class DailyReportExporter {

    public $report;
    public $minerReports;
    public $project;
    public $plan;

    public static function create(int $id): self
    {phpinfo();
        $instance = new self();

        $instance->fetchData($id);

        $instance->file = XlsxDocument::create(env('FILES_STORAGE_PATH') . DIRECTORY_SEPARATOR . "dayly-reports/daily_report_template.xlsx");
        return $instance;
    }

    public function fetchData($id): void
    {
        $this->report = WorkbookDailyReport::with('project.objects')->find($id);
        $this->project = $this->report->project;
        $objectsIds = $this->project->objects->pluck('id')->toArray();

        $this->minerReports = WorkbookMinerReport::whereIn('object_id', $objectsIds)
            ->where('date', $this->report->date)
            ->with([
                'shift', 'head', 'comment', 'shift_day', 'user', 'horizon', 'project', 'status', 'site',
                'project', 'object', 'history.user', 'works_completed', 'works_not_completed', 'workers',
                'params.param', 'descent_request.object', 'descent_request.shift_day',
            ])
            ->get();

        $this->plan = $this->report->getPlan();
    }
}
