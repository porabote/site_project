<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CurlLogs extends Model
{
    protected $connection= 'mysql';

    protected $fillable = [
        'success',
        'code',
        'response',
        'url',
        'label',
        'client_id',
        'entity_id', // id сущности, например лида
        'entity_name',
    ];
}
