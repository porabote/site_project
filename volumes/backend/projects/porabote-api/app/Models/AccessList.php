<?php

namespace App\Models;

use App\Http\Components\Auth\Authentication as Auth;
use Illuminate\Database\Eloquent\Model;

class AccessList extends Model
{
    protected $connection = 'mysql_auth';
    public $timestamps = false;

    protected $fillable = [
        'id',
        'name',
        'component_id',
    ];

    function users() {
        return $this->belongsToMany(User::class, 'client_' . Auth::$user->get('account_alias') . '.access_lists_users');
    }

}
