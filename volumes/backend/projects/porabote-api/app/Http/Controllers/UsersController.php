<?php

namespace App\Http\Controllers;

use App\Http\Components\Auth\AuthBearer\JwtToken;
use App\Http\Components\Auth\AuthException;
use App\Http\Components\Rest\ApiTrait;
use App\Http\Components\Rest\Exceptions\ApiException;
use App\Models\AclPermissions;
use App\Models\User;
use App\Models\UsersInvitation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Http\Components\Auth\Authentication as Auth;

class UsersController extends Controller
{
    use ApiTrait;

    /**
     * @throws ApiException
     */
    public function create()
    {
        try {

            if (Auth::$user->get('is_su') != 1) {
                throw new ApiException('Access to action denied', 403);
            }

            if (!request()->input('email')) {
                throw new AuthException('Логин не указан', 200);
            }

            $user = User::where('email', request()->input('email'))->first();
            if ($user) {
                throw new AuthException('Пользователь с таким email уже существует', 200);
            }

            $data = request()->all();
            $data['username'] = request()->input('email');
            $user = User::create($data);
            PermissionsController::_createAro($user->id);

            return response()->json(['data' => $user]);

        } catch (AuthException $e) {
            $e->json();
        }
    }

    public function signUp(Request $request)
    {
        try {

            $data = $request->all();

            if (!$request->input('email')) {
                throw new AuthException('Логин или пароль не указаны', 200);
            }

            $user = User::where('email', $request->input('email'))->first();
            if ($user) {
                throw new AuthException('Пользователь с таким email уже существует', 200);
            }

            self::checkPasswordFormat($data['password']);
            $data['password'] = Hash::make($data['password']);

            $user = User::create($data);
            PermissionsController::_createAro($user->id);

            return response()->json(['data' => $data]);

        } catch (AuthException $e) {
            $e->json();
        }
    }

    public function update()
    {
        $this->initApi();

        $data = $this->request->all();

        $record = User::find($data['id']);

        foreach ($data as $field => $newValue) {
            if (
                array_key_exists($field, $record->getAttributes())
                && $record[$field] != $newValue
            ) $record->$field = $newValue;
        }

        $record->update();

        return response()->json([
            'data' => $record,
            'meta' => []
        ]);
    }

    function setPermission($request)
    {
        try {

            $userId = request()->input('user_id');
            $acoId = request()->input('aco_id');
            $status = request()->input('status');

            $user = User::find(Auth::$user->get('id'));
            if ($user->is_su != 1) {
                throw new ApiException("Access denied");
            }

            $aroId = null;

            $user = User::with('aro')->find($userId);

            if ($status) {
                PermissionsController::_createPermission($acoId, $user->aro->id);
                $status = 'Added';
            } else {
                PermissionsController::_deletePermission($acoId, $user->aro->id);
                $status = 'Deleted';
            }

            return response()->json([
                'data' => [
                    'status' => $status,
                ],
                'meta' => []
            ]);

        } catch (ApiException $e) {
            $e->json();
        }
    }

    public function getInvite()
    {
        $userId = request()->input('user_id');

        $invitation = UsersInvitation::where('user_id', $userId)
            ->where('active_flg', 1)
            ->first();

        if (!$invitation) {
            $invitation = UsersInvitation::create([
                'user_id' => $userId,
                'code' =>  random_int(100000, 999999),
            ]);
        }

        return response()->json([
            'data' => $invitation,
        ]);
    }

    public function getInvitationUser()
    {
        $code = request()->input('code');

        $invitation = UsersInvitation::where('code', $code)
            ->with('user')
            ->where('active_flg', 1)
            ->first();

        return response()->json([
            'data' => $invitation,
        ]);
    }

    public function invitationAccept()
    {
        $data = request()->all();

        $record = User::find($data['id']);

        $data['password'] = Hash::make($data['password']);

        foreach ($data as $field => $newValue) {
            if (
                array_key_exists($field, $record->getAttributes())
                && $record[$field] != $newValue
            ) $record->$field = $newValue;
        }

        $record->update();


        $invitation = UsersInvitation::where('code', $data['code'])
            ->with('user')
            ->where('active_flg', 1)
            ->first();
        $invitation->active_flg = 0;
        $invitation->update();

        return response()->json([
            'data' => $record,
        ]);
    }

    public function changePassword()
    {
        $userId = request()->input('user_id');
        $password = request()->input('password');

        $user = User::find($userId);
        $user->password = Hash::make($password);
        $user->update();

        return response()->json([
            'data' => $user,
        ]);
    }

}
