<?php
namespace App\Http\Controllers;

use App\Models\Shifts;
use App\Models\ShiftUser;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\Shift;
use App\Http\Components\Rest\ApiTrait;

class ShiftsController extends Controller
{
    use ApiTrait;

    function add()
    {
        $data = request()->all();

        if (isset($data['id']) && $data['id']) {

            $record = Shift::find($data['id']);

            foreach ($data as $fieldName => $value) {
                if (isset($record[$fieldName])) {
                    $record[$fieldName] = $value;
                }
            }
            $record->update();

        } else {
            $record = Shift::create($data);
        }

        return response()->json([
            'data' => $record->toArray(),
            'meta' => []
        ]);
    }

    function edit()
    {
        $data = request()->all();

        $record = Shift::find($data['id']);

        foreach ($data as $field => $value) {
            if (array_key_exists($field, $record->getAttributes())) $record->$field = $value;
        }

        $record->update();

        return response()->json([
            'data' => $record,
            'meta' => []
        ]);
    }

    function attachUsers($request)
    {
        $data = request()->all();

        foreach ($data['user_ids'] as $user_id) {

            $node = ShiftUser::where(['user_id' => $user_id, 'shift_id' => $data['shift_id']])->first();
            if ($node) {
                continue;
            }

            ShiftUser::create([
                'user_id' => $user_id,
                'shift_id' => $data['shift_id'],
            ]);
        }

        return response()->json([
            'data' => $data,
            'meta' => []
        ]);
    }

    function detachUser()
    {
        $data = request()->all();

        $node = ShiftUser::where(['user_id' => $data['user_id'], 'shift_id' => $data['shift_id']])->first();
        if ($node) {
            $node->delete();
        }

        return response()->json([
            'data' => $data,
            'meta' => []
        ]);
    }

    function savePeriods()
    {
        $data = request()->all();

        $shift = Shift::find($data['id']);
        $shift->periods = json_encode($data['periods']);
        $shift->update();

        return response()->json([
            'data' => $shift->toArray(),
            'meta' => []
        ]);
    }
}
