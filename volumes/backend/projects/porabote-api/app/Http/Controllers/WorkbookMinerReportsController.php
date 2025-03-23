<?php

namespace App\Http\Controllers;

use App\Http\Components\Mailer\Mailer;
use App\Http\Components\Mailer\MailMessage;
use App\Http\Components\Rest\ApiTrait;
use App\Http\Components\Rest\Exceptions\ApiException;
use App\Models\DictShiftsDay;
use App\Models\DocsPattern;
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
use App\Models\WorkbookPlanning;
use App\Models\WorkbookProject;
use App\Http\Components\Directory\Directory;
use Illuminate\Support\Facades\Blade;

class WorkbookMinerReportsController extends Controller
{
    use ApiTrait;

    public static function authAllow()
    {
        return [
         //   'downloadPdf',
            'downloadPdfData',
            'sendAcceptNotifications',
        ];
    }

    public function edit()
    {
        $record = WorkbookMinerReport::find(request()->id);
        $record->update(request()->all());

        if (request()->params) {
            $this->editParams($record, request()->params);
        }

        return response()->json([
            'data' => $record,
        ]);
    }

    public function editParams($report, $params): void
    {
        foreach ($params as $paramId => $value) {

            $valueRecord = WorkbookParamsValue::where([
                'param_id' => $paramId,
                'report_id' => $report->id,
            ])->first();

            if ($valueRecord) {
                $valueRecord->update([
                    'value' => $value
                ]);
            } else {
                WorkbookParamsValue::create([
                    'param_id' => $paramId,
                    'report_id' => $report->id,
                    'value' => $value,
                ]);
            }
        }
    }

    public function add()
    {
        try {

            if (!request()->date || !request()->site_id) {
                throw new ApiException('Дата или участок отчёта не указаны');
            }

            $data = request()->all();
            $data['user_id'] = Auth::$user->get('id');

            $this->handleParams($data);

            $report = WorkbookMinerReport::create($data);
            $report->status_id = 1;
            $report->project_id = WorkbookLocation::find($report->site_id)?->project_id;
            $report->update();

            if (request()->params) {
                foreach (request()->params as $paramId => $paramValue) {
                    WorkbookParamsValue::create([
                        'param_id' => $paramId,
                        'report_id' => $report->id,
                        'value' => $paramValue,
                    ]);
                }
            }

            if (request()->works_completed) {
                foreach (request()->works_completed as $work) {

                    if (!isset($work['param_id']) && !isset($work['param_name_ru'])) {
                        throw new ApiException('В записи списка работ не указано значение.');
                    }

                    if (empty($work['param_id'])) {
                        $param = $this->addParam($work);
                        $work['param_id'] = $param->id;
                    }

                    $this->addWork($report->id, $work, 1);
                }
            }

            if (request()->works_not_completed) {
                foreach (request()->works_not_completed as $work) {

//                    if (empty($work['param_id'])) {
//                        $param = $this->addParam($work);
//                        $work['param_id'] = $param->id;
//                    }

                    if (empty($work['param_id'])) {
                        WorkbookParam::where([
                            'is_default' => null,
                            'type_id' => 1,
                            'name_ru' => $work
                        ]);
                    }

                    $this->addWork($report->id, $work, 0);
//                    WorkbookMinerReportsWork::create([
//                        'report_id' => $report->id,
//                        'param_id' => $work['param_id'],
//                        'value' => $work['value'] ?? null,
//                        'time_from' => $work['from']['hour'] . ':' . $work['from']['minutes'],
//                        'time_to' => $work['to']['hour'] . ':' . $work['to']['minutes'],
//                        'is_completed' => 0,
//                    ]);
                }
            }

            History::create([
                'log' => 'Запись создана',
                'label' => 'miner_report',
                'record_id' => $report->id,
            ]);

            return response()->json([
                'data' => $report,
            ]);

        } catch (ApiException $e) {
            $e->json();
        }
    }

