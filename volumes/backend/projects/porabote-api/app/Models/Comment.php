<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use App\Observers\AuthObserver;

class Comment extends Model
{
    protected $connection = 'mysql_client';

    const UPDATED_AT = null;

    protected $fillable = [
        'parent_id',
        'record_id',
        'user_id',
        'label',
        'msg',
        'created_at',
    ];

    public static function boot() {
        parent::boot();
        Comment::observe(AuthObserver::class);
    }

    public function files()
    {
        return $this->hasMany(File::class, 'record_id', 'id' )->where('model_alias', '=', 'comment');
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'id' );
    }
//
//    public function setDateCreatedAttribute($value)
//    {
//        $this->attributes['created_at'] = date("Y-m-d H:i:s");
//    }

}
