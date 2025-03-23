<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class WorkbookParamsReport extends Model
{
    protected $connection ='mysql_client';
    public $timestamps = false;

    protected $fillable = [
        'param_id',
        'report_id',
        'report_type_id',
    ];

}
