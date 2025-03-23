<?php
namespace App\Http\Controllers;

use App\Http\Components\Rest\ApiTrait;
use App\Http\Components\Rest\Exceptions\ApiException;
use App\Models\AccessListsUser;
use App\Http\Components\Auth\Authentication as Auth;

class AccessListsUsersController extends Controller
{
    use ApiTrait;

    public function attachUsers()
    {
        $node = AccessListsUser::where([
            'user_id' => request()->input('user_id'),
            'access_list_id' => request()->input('access_list_id'),
        ])->first();
        if (!$node) {
            $node = AccessListsUser::create(request()->all());
        }
        return response()->json([
            'data' => $node,
        ]);
    }

    public function detachUser()
    {
        try {
            $node = AccessListsUser::where([
                'user_id' => request()->input('user_id'),
                'access_list_id' => request()->input('access_list_id'),
            ])->first();

            if (!$node) {
                throw new ApiException('Связка не найдена');
            }

            $node->delete();

            return response()->json(['data' => null]);
        } catch (ApiException $e) {
            $e->json();
        }
    }
}

?>