    private function addWork($reportId, $work, $isCompleted)
    {
        try {

            if (!isset($work['from']['hour'])) {
                $work['from']['hour'] = '00';
            } else {
                $work['from']['hour'] = str_pad($work['from']['hour'], 2, "0", STR_PAD_LEFT);;
            }
            if (!isset($work['from']['minutes'])) {
                $work['from']['minutes'] = '00';
            } else {
                $work['from']['minutes'] = str_pad($work['from']['minutes'], 2, "0", STR_PAD_LEFT);;
            }

            if (!isset($work['to']['hour'])) {
                $work['to']['hour'] = '00';
            } else {
                $work['to']['hour'] = str_pad($work['to']['hour'], 2, "0", STR_PAD_LEFT);;
            }
            if (!isset($work['to']['minutes'])) {
                $work['to']['minutes'] = '00';
            } else {
                $work['to']['minutes'] = str_pad($work['to']['minutes'], 2, "0", STR_PAD_LEFT);;
            }

            WorkbookMinerReportsWork::create([
                'report_id' => $reportId,
                'param_id' => $work['param_id'] ?? null,
                'value' => $work['value'] ?? null,
                'time_from' => $work['from']['hour'] . ':' . $work['from']['minutes'] . ':00',
                'time_to' => $work['to']['hour'] . ':' . $work['to']['minutes'] . ':00',
                'is_completed' => $isCompleted,
                'name_ru' => $work['param_name_ru'] ?? null,
                'name_de' => $work['param_name_de'] ?? null,
            ]);
        } catch (ApiException $e) {
            $e->json();
        }
    }

    public function addParam($work)
    {
        return WorkbookParam::create([
            'is_default' => null,
            'type_id' => 1,
            'name_ru' => $work['param_name_ru'] ?? null,
            'name_de' => $work['param_name_de'] ?? null,
        ]);
    }

    public function handleParams($data)
    {
        try {
            if (request()->works_not_completed) {
                foreach (request()->works_not_completed as $work) {
                    if (empty($work['param_id']) && empty($work['param_name_ru'])) {
                        throw new ApiException('Одному из видов работ не задано наименование');
                    }
                }
            }
        } catch (ApiException $e) {
            $e->json();
        }


    }

    public function getDicts()
    {
        return response()->json([
            'data' => [
                'params_works_completed' => WorkbookParam::where([
                    // 'is_default' => 1,
                    'type_id' => 1
                ])->get(),
                'params' => WorkbookParam::where([
//                    'is_default' => 1,
//                    'type_id' => 1
                ])->get(),
                'locations' => WorkbookLocation::get()->toTree(),
                'horizons' => WorkbookLocation::where('type', 'horizon')->get(),
                'sites' => WorkbookLocation::where('type', 'site')->get(),
                'shifts' => Shift::get(),
                'shifts_days' => DictShiftsDay::get(),
                'users' => User::get(),
                'statuses' => Status::where('model', 'WorkbookMinerReport')->get(),
                'projects' => WorkbookProject::get(),
            ],
        ]);
    }

    public function getWorks()
    {
        $records = WorkbookMinerReportsWork::with('param')
            ->where('report_id', request()->input('where.report_id'))
            ->where('is_completed', request()->input('where.is_completed'))
            ->get();

        return response()->json([
            'data' => $records,
        ]);
    }

    public function getParams()
    {
        $records = WorkbookParamsValue::with('param')
            ->where('report_id', request()->input('where.report_id'))
            ->get();

        return response()->json([
            'data' => $records,
        ]);
    }

    public function setStatus()
    {
        $record = WorkbookMinerReport::find(request()->record_id);
        $record->status_id = request()->status_id;
        $record->update();


        $statusName = Status::find(request()->status_id)->name;
        History::create([
            'log' => "Статус записи изменён на - \"{$statusName}\"",
            'label' => 'miner_report',
            'record_id' => $record->id,
        ]);

        return response()->json([
            'data' => $record,
        ]);
    }


