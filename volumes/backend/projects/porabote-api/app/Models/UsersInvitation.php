<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UsersInvitation extends Model {

    protected $connection= 'mysql_auth';

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'user_id',
        'code',
        'user_data_json',
        'active_flg'
    ];

    public function user() {
        return $this->belongsTo(User::class, 'user_id');
    }
}
