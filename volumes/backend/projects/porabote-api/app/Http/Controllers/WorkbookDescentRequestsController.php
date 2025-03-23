<?php

namespace App\Http\Controllers;

use App\Http\Components\Auth\AuthBearer\JwtToken;
use App\Http\Components\Auth\AuthException;
use App\Http\Components\Directory\Directory;
use App\Http\Components\Mailer\MailMessage;
use App\Http\Components\Rest\ApiTrait;
use App\Http\Components\Rest\Exceptions\ApiException;
use App\Http\Components\Uploader\UploaderLaravelFile;
use App\Models\AcceptListsStep;
use App\Models\AclPermissions;
use App\Models\History;
use App\Models\User;
use App\Models\UsersInvitation;
use App\Models\WorkbookDescentRequest;
use App\Models\WorkbookDescentRequestsOrder;
use App\Models\WorkbookLocation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Http\Components\Auth\Authentication as Auth;
use Carbon\Carbon;

class WorkbookDescentRequestsController extends Controller
{
    use ApiTrait;

    public static function authAllow()
    {
        return [
            // 'downloadPdf',
            'downloadPdfData',
        ];
    }

//    public function getNotAttached()
//    {
//        $records = WorkbookDescentRequest::whereDoesntHave('')->get()
//    }

    public function addEquipment()
    {
        if (!request()->id) {
            $record = WorkbookDescentRequestsOrder::create(request()->all());

            History::create([
                'log' => "Запись добавлена",
                'label' => 'descent_requests_order',
                'record_id' => $record->id,
            ]);

        } else {
            $record = WorkbookDescentRequestsOrder::change(request()->all());
        }

        return response()->json([
            'data' => $record,
        ]);
    }

    public function deleteEquipment()
    {
        if (request()->id) {
            $record = WorkbookDescentRequestsOrder::find(request()->id);

            History::create([
                'log' => "Запись ID:{$record->id} удалена",
                'label' => 'descent_requests_order',
                'record_id' => $record->id,
            ]);
            $record->delete();

        }

        return response()->json([
            'data' => [],
        ]);
    }

    public function downloadPdf($filePath = null)
    {
        $report = WorkbookDescentRequest::with([
            'orders.horizon',
            'orders.operation',
            'orders.order_type',
            'object.horizon.site',
            'object',
            'user',
            'shift_day'
        ])->find(request()->id);

        $content = view('WorkbooksDescentReuqests/pdf-export', ['data' => $report], ['cache' => false]);//PDF::loadView('WorkbooksDescentReuqests/pdf-export.blade.php');
       // $content = Blade::render(DocsPattern::find(1)->body, ['data' => $report], true); // TODO

        $mpdf = new \Mpdf\Mpdf(['tempDir' => storage_path() . '/app', 'default_font' => 'arial']);
        $mpdf->SetHTMLHeader('<div style="color: #94956e; font-size: 8pt; border-bottom: 0.5px solid #afafaf; padding: 0px 0px 5px 0px; text-align: left;">Сгенерировано в <b>@porabote</b> на {nb} стр.</div>');
        $mpdf->SetHTMLFooter('<div style="color: #94956e; font-size: 8pt; border-top: 0.5px solid #afafaf; padding: 5px 0px 0px 0px; text-align: right;">Сгенерировано в <b>@porabote</b> | {PAGENO} из {nb}</div>');
        $mpdf->WriteHTML($content);

        if ($filePath) {
            $mpdf->Output($filePath, 'F');
            return $filePath;
        }

        return response()->json([
            'data' => base64_encode($mpdf->Output('', 'S')),
        ]);
    }

    // todo delete after develop
    public function downloadPdfData()
    {
        config(['database.connections.mysql_client.database' => 'client_th_kazakhstan']);

        $report = WorkbookDescentRequest::with([
            'orders.horizon',
            'orders.operation',
            'orders.order_type',
            'object.horizon.site',
            'user',
            'shift_day',
            'site'
        ])->find(request()->id);

        echo '<pre>';
        print_r($report->toArray());
    }

    public function attachToReport()
    {
        $id = request()->descent_request_id;
        $reportId = request()->report_id;

        $request = WorkbookDescentRequest::find($id);
        $exists = $request->reports->contains($reportId);
        if (!$exists) {
            $request->reports()->attach($reportId);
        }

        return response()->json([
            'data' => [],
        ]);
    }

    public function detachReport()
    {
        $id = request()->descent_request_id;
        $reportId = request()->report_id;

        $request = WorkbookDescentRequest::find($id);
        $request->reports()->detach($reportId);

        return response()->json([
            'data' => [],
        ]);
    }

    public function saveAcceptList()
    {
        $request = WorkbookDescentRequest::with('status', 'shift_day', 'user', 'object', 'site')
            ->find(request()->id);
        $request->status_id = 4;

        $nextStep = $this->sendNotificationToNextSigner($request);
        if (!$nextStep) {
            $request->status_id = 5;
            $this->sendAcceptCompleteNotificationToInitator($request);
        }

        $request->update();

        return response()->json([
            'data' => $request,
        ]);
    }

