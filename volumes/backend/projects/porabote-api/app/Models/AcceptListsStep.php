<?php

namespace App\Models;

use App\Http\Components\Auth\Authentication as Auth;
use Illuminate\Database\Eloquent\Model;
use Kalnoy\Nestedset\NodeTrait;

class AcceptListsStep extends Model
{
    use NodeTrait;

    protected $connection = 'mysql_client';
    public $timestamps = false;

    protected $fillable = [
        'label',
        'record_id',
        'email',
        'user_id',
        'is_outside',
        'lft',
        'rght',
        'parent_id',
    ];

    function user() {
        return $this->belongsTo(User::class);
    }

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
