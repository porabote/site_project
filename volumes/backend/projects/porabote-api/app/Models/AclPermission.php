<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Http\Components\Auth\Authentication as Auth;

class AclPermission extends Model
{
    protected $connection = 'mysql_client';
    protected $table = 'acl_permissions';
    public $timestamps = false;

    protected $fillable = [
        "aro_id",
        "aco_id",
        "_create",
        "_read",
        "_update",
        "_delete",
    ];

//    function __construct(array $attributes = [])
//    {
//        parent::__construct($attributes);
//        $this->connection = 'client_th_' . Auth::$user->getAccountAlias();
//    }

}