    public function sendNotificationToNextSigner($record)
    {
//        $record = WorkbookDescentRequest::with('status', 'shift_day', 'user', 'object', 'site')->find($record->id);

        Directory::createIsNotExist(env('FILES_STORAGE_PATH') . '/tmp/descent_request');
        $attachFilePath = $this->downloadPdf(env('FILES_STORAGE_PATH') . '/tmp/descent_request/' . $record->id . '.pdf');
        $this->downloadPdf($attachFilePath);
        $record = clone $record;

        $nextStep = AcceptListsStep::orderBy('id', 'ASC')
            ->with('user')
            ->where('record_id', $record->id)
            ->where('is_deleted', 0)
            ->where('label', 'descent_request')
            ->whereNull('accepted_at')
            ->first();

        if ($nextStep) {

            $record['next_step'] = $nextStep;

            MailMessage::init()
                ->setTo($nextStep->is_outside ? $nextStep->email : $nextStep->user->email)
                ->setData($record)
                ->setAttachment('report.pdf', $attachFilePath)
                ->setTemplateId(33)
                ->send();
        }

        return $nextStep;
    }

    public function acceptStep()
    {
        $step = AcceptListsStep::find(request()->step_id);
        $step->accepted_at = Carbon::now();
        $step->update();

        $record = WorkbookDescentRequest::with('status', 'shift_day', 'user', 'object', 'site')
            ->find($step->record_id);

        $nextStep = AcceptListsStep::orderBy('id', 'ASC')
            ->with('user')
            ->where('record_id', $record->id)
            ->where('is_deleted', 0)
            ->where('label', 'descent_request')
            ->whereNull('accepted_at')
            ->first();

        if (!$nextStep) {
            $record->status_id = 5;
            $record->update();
            $this->sendAcceptCompleteNotificationToInitator($record);
        } else {
            $nextStep = $this->sendNotificationToNextSigner($record);
        }


        return response()->json(['data' => $nextStep]);
    }

    public function sendAcceptNotification($recordId)
    {
        //$record = WorkbookDescentRequest::find($recordId);
        $request = WorkbookDescentRequest::with('status', 'shift_day', 'user', 'object', 'site')->find($recordId);


        $steps = AcceptListsStep::where('record_id', $recordId)
            ->where('label', 'descent_request')
            ->get();

        History::create([
            'log' => 'Шаг подписан.',
            'record_id' => $record->id,
            'label' => 'descent_request',
        ]);

        foreach ($steps as $step) {
            if (!$step->accpted_at) {
                MailMessage::init()
                    ->setTo($step->email)
                    ->setData($record)
                    ->setTemplateId(34)
                    ->send();
                break;
            }
        }
    }

    public function declineAcceptStep()
    {
        $step = AcceptListsStep::with('user')->find(request()->step_id);

        $record = WorkbookDescentRequest::with(['status', 'shift_day', 'user', 'object', 'site'])->find($step->record_id);
        $record->status_id = 3;
        $record->update();

        History::create([
            'log' => 'Шаг отменён: ' . request()->reason,
            'record_id' => $record->id,
            'label' => 'descent_request',
        ]);

        $steps = AcceptListsStep::where('record_id', $record->id)
            ->where('label', 'descent_request')
            ->get();

        $this->sendDeclineNotificationToInitator($record, $step);

        foreach ($steps as $step) {
            $step->is_deleted = 1;
            $step->update();
        }

        return response()->json(['data' => $step]);
    }

    public function sendDeclineNotificationToInitator($record, $step)
    {
        $record = clone $record;

        $record->next_step = $step->toArray();
        $record->reason = request()->reason;

        MailMessage::init()
            ->setTo($record->user->email)
            ->setData($record)
            ->setTemplateId(31)
            ->send();
    }

    public function sendAcceptCompleteNotificationToInitator($record)
    {
//        $record = clone $record;
//
//        $nextStep = AcceptListsStep::orderBy('id', 'ASC')
//            ->with('user')
//            ->where('record_id', $record->id)
//            ->where('label', 'descent_request')
//            ->whereNull('accepted_at')
//            ->first();
//        $record['next_step'] = $nextStep;
//
//        $record->decline_comment = request()->comment;

        MailMessage::init()
            ->setTo($record->user->email)
            ->setData($record)
            ->setTemplateId(35)
            ->send();
    }

    public function upload()
    {
        $data = request()->all();

        $response = [];

        $files = $data['files'];
        foreach ($files as $file) {
            $response[] = UploaderLaravelFile::create($file)
                ->setPath(request()->label)
                ->upload()
                ->setInfo($data)
                ->save();
        }

//        $imageHandler = ImagesGdHandler::init($file['path']);
//
//        $imageHandler->setNamePrefix('medium_');
//        $uriMedium = $imageHandler->resize(env('IMAGES_MAX_WIDTH'), env('IMAGES_MAX_HEIGHT'), true);
//        $file->uri_medium = str_replace(env('FILES_STORAGE_PATH'), '/files', $uriMedium);
//
//        $imageHandler->setNamePrefix('small_');
//        $uriSmall = $imageHandler->resize(env('IMAGES_THUMBNAIL_WIDTH'), env('IMAGES_THUMBNAIL_HEIGHT'));
//        $file->uri_small = str_replace(env('FILES_STORAGE_PATH'), '/files', $uriSmall);
//
//        $file->update();
        return response()->json([
            'data' => $response,
            'meta' => []
        ]);
    }

    public function setIsDeleted()
    {
        $record = WorkbookDescentRequest::find(request()->id);
        $record->is_deleted = 1;
        $record->update();

        return response()->json([
            'data' => $record,
        ]);
    }

}

