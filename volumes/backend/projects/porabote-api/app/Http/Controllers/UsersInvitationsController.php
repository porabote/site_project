<?php

namespace App\Http\Controllers;

use App\Http\Components\Auth\Authentication as Auth;
use App\Http\Components\Mailer\MailMessage;
use App\Http\Components\Rest\Exceptions\ApiException;
use App\Models\User;
use App\Models\UsersInvitation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Http\Components\Rest\ApiTrait;
use Carbon\Carbon;

class UsersInvitationsController extends Controller
{
    use ApiTrait;



    public function get()
    {
        try {

            $userId = request()->input('user_id');

            if (Auth::$user->get('is_su') != 1 || !$userId) {
                throw new ApiException('Access to action denied', 403);
            }

            $records = UsersInvitation::where('user_id', $userId)->get();

            return response()->json([
                'data' => $records,
            ]);

        } catch (ApiException $e) {
            $e->json();
        }
    }

    public static function authAllow()
    {
        return [
            'accept',
            'getUserInvitation',
            'invitationAccept'
        ];
    }

    public function makeInvitation()
    {
        try {

            $userId = request()->input('user_id');

            if (Auth::$user->get('is_su') != 1) {
                throw new ApiException('Access to action denied', 403);
            }

            $invitation = UsersInvitation::create([
                'user_id' => $userId,
                'code' => random_int(100000, 999999),
            ]);

            $userRecord = User::find($userId);

            MailMessage::init()
                ->setTo($userRecord->email)
                ->setData($invitation)
                ->setData(['user' => [
                    'email' => $userRecord->email,
                    'name' => $userRecord->sur_name . ' ' . $userRecord->first_name,
                ]])
                ->setTemplateId(30)
                ->send();

            return response()->json([
                'data' => $invitation,
            ]);
        } catch (ApiException $e) {
            $e->json();
        }
    }

    public function getUserInvitation()
    {
        $code = request()->input('code');

        $invitation = UsersInvitation::where('code', $code)
            ->with('user')
            ->whereNull('activated_at')
            ->where('created_at', '>=', Carbon::now()->subHour(1))
            ->first();

        return response()->json([
            'data' => $invitation,
        ]);
    }

    public function accept()
    {
        try {
            $password = request()->input('password');
            $password = Hash::make($password);

            $code = request()->input('code');

            $invitation = UsersInvitation::where('code', $code)
                ->with('user')
                ->whereNull('activated_at')
                ->where('created_at', '>=', Carbon::now()->subHour(1))
                ->first();

            if (!$invitation) {
                throw new ApiException('Приглашение не найдено');
            }

            $user = User::find($invitation->user->id);
            $user->password = $password;
            $user->update();

            $invitation->activated_at = Carbon::now();
            $invitation->update();

            return response()->json([
                'data' => $invitation,
            ]);
        } catch (ApiException $e) {
            $e->json();
        }

    }
}
