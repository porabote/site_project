<?php
namespace App\Http\Controllers;

use App\Http\Components\AccessLists\AccessLists;
use App\Http\Components\Auth\Authentication as Auth;
use App\Http\Components\Rest\Exceptions\ApiException;
use App\Models\AccessListsUser;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Components\Rest\ApiTrait;
use App\Models\AccessList;

class AccessListsController extends Controller
{
    use ApiTrait;

    public function add()
    {
        try {
            if (Auth::$user->get('is_su') != 1) {
                return new ApiException("Access denied");
            }

            $data = request()->all();

            if (request()->input('id')) {
                $record = AccessList::find($data['id']);

                foreach ($data as $field => $value) {
                    if (array_key_exists($field, $record->getAttributes())) $record->$field = $value;
                }

                $record->update();
            } else {
                $record = AccessList::create(request()->all());
            }

            return response()->json(['data' => $record]);

        } catch (ApiException $e) {
            return $e->json();
        }
    }

    public function check()
    {
        $accessListId = request()->input('accessListId');
        $checkResult = AccessLists::_check($accessListId);

        return response()->json([
            'data' => $checkResult,
        ]);
    }

    public function getPermissions()
    {
        $userId = Auth::$user->get('id');

        $perms = AccessListsUser::where('user_id', $userId)->select('access_list_id')->get();
        return response()->json([
            'data' => collect($perms)->pluck('access_list_id'),
        ]);
    }

    function attachUsers($request)
    {
        $data = request()->all();

        foreach ($data['user_ids'] as $user_id) {

            $node = AccessListsUser::where(['user_id' => $user_id, 'access_list_id' => $data['access_list_id']])->first();
            if ($node) {
                continue;
            }

            AccessListsUser::create([
                'user_id' => $user_id,
                'access_list_id' => $data['access_list_id'],
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

        $node = AccessListsUser::where(['user_id' => $data['user_id'], 'access_list_id' => $data['access_list_id']])->first();
        if ($node) {
            $node->delete();
        }

        return response()->json([
            'data' => $data,
            'meta' => []
        ]);
    }


}

?>
