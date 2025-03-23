<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ApiClient extends Model
{
    protected $connection = 'mysql_auth';
    public $timestamps = false;

    protected $fillable = [
    ];
}
