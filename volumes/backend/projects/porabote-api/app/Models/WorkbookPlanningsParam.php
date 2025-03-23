<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

class WorkbookPlanningsParam extends Model
{
    protected $connection = 'mysql_client';
    public $timestamps  = false;

    protected $fillable = [
        'name_ru',
        'name_de',
        'unit_ru',
        'unit_de',
        'parent_id',
        'section_size',
        'object_id',
        'use_in_average_calc_flg',
        'lft',
        'rght',
    ];

    public function value()
    {
        return $this->hasOneThrough(
            WorkbookPlanningsParamsValue::class,
            WorkbookPlanningParam::class,
            'planning_id',
            'param_id',
        );
    }

    public function getValueOnDate($paramId, $date, $projectId)
    {
        $date = Carbon::create($date);
        if (empty($date) || empty($projectId)) {
            return null;
        }
        $plan = WorkbookPlanning::where('project_id', $projectId)
            ->where('date_from', '<=', $date)
            ->where('date_to', '>=', $date)
            ->first();

        if (empty($plan)) {
            return null;
        }

        return WorkbookPlanningsParamsValue::where('date', $date)
            ->where('planning_id', $plan->id)
            ->where('param_id', $paramId)
            ->first();
    }

    public function getPlanAmount($paramId, $date, $projectId)
    {
        if (empty($date) || empty($projectId)) {
            return null;
        }
        $plan = WorkbookPlanning::where('project_id', $projectId)
            ->where('date_from', '<=', $date)
            ->where('date_to', '>=', $date)
            ->first();

        if (empty($plan)) {
            return null;
        }

        return WorkbookPlanningsParamsValue::where('planning_id', $plan->id)
            ->where('param_id', $paramId)
            ->sum('value');
    }

    public function setSectionSizeAttribute($value) {
        $this->attributes['section_size'] = str_replace(',', '.', $value);
    }

    public function object()
    {
        return $this->belongsTo(WorkbookLocation::class);
    }

    public function sub_params()
    {
        return $this->hasMany(WorkbookPlanningsParam::class, 'parent_id');
    }

}
