<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Kalnoy\Nestedset\NodeTrait;

class WorkbookLocation extends Model
{
    use NodeTrait;

    protected $connection ='mysql_client';
    public $timestamps = false;

    protected $fillable = [
        'name_ru',
        'name_de',
        'type',
        'parent_id',
        'head_id',
    ];


    public function horizon()
    {
        return $this->belongsTo(WorkbookLocation::class, 'parent_id')->where('type', 'horizon');
    }

    public function site()
    {
        return $this->belongsTo(WorkbookLocation::class, 'parent_id')->where('type', 'site');
    }

    public function project()
    {
        return $this->belongsTo(WorkbookProject::class);
    }

    public function objects()
    {
        return $this->hasMany(WorkbookLocation::class, 'parent_id');
    }

    public function plans_param()
    {
        return $this->hasOne(WorkbookPlanningsParam::class, 'object_id');
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

//    public function setParentAttribute($value)
//    {
//        $this->setParentIdAttribute($value);
//    }

}
