<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Status extends Model
{

    protected $connection = 'mysql_client';
    protected $table = 'dict_statuses';
    public $timestamps = false;

    protected $fillable = [
        'name_ru',
        'name_en',
        'model',
    ];


}
