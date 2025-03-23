<?php
namespace App\Http\Controllers;

use App\Http\Components\AccessLists\AccessLists;
use App\Http\Components\Auth\Authentication as Auth;
use App\Http\Components\Rest\Exceptions\ApiException;
use App\Models\AcceptListsStep;
use App\Models\AccessListsUser;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Components\Rest\ApiTrait;
use App\Models\AccessList;

class AcceptListsStepsController extends Controller
{
    use ApiTrait;

    public function add()
    {
        try {
//            if (Auth::$user->get('is_su') != 1) {
//                return new ApiException("Access denied");
//            }

            $record = AcceptListsStep::create(request()->all());

            return response()->json(['data' => $record]);

        } catch (ApiException $e) {
            return $e->json();
        }
    }

    public function delete($id)
    {
        AcceptListsStep::find(request()->id)->delete();
        return response()->json(['data' => 'ok']);
    }

}
