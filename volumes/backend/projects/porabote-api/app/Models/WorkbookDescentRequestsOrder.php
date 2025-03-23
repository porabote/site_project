<?php

namespace App\Models;

use App\Models\Workbook\DictDescentRequestsOrdersOperation;
use App\Models\Workbook\DictDescentRequestsOrdersType;
use App\Observers\AuthObserver;
use Illuminate\Database\Eloquent\Model;

class WorkbookDescentRequestsOrder extends Model
{

    protected $connection = 'mysql_client';
    //public $table = 'workbook_descent_requests_equipments';
    const UPDATED_AT = null;

    public static function boot()
    {
        parent::boot();
        WorkbookDescentRequestsOrder::observe(AuthObserver::class);
    }

    protected $fillable = [
        'type',
        'name',
        'desc',
        'date',
        'operation_id',
        'type_id',
        'horizon_id',
        'quantity_request',
        'quantity_received',
        'request_id',
        'user_id',
    ];

    public function history()
    {
        return $this->hasMany(History::class, 'record_id')
            ->where('label', 'descent_requests_order')
            ->orderByDesc('id');
    }

    public function operation()
    {
        return $this->belongsTo(DictDescentRequestsOrdersOperation::class, 'operation_id');
    }

    public function order_type()
    {
        return $this->belongsTo(DictDescentRequestsOrdersType::class, 'type_id');
    }

    public function horizon()
    {
        return $this->belongsTo(WorkbookLocation::class, 'horizon_id');
    }

    public static function change($data)
    {
        $record = WorkbookDescentRequestsOrder::find($data['id']);
        $recordOld = $record->toArray();

        $fields = [
            'type' => 'Тип',
            'name' => 'Название',
            'desc' => 'Комментарий',
            'quantity_request' => 'Кол. запрошено',
            'quantity_received' => 'Кол. получено',
            'operation_id' => 'Операция',
            'type_id' => 'Наименование',
            'horizon_id' => 'Горизонт',
            'date' => 'Дата',
        ];

        foreach ($data as $field => $newValue) {
            if (
                array_key_exists($field, $record->getAttributes())
                && $field != 'created_at'
                && $record[$field] != $newValue
            ) {
                $record->{$field} = $newValue;

                $fieldName = $fields[$field] ?? $field;
                History::create([
                    'log' => "Изм. {$fieldName}: с \"{$recordOld[$field]}\" на \"{$newValue}\"",
                    'label' => 'descent_requests_order',
                    'record_id' => $record->id,
                ]);
            }
        }

        $record->update();
    }
}
