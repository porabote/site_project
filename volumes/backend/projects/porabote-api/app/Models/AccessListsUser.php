<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Observers\AccountObserver;

class AccessListsUser extends Model
{
    protected $connection = 'mysql_client';
    protected $table = 'access_lists_users';
    public $timestamps = false;

    protected $fillable = [
        'user_id',
        'access_list_id',
    ];

    public static function boot() {
        parent::boot();
       // AccessListsUser::observe(AccountObserver::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }

}
