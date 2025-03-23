<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class WorkbookParamsValue extends Model
{

    protected $connection ='mysql_client';
    public $timestamps = false;

    protected $fillable = [
        'param_id',
        'report_id',
        'type_id',
        'value',
    ];

    public function param()
    {
        return $this->belongsTo(WorkbookParam::class);
    }

}
