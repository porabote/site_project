<?php

namespace App\Http\Controllers;

use App\Http\Components\Auth\Authentication as Auth;
use App\Models\Nav;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Http\Components\Rest\ApiTrait;

class NavsController extends Controller
{
    use ApiTrait;

    public static function authAllow()
    {
        return [
            'tmpCheckNavsAcos'
        ];
    }

    public function getUserMenu()
    {
        $data = Nav::get();

        return response()->json([
            'data' => $data,
            'meta' => []
        ]);
    }

    public function add()
    {
        $data = request()->all();

        if (isset($data['id']) && $data['id']) {

            $record = Nav::find($data['id']);

            foreach ($data as $fieldName => $value) {
                if (isset($record[$fieldName])) {
                    $record[$fieldName] = $value;
                }
            }
            $record->update();

        } else {
            $record = Nav::create($data);
        }

        return response()->json([
            'data' => $record->toArray(),
            'meta' => []
        ]);
    }

    public function getTree()
    {
        $navs = Nav::get()->toTree();

        $user = User::with('aro.permissions')->find(Auth::$user->get('id'));

        if ($user->is_su == 1) {
            return response()->json([
                'data' => $navs
            ]);
        }

        $alowedAcoList = [];
        foreach ($user->aro->permissions as $perm) {
            $alowedAcoList[$perm->aco_id] = $perm->aco_id;
        }

        $cutNavs = [];
        foreach ($navs->toArray() as $key => $nav) {
            if (isset($alowedAcoList[$nav['aco_id']])) {
                $item = $navs[$key]->toArray();
                // print_r($item->toArray());
                $item['children'] = [];

                foreach ($nav['children'] as $keyChild => $navChild) {
                    if (isset($alowedAcoList[$navChild['aco_id']])) {
                        $item['children'][] = $navChild;
                    }
                }

                $cutNavs[] = $item;
            }
//            else {
//                foreach ($nav['children'] as $keyChild => $navChild) {
//                    if (!isset($alowedAcoList[$navChild['aco_id']])) {
//                        unset($navs[$key]['children'][$keyChild]);
//                    }
//                }
//            }
        }

        return response()->json([
            'data' => $cutNavs
        ]);
    }

    public function getTreeAdmin()
    {
        $data = Nav::get()->toTree();

        return response()->json([
            'data' => $data,
            'meta' => []
        ]);
    }

    public function tmpCheckNavsAcos()
    {
        $navs = Nav::get();
        foreach ($navs as $nav) {
            if (!$nav->aco_id) {
                print_r($nav);
                $aco = PermissionsController::_createAco($nav->id, 'App\Models\Nav', $nav->link);

                $nav->aco_id = $aco->id;
                $nav->update();
            }
        }
    }
}
