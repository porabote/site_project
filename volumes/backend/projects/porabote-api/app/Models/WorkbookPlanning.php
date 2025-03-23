<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class WorkbookPlanning extends Model
{
    protected $connection = 'mysql_client';

    protected $fillable = [
        'project_id',
        'date_from',
        'date_to',
        'horizon_id',
        'purpose_type',
    ];

//    public function days()
//    {
//        return $this->hasMany(WorkbookPlanningsDay::class, 'plan_id');
//    }

    public function project()
    {
        return $this->belongsTo(WorkbookProject::class);
    }

    public function object()
    {
        return $this->belongsTo(WorkbookLocation::class);
    }

    public function horizon()
    {
        return $this->belongsTo(WorkbookLocation::class);
    }

    public function params()
    {
        return $this->belongsToMany(WorkbookPlanningsParam::class, 'workbook_planning_param', 'planning_id', 'param_id')
            ->whereNull('object_id');
    }

    public function objects_params()
    {
        return $this->belongsToMany(WorkbookPlanningsParam::class, 'workbook_planning_param', 'planning_id', 'param_id')
            ->whereNotNull('object_id');
    }

    public function params_values()
    {
        return $this->hasMany(WorkbookPlanningsParamsValue::class, 'planning_id');
    }

    public function params_statuses()
    {
        return $this->hasMany(WorkbookPlanningsParamsStatus::class, 'plan_id');
    }

    public function getMinerReports($all = false)
    {
        if (!$all) {
            $reports = WorkbookMinerReport::where('date', '>=', $this->date_from)
                ->where('date', '<=', $this->date_to)
                ->where('project_id', $this->project->id)
                ->get();
        } else {
            $reports = WorkbookMinerReport::where('project_id', $this->project->id)
                ->get();
        }

        return $reports;
    }
}
