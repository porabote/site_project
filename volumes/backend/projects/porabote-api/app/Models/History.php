<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use App\Observers\AuthObserver;
use Porabote\Auth\Auth;

class History extends Model
{
    protected $connection ='mysql_client';
    public $table = 'history';
    const UPDATED_AT = null;

    public static function boot() {
        parent::boot();
        History::observe(AuthObserver::class);
    }

    protected $fillable = [
        'log',
        'label',
        'user_id',
        'record_id'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

}
