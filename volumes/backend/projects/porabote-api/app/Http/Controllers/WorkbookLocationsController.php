<?php

namespace App\Http\Controllers;

use App\Http\Components\Auth\AuthBearer\JwtToken;
use App\Http\Components\Auth\AuthException;
use App\Http\Components\Rest\ApiTrait;
use App\Http\Components\Rest\Exceptions\ApiException;
use App\Models\AclPermissions;
use App\Models\User;
use App\Models\UsersInvitation;
use App\Models\WorkbookLocation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Http\Components\Auth\Authentication as Auth;

class WorkbookLocationsController extends Controller
{
    use ApiTrait;

    public function getTree()
    {
        $_query = WorkbookLocation::orderBy('lft');

        if (isset(request()->where)) {
            $_query->where(request()->where);
        }

        $recordsTree = $_query->get()->toTree();

        return response()->json([
            'data' => $recordsTree,
            'meta' => []
        ]);
    }

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

        $record = WorkbookLocation::find($data['id']);

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

        $record = WorkbookLocation::where('lft', $data['lft'])->get()->first();
        // $record::fixTree();exit();

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
