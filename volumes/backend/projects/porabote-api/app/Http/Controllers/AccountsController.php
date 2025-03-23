<?php

namespace App\Http\Controllers;

use App\Http\Components\Rest\ApiTrait;
use App\Http\Components\Rest\Exceptions\ApiException;
use App\Models\Account;
use App\Models\AccountsUser;
use App\Http\Components\Auth\Authentication as Auth;

class AccountsController extends Controller
{
    use ApiTrait;

    public function changeUserAccess()
    {
        try {
            $userId = request()->input('user_id');
            $accountId = request()->input('account_id');
            $status = request()->input('status');

            if (Auth::$user->get('is_su') != 1) {
                throw new ApiException("Access denied");
            }

            $node = AccountsUser::where([
                'user_id' => $userId,
                'account_id' => $accountId,
            ])->first();

            if ($status && !$node) {
                AccountsUser::create([
                    'user_id' => $userId,
                    'account_id' => $accountId,
                ]);
                $status = 'Added';
            } else {
                $node->delete();
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
}
