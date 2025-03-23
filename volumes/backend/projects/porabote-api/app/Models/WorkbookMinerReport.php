<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class WorkbookMinerReport extends Model
{

    protected $connection = 'mysql_client';

    protected $fillable = [
        'date',
        'user_id',
        'project_id',
        'status_id',
        'shift_id',
        'horizon_id',
        'site_id',
        'object_id',
        'head_id',
        'plan_value',
        'plan_value_fact',
        'downtime_reason',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // comment from daily report
    public function comment()
    {
        return $this->hasOne(Comment::class, 'record_id')->where('label', 'daily_report_to_miner');
    }

    public function head()
    {
        return $this->belongsTo(User::class, 'head_id');
    }

    public function works()
    {
        return $this->hasMany(WorkbookMinerReportsWork::class, 'report_id')->orderBy('lft');
    }

    public function workers()
    {
        return $this->belongsToMany(
            User::class,
            config('database.connections.mysql_client.database') . '.workbook_miner_reports_workers',
            'report_id',
            'user_id'
        );
    }

    public function works_completed()
    {
        return $this->hasMany(WorkbookMinerReportsWork::class, 'report_id')->orderBy('lft')->where('is_completed', 1);
    }

    public function works_not_completed()
    {
        return $this->hasMany(WorkbookMinerReportsWork::class, 'report_id')->orderBy('lft')->where('is_completed', 0);
    }

    public function params()
    {
        return $this->hasMany(WorkbookParamsValue::class, 'report_id');
    }

    public function history()
    {
        return $this->hasMany(History::class, 'record_id')->where('label', 'miner_report');
    }

    public function shift()
    {
        return $this->belongsTo(Shift::class);
    }

    public function worker()
    {
        return $this->belongsTo(User::class);
    }

    public function project()
    {
        return $this->belongsTo(WorkbookProject::class);
    }

    public function horizon()
    {
        return $this->belongsTo(WorkbookLocation::class)->where('type', 'horizon');
    }

    public function object()
    {
        return $this->belongsTo(WorkbookLocation::class)->where('type', 'object');
    }

    public function site()
    {
        return $this->belongsTo(WorkbookLocation::class)->where('type', 'site');
    }

    public function status()
    {
        return $this->belongsTo(Status::class)->where('model', 'WorkbookMinerReport');
    }

    public function shift_day()
    {
        return $this->belongsTo(DictShiftsDay::class, 'shift_id');
    }

    public function descent_request()
    {
        return $this->belongsToMany(
            WorkbookDescentRequest::class,
            'workbook_descent_request_miner_report',
            'report_id',
            'request_id'
        );
    }

    public function getPlanFactAmount()
    {
//        $plan = WorkbookPlanning::where('project_id', $this->object->project->id)
//            ->where('date_from', '<=', $this->date)
//            ->where('date_to', '>=', $this->date)
//            ->first();

        $factSum = WorkbookMinerReport::where('object_id', $this->object->id)
            ->where('project_id', $this->object->project->id)
            ->sum('plan_value_fact');
        return $factSum;

    }

}
