<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class WorkbookPlanningsDay extends Model
{
    protected $connection = 'mysql_client';

    protected $fillable = [
        'plan_id',
        'day_date',
        'value',
    ];
}
