<?php

namespace app\Models;

use Illuminate\Database\Eloquent\Model;

class RefreshToken extends Model
{
    protected $connection = 'mysql_auth';
    const UPDATED_AT = null;

    protected $fillable = [
        'user_id',
        'token',
        'expiry_date',
    ];

}
