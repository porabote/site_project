<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;

class AclAro extends Model
{
    protected $connection = 'mysql_auth';
    protected $table = 'acl_aros';
    public $timestamps = false;

    protected $fillable = [
        'parent_id',
        'model',
        'foreign_key',
        'label',
    ];

    public function permissions()
    {
        return $this->hasMany(AclPermission::class, 'aro_id');
    }
}
