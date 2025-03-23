<?php

namespace App\Models;

use App\Observers\AuthObserver;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Observers\HistoryObserver;
use App\Http\Components\Auth\Authentication as Auth;

class Shift extends Model
{
    use HasFactory;

    protected $connection = 'mysql_client';
    public $timestamps = false;
    public static $limit = 50;

    public static function boot() {
        parent::boot();
        //Shift::observe(HistoryObserver::class);
    }

    protected $fillable = [
        'name',
        'head_user_id',
    ];

    function head_user() {
        return $this->belongsTo(User::class, 'head_user_id', 'id' );
    }

    function users() {
        return $this->belongsToMany(User::class, 'client_' . Auth::$user->get('account_alias') . '.shift_user');
    }

}
