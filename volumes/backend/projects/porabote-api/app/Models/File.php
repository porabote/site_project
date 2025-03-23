<?php

namespace App\Models;

use App\Observers\FileObserver;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Porabote\Auth\Auth;
use App\Observers\AuthObserver;
use App\Observers\FilesObserver;

class File extends Model
{
    use HasFactory;

    protected $connection = 'mysql_client';
    const UPDATED_AT = null;

    protected $fillable = [
        'name',
        'file_path',
        'basename',
        'ext',
        'size',
        'uri',
        'uri_small',
        'uri_medium',
        'path',
        'user_id',
        'mime',
        'token',
        'width',
        'height',
        'flag',
        'alt',
        'cover_flg',
        'label',
        'model_name',
        'parent_id',
        'record_id',
        'json_data',
    ];

    public static function boot() {
        parent::boot();
        File::observe(FileObserver::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

}
