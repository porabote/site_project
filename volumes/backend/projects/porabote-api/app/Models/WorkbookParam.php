<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Kalnoy\Nestedset\NodeTrait;

class WorkbookParam extends Model
{
    use NodeTrait;

    protected $connection ='mysql_client';
    public $timestamps = false;

    protected $fillable = [
        'name_ru',
        'name_de',
        'type_id',
        'is_default',
        'parent_id',
        'unit',
    ];

    public function getLftName()
    {
        return 'lft';
    }

    public function getRgtName()
    {
        return 'rght';
    }

    public function getParentIdName()
    {
        return 'parent_id';
    }

}
