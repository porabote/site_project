<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;

class AclAco extends Model
{
    protected $connection = 'mysql_auth';
    protected $table = 'acl_acos';
    public $timestamps = false;

    protected $fillable = [
        'id',
        'name',
        'parent_id',
        'foreign_key',
        'model',
        'link',
    ];

}
