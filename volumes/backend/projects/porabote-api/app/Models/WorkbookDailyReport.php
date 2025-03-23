<?php
namespace App\Models;

use App\Observers\AuthObserver;
use Illuminate\Database\Eloquent\Model;

class WorkbookDailyReport extends Model
{

    protected $connection = 'mysql_client';

    protected $fillable = [
        'user_id',
        'project_id',
        'status_id',
        'date',
    ];

    public static function boot() {
        parent::boot();
        WorkbookDailyReport::observe(AuthObserver::class);
    }

    public function project()
    {
        return $this->belongsTo(WorkbookProject::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function status()
    {
        return $this->belongsTo(Status::class);
    }

    public function getPlan()
    {
        return WorkbookPlanning::where('project_id', $this->project_id)
            ->where('date_from', '<=', $this->date)
            ->where('date_to', '>=', $this->date)
            ->first();
    }

}
