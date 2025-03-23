<?php

namespace App\Http\Controllers;

use App\Http\Components\Rest\ApiTrait;
use App\Models\DepartmentsObject;

class DepartmentsObjectsController extends Controller
{
    use ApiTrait;

    public function add()
    {
        $data = request()->all();
        DepartmentsObject::create($data);

        response()->json([
            'data' => 'ok'
        ]);

    }
}
