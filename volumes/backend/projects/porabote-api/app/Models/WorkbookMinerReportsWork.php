<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Kalnoy\Nestedset\NodeTrait;

class WorkbookMinerReportsWork extends Model
{
    use NodeTrait;

    protected $connection ='mysql_client';
    public $timestamps = false;

    protected $fillable = [
        'report_id',
        'value',
        'time_from',
        'time_to',
        'is_completed',
        'param_id',
        'name_ru',
        'name_de',
    ];

    public function param()
    {
        return $this->belongsTo(WorkbookParam::class);
    }

    public function getLftName()
    {
        return 'lft';
    }

    public function getRgtName()
    {
        return 'rght';
    }

    public function getParentIdName()
    {
        return 'parent_id';
    }

}
