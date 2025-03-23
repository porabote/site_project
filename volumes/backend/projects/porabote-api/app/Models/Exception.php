<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Exception extends Model
{
    public $timestamps = FALSE;
    protected $connection = 'mysql_dicts';

    public static function getMsg($id)
    {
        $lang = request()->header('lang');
        if (!$lang) {
            $lang = 'en';
        }
        return Exception::find($id)->{'name_' . $lang};
    }
}
