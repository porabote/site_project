<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ShiftUser extends Model
{
    protected $connection = 'mysql_client';
    public $timestamps = false;
    public $table = 'shift_user';

    protected $fillable = [
        'shift_id',
        'user_id',
    ];

}
