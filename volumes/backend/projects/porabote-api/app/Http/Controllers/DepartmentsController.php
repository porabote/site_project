<?php

namespace App\Http\Controllers;

use App\Http\Components\Rest\ApiTrait;
use App\Models\Department;

class DepartmentsController extends Controller
{
    use ApiTrait;

    public function add()
    {
        $data = request()->all();
        Department::create($data);

        response()->json([
            'data' => 'ok'
        ]);

    }
}