    public function downloadPdf()
    {
      //  config(['database.connections.mysql_client.database' => 'client_th_kazakhstan']);

        try {

            if (!request()->id) {
                throw new ApiException("id not received");
            }

            $report = WorkbookMinerReport::with([
                'shift',
                'user',
                'horizon',
                'project',
                'status',
                'site',
                'project',
                'history',
                'works_completed',
                'works_not_completed',
                'params.param',
                'shift_day',
                'object',
            ])->find(request()->id);

            $params_all = WorkbookParam::where('type_id', 2)->get()->keyBy('id')->toArray();

            foreach ($report->params as $param) {
                if (isset($params_all[$param->param_id])) {
                    $params_all[$param->param_id]['value'] = $param->value;
                }
            };

            $report->params_all = $params_all;


            $content = Blade::render(DocsPattern::find(1)->body, ['data' => $report], true);

            $path = env('FILES_STORAGE_PATH') . '/tmp/mpdf/';

            Directory::createIsNotExist($path);
            $mpdf = new \Mpdf\Mpdf(['tempDir' => $path]);
            $mpdf->SetHTMLHeader('<div style="color: #94956e; font-size: 8pt; border-bottom: 0.5px solid #afafaf; padding: 0px 0px 5px 0px; text-align: left;">Сгенерировано в <b>@porabote</b> на {nb} стр.</div>');
            $mpdf->SetHTMLFooter('<div style="color: #94956e; font-size: 8pt; border-top: 0.5px solid #afafaf; padding: 5px 0px 0px 0px; text-align: right;">Сгенерировано в <b>@porabote</b> | {PAGENO} из {nb}</div>');
            $mpdf->WriteHTML($content);

            return response()->json([
                'data' => base64_encode($mpdf->Output('', 'S')),
            ]);
        } catch (ApiException $e) {
            $e->json();
        }
    }

    // todo delete after develop
    public function downloadPdfData()
    {
        echo '<pre>';
      //  config(['database.connections.mysql_client.database' => 'client_th_kazakhstan']);

        $report = WorkbookMinerReport::with([
            'shift',
            'user',
            'horizon',
            'project',
            'status',
            'site',
            'project',
            'history',
            'works_completed',
            'works_not_completed',
            'shift_day',
            'params.param',
            'object',
        ])->find(request()->id);

        $params_all = WorkbookParam::where('type_id', 2)->get()->keyBy('id')->toArray();

        foreach ($report->params as $param) {
            if (isset($params_all[$param->param_id])) {
                $params_all[$param->param_id]['value'] = $param->value;
            }
        };

        print_r($report->toArray());
    }

    public function setIsDeleted()
    {
        $record = WorkbookMinerReport::find(request()->id);
        $record->is_deleted = 1;
        $record->update();

        return response()->json([
            'data' => $record,
        ]);
    }

    public function sendAcceptNotifications(): void
    {
        Directory::createIsNotExist(env('FILES_STORAGE_PATH') . '/tmp/');
        $attachFilePath = $this->downloadPdf(env('FILES_STORAGE_PATH') . '/tmp/' . request()->id . '.pdf');

        MailMessage::init()
            ->setTo(request()->email)
            ->setData([])
            ->setTemplateId(request()->templateId)
            ->send();
    }

    public function attachWorker()
    {
        $users = request()->user_id ? [request()->user_id] : [];

        if (request()->shift_id) {
            $shift = Shift::with('users')->find(request()->shift_id);
            foreach ($shift->users as $user) {
                $users[] = $user->id;
            }
        }

        $record = WorkbookMinerReport::with('workers')->find(request()->record_id);
        $workers = $record->workers->keyBy('id');
        foreach ($users as $userId) {
            if (!isset($workers[$userId])) {
                $record->workers()->attach($userId);
            }
        }

        return response()->json([
            'data' => $record,
        ]);
    }

    public function detachWorker()
    {
        $record = WorkbookMinerReport::find(request()->record_id);
        $record->workers()->detach(request()->worker_id);

        return response()->json([
            'data' => $record,
        ]);
    }

    public function getPlanData()
    {
        try {

            $report = WorkbookMinerReport::with('object.plans_param', 'object.project')->find(request()->id);


            $plan = WorkbookPlanning::where('project_id', $report->object->project_id)
                ->where('date_from', '<=', $report->date)
                ->where('date_to', '>=', $report->date)
                ->first();

            if (empty($plan)) {
                throw new ApiException("План не найден");
            }

            $values = [];
            if (!empty($report->object->plans_param)) {
                $values = [
                    'value_on_date' => $report->object->plans_param->getValueOnDate($report->object->plans_param->id, $report->date, $report->object->project_id),
                    'amount_plan_period' => $report->object->plans_param->getPlanAmount($report->object->plans_param->id, $report->date, $report->object->project_id),
                    'planFactAmount' => $report->getPlanFactAmount($report->object->plans_param->id, $report->date, $report->object->project_id),
                ];
            }

            return response()->json([
                'data' => $values,
            ]);

        } catch (ApiException $e) {
            $e->json();
        }
    }
}
