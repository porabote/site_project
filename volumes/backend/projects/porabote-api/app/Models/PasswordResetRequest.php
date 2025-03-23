<?php

namespace app\Models;

use App\Http\Components\Auth\Authentication as Auth;
use Illuminate\Database\Eloquent\Model;

class PasswordResetRequest extends Model
{
    function __construct(array $attributes = [])
    {
        parent::__construct($attributes);
        $this->connection = 'mysql_auth';
    }

    protected $fillable = [
        'user_id',
        'code',
        'phone',
        'email',
        'token',
        'expired_at',
        'by_phone_flg',
        'by_email_flg',
    ];

    protected $dates = [
        'expired_at'
    ];
}
