<?php
namespace App\Http\Components\AccessLists;

use App\Models\AccessListsUser;
use App\Http\Components\Auth\Authentication;

class AccessLists {

    static function _check($list_id)
    {
        $access = AccessListsUser::where('access_list_id', $list_id)
            ->where('user_id', Authentication::$user->id)
            ->where('account_id', Authentication::$user->account_id)
            ->get()
            ->toArray();

        return ($access) ? true : false;
    }

    static function _get($list_id)
    {
        $acceptors =  AccessListsUser::where('access_list_id', $list_id)
            //->where('account_id', Auth::$user->account_id)
            ->get()
            ->toArray();

        $acceptorsList = [];
        foreach ($acceptors as $acceptor) {
            $acceptorsList[$acceptor['user_id']] = $acceptor['user_id'];
        }

        return $acceptorsList;
    }

//    static function _checkAccessOnCompany($listId, $companyId) {
//
//        $contractors = self::_getContractors($listId);
//
//        $access = false;
//        foreach ($contractors as $contractor) {
//            if ($contractor['id'] == $companyId) {
//                $access = true;
//                break;
//            }
//        }
//        return $access;
//    }

//    static function _getContractors($listId) {
//
//        $access = AccessListsUser::where('access_list_id', $listId)
//            ->where('user_id', Auth::$user->id)
//            ->where('account_id', Auth::$user->account_id)
//            ->with('contractors.contractor')
//            ->get()
//            ->first();
//
//        if (!$access) {
//            return [];
//        } else {
//            $contractors = [];
//            foreach ($access['contractors'] as $contractor) {
//                $contractors[] = $contractor['contractor'];
//            }
//            return $contractors;
//        }
//
//    }
}

?>
