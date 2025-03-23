<?php
namespace App\Http\Controllers;

use App\Http\Components\Rest\ApiTrait;
use App\Http\Components\Rest\Exceptions\ApiException;
use App\Models\AclPermissions;
use App\Models\WorkbookProject;
use Carbon\Carbon;

class WorkbookProjectsController extends Controller
{
    use ApiTrait;


    public function add()
    {
        $record = WorkbookLocation::create(request()->all());

        return response()->json([
            'data' => $record,
            'meta' => []
        ]);
    }

    function edit()
    {
        $data = request()->all();

        $record = WorkbookProject::find($data['id']);

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
