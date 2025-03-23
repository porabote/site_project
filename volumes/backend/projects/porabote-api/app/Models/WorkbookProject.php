<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class WorkbookProject extends Model
{
    protected $connection = 'mysql_client';

    protected $fillable = [
        'name_ru',
        'name_de',
        'number',
        'date_from',
        'date_to',
        'project_id',
    ];

    public function objects()
    {
        return $this->hasMany(WorkbookLocation::class, 'project_id')->where('type', 'object');
    }
}
