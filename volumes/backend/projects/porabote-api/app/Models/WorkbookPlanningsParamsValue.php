<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class WorkbookPlanningsParamsValue extends Model
{
    protected $connection = 'mysql_client';
    public $timestamps = false;

    protected $fillable = [
        'param_id',
        'value',
        'date',
        'planning_id',
        'section_size',
        'color',
    ];

    public function setValueAttribute($value) {
        $this->attributes['value'] = str_replace(',', '.', $value);
    }

    public function status()
    {
        return $this->belongsTo(WorkbookPlanningsParamsStatus::class, 'param_id');
    }
}
