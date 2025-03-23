<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AccountsUser extends Model
{
    protected $connection = 'mysql_auth';
    public $timestamps = false;

    protected $fillable = [
        'user_id',
        'account_id'
    ];
}
