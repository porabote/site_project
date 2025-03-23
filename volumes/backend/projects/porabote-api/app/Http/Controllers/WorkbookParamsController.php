<?php

namespace App\Http\Controllers;

use App\Http\Components\Rest\ApiTrait;
use App\Http\Components\Rest\Exceptions\ApiException;
use App\Models\WorkbookParam;

class WorkbookParamsController extends Controller
{
    use ApiTrait;

    public function get()
    {
        $recordsTree = WorkbookParam::orderBy('lft')->get()->toTree();

        return response()->json([
            'data' => $recordsTree,
            'meta' => []
        ]);
    }

    public function add()
    {
        $record = WorkbookParam::create(request()->all());

        return response()->json([
            'data' => $record,
            'meta' => []
        ]);
    }

    function edit()
    {
        $data = request()->all();

        $record = WorkbookParam::find($data['id']);

        foreach ($data as $field => $value) {
            if (array_key_exists($field, $record->getAttributes())) $record->$field = $value;
        }

        $record->update();

        return response()->json([
            'data' => $record,
            'meta' => []
        ]);
    }

    public function resort($request)
    {
        $data = request()->all();
       // WorkbookParam::fixTree();
        $record = WorkbookParam::where('lft', $data['lft'])->get()->first();

        if ($data['delta'] < 0) {
            $bool = $record->up(abs($data['delta']));
        } else if ($data['delta'] > 0) {
            $bool = $record->down(abs($data['delta']));
        }

        $record->save();

        return response()->json([
            'data' => $record->toArray(),
            'meta' => []
        ]);
    }

}
