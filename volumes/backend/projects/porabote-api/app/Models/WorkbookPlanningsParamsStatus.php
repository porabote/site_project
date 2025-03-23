<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class WorkbookPlanningsParamsStatus extends Model
{
    protected $connection = 'mysql_client';
    public $timestamps = false;

    protected $fillable = [
        'name_ru',
        'name_de',
        'color',
        'plan_id',
    ];

}
