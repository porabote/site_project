<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Observers\AuthObserver;
use App\Observers\LogObserver;
use Kalnoy\Nestedset\NodeTrait;

class Nav extends Model
{
    use HasFactory;
    use NodeTrait;

    protected $connection ='mysql_auth';

    public $timestamps = false;

    protected $fillable = [
        'name_ru',
        'name_en',
        'link',
        'parent_id',
        'lft',
        'rght',
        'aco_id'
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

    public function setParentAttribute($value)
    {
        $this->setParentIdAttribute($value);
    }

}
