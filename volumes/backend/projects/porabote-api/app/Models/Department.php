<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Department extends Model
{
    protected $connection = 'mysql_client';
    //public $timestamps = false;

    protected $fillable = [
        'name_en',
        'name_ru',
    ];

    public function users()
    {
        return $this->hasMany(User::class);
    }
}
