<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DepartmentsObject extends Model
{
    protected $connection = 'mysql_client';
    public $timestamps = false;

    protected $fillable = [
        'name_en',
        'name_ru',
        'workbook_horizon_id',
    ];
}
