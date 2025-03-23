<?php
namespace App\Models;

use App\Observers\AuthObserver;
use Illuminate\Database\Eloquent\Model;

class WorkbookDescentRequest extends Model
{

    protected $connection = 'mysql_client';
    public $timestamps = false;

    public static function boot() {
        parent::boot();
        WorkbookDescentRequest::observe(AuthObserver::class);
    }

    protected $fillable = [
        'user_id',
        'shift_id',
        'site_id',
        'date',
    ];

    public function object()
    {
        return $this->belongsTo(WorkbookLocation::class);
    }

    public function site()
    {
        return $this->belongsTo(WorkbookLocation::class, 'site_id');
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function status()
    {
        return $this->belongsTo(Status::class);
    }

    public function shift_day()
    {
        return $this->belongsTo(DictShiftsDay::class, 'shift_id');
    }

    public function orders()
    {
        return $this->hasMany(WorkbookDescentRequestsOrder::class, 'request_id');
    }

    public function reports()
    {
        return $this->belongsToMany(
            WorkbookMinerReport::class,
            'workbook_descent_request_miner_report',
            'request_id',
            'report_id',
        );
    }

}
