<?php
namespace app\Models\Workbook;

use Illuminate\Database\Eloquent\Model;

class DictDescentRequestsOrdersOperation extends Model
{
    protected $connection = 'mysql_client';
    public $table = 'dict_descent_requests_orders_operations';
}
