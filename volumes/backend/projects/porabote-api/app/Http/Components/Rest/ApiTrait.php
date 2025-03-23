<?php
namespace App\Http\Components\Rest;

use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use App\Http\Components\Rest\Payload;
use Carbon\Carbon;
use App\Http\Components\Rest\Exceptions\ApiException;

trait ApiTrait
{
    private $modeName;

    // Accessed aros list
    public static $authAllows;

    static public $id;

    /*
     * Container for output data
     *
     * return Payload object
     */
    static private $payload;

    static public $relations;
    /**
     * The main model.
     *
     * @var object
     */
    static private $_rootModel;
    /**
     * The main related model name (for method getRelationship).
     *
     * @var object
     */
    private static $_relatedModelName;

    private static $_query;

    private static $_fields;

    public static $limit = 500;

    public static $page = 1;

    public static $offset;

    private static $_orderBy;

    protected static $_requestInput;


    function initApi()
    {
        try {

            self::$_rootModel = $this->_setModel($this->getModelName());

            self::$_requestInput = $this->request->input() ? $this->request->input() : [];

            self::$relations = $this->request->input('relations') ? $this->request->input('relations') : [];

            self::$_fields = $this->request->input('fields') ? $this->request->input('fields') : null;

            self::$page = $this->request->input('page') ? $this->request->input('page') : 1;

            self::$_orderBy = $this->request->input('orderBy') ? $this->request->input('orderBy') : ['id' => 'DESC'];

            if (!self::$_rootModel) {
                throw new ApiException('Model ' . $this->getModelName() . ' doesn`t exist');
            }
            if (isset(self::$_rootModel::$limit)) {
                self::$limit = self::$_rootModel::$limit;
            }

            $reqLimit = $this->request->input('limit');
            if (!empty($reqLimit)) {
                self::$limit = $reqLimit;
            }

            self::$offset = (self::$page - 1) * self::$limit;

            if ($this->request->input('limit') && $this->request->input('limit') < self::$limit) {
                self::$limit = $this->request->input('limit');
            }

            self::$payload = new Payload($this->request);

        } catch (ApiException $e) {
            return $e->json();
        }
    }

    static function setId($id)
    {
        self::$id = $id;
    }

    static function setRelatedModelName($name)
    {
        self::$_relatedModelName = $name;
    }

    static function setLimit($limit)
    {
        self::$limit = $limit;
    }

    function _setModel($name = null)
    {
        $modelNamespace = '\App\Models\\' . $name;

        if(class_exists($modelNamespace)) {
            return new $modelNamespace();
        }
        return null;
    }

    function get()
    {
        $this->initApi();

        self::$_query = self::$_rootModel
            ->limit(self::$limit)
            ->with(self::$relations);

        $this->_setConstraints();

        $count = self::$_query->count();

        self::$_query->offset(self::$offset);

        if (self::$id) {
            $data = self::$_query
                ->find(self::$id);
            if ($data) {
                $data = $data->toArray();
            } else {
                $data = [];
            }
        } else {

            self::$payload->setMeta([
                'count' => $count,
                'limit' => self::$limit,
                'offset' => self::$offset
            ]);

            $data = self::$_query
                ->get()
                ->toArray();

            self::$payload->setMeta([
                'perPage' => count($data),
                'lastId' => $this->setLastId($data)
            ]);
        }

        self::$payload->setData($data);

        return $this->_output($data);
    }

    public function _setConstraints()
    {
        $this->_setOrderBy();
        $this->_setFields();
        $this->_setWhere();
        $this->_setOrWhere();
        $this->_setOrWhereGrouped();
        $this->_setWhereIn();
        $this->_whereBetween();
        $this->_whereNotNull();
    }

    function setLastId($data)
    {
        if (!count($data)) return 0;
        return $data[count($data) - 1]['id'];
    }

    function delete($id)
    {
        $modelAlias = '\App\Models\\' . $this->getModelName();
        $record = $modelAlias::find($id);
        $record->delete();

        return response()->json(['name'=> $this->getModelName()]);
    }

    function getModelName()
    {
        preg_match('/([a-z]+)Controller$/i', get_class(), $modelName);
        return rtrim($modelName[1], 's');
    }

    function _setWhere()
    {
        if (isset(self::$_requestInput['where']) && is_array(self::$_requestInput['where'])) {

            foreach (self::$_requestInput['where'] as $fieldName => $valueParams) {

                if (is_string($valueParams) || gettype($valueParams) == 'integer') {

                    $value = $valueParams;

                    if(!is_null($value)) {
                        self::$_query->where($fieldName, '=', $value);
                    }
                } elseif (is_array($valueParams)) {

                    $value = $valueParams['value'];

                    if ($valueParams['operand'] == 'IS NULL') {
                        self::$_query->whereNull($fieldName);
                        continue;
                    }

                    if ($valueParams['operand'] == 'IS NOT NULL') {
                        self::$_query->whereNotNull($fieldName);
                        continue;
                    }

                    if (strtoupper($valueParams['operand']) == 'LIKE') $value = '%' . $value . '%';

                    if(!empty($value) || $value == '0') {
                        self::$_query->where($fieldName, $valueParams['operand'], $value);
                    }
                }
            }
        }
    }

    function _setOrWhere()
    {
        if (isset(self::$_requestInput['orWhere']) && is_array(self::$_requestInput['orWhere'])) {
            foreach (self::$_requestInput['orWhere'] as $fieldName => $valueParams) {

                if (is_string($valueParams)) {

                    $value = $valueParams;

                    if(!empty($value)) {
                        self::$_query->orWhere($fieldName, '=', $value);
                    }
                } elseif (is_array($valueParams)) {

                    $value = $valueParams['value'];
                    if (strtoupper($valueParams['operand']) == 'LIKE') {
                        $value = '%' . $value . '%';
                    }

                    if(!empty($value)) {
                        self::$_query->orWhere($fieldName, $valueParams['operand'], $value);
                    }
                }
            }
        }
    }

    function _setOrWhereGrouped()
    {
        if (isset(self::$_requestInput['orWhereGrouped']) && is_array(self::$_requestInput['orWhereGrouped'])) {

            foreach (self::$_requestInput['orWhereGrouped'] as $group) {

                self::$_query->where(function ($query) use ($group) {
                    $i = 0;
                    foreach ($group as $fieldName => $valueParams) {

                        $value = $valueParams['value'];
                        if (!$value) continue;

                        if (strtoupper($valueParams['operand']) == 'LIKE') $value = '%' . $value . '%';

                        if ($i == 0) $query->where($fieldName, $valueParams['operand'], $value);
                        else $query->orWhere($fieldName, $valueParams['operand'], $value);
                        $i++;
                    }
                });
            }
        }
    }

    function _setWhereIn()
    {
        if (isset(self::$_requestInput['whereIn']) && is_array(self::$_requestInput['whereIn'])) {
            foreach (self::$_requestInput['whereIn'] as $paramName => $value) {
                self::$_query->whereIn($paramName, $value);
            }
        }
    }

    function _whereBetween()
    {
        if (isset(self::$_requestInput['whereBetween']) && is_array(self::$_requestInput['whereBetween'])) {
            foreach (self::$_requestInput['whereBetween'] as $paramName => $period) {
                if (isset($period['period'])) {
                    $this->_setBetweenPeriod($paramName, $period['period']);
                } elseif (isset($period['range'])) {
                    $this->_setBetweenRange($paramName, $period['range']);
                }
            }
        }
    }

    function _setBetweenPeriod($paramName, $period)
    {
        $from = $period['from'] ?? Carbon::create(1999, 12, 31, 24);
        if (gettype($from) == "string") {
            $from = Carbon::create($from);
        }
        $to = $period['to'] ?? Carbon::create(4999, 12, 31, 24);
        if (gettype($to) == "string") {
            $to = Carbon::create($to);
        }

        self::$_query->whereBetween($paramName, [$from, $to]);
    }

    function _setBetweenRange($paramName, $range)
    {
        $from = $range['from'] ?? 0;
        $to = $range['to'] ?? 1000000000;
        self::$_query->whereBetween($paramName, [$from, $to]);
    }

    function _whereNotNull()
    {
        if (isset(self::$_requestInput['whereNotNull']) && is_array(self::$_requestInput['whereNotNull'])) {
            foreach (self::$_requestInput['whereNotNull'] as $value) {
                self::$_query->whereNotNull($value);
            }
        }
    }

    function _setOrderBy()
    {
        foreach (self::$_orderBy as $fieldName => $direction) {
            self::$_query->orderBy($fieldName, $direction);
        }
    }

    function _setFields()
    {
        if (is_array(self::$_fields)) {
            self::$_query->select(self::$_fields);
        }
    }

    function _output()
    {
        if(method_exists($this, 'getApiCallback')) {
            self::$payload = $this->getApiCallback(self::$payload);
        }

        if (!self::$payload) {
            self::$payload = [];
        }

        if (self::$_relatedModelName) {

            $data = [];
            if (isset(self::$payload->data->relationships[self::$_relatedModelName])) {
                $data = self::$payload->data->relationships[self::$_relatedModelName];
            }
            return response()->json(['data' => $data]);
        }

        return response()->json(self::$payload);
    }

    public function update($primaryKeyValue = null)
    {
        if ($primaryKeyValue === null) {
            $primaryKeyValue = request()->id;
        }

        $this->initApi();

        $data = $this->request->all();

        $record = self::$_rootModel::find($primaryKeyValue);

        foreach ($data as $field => $newValue) {
            if (
                array_key_exists($field, $record->getAttributes())
                && $record[$field] != $newValue
            ) $record->$field = $newValue;
        }

        $record->update();

        return response()->json([
            'data' => $record,
            'meta' => []
        ]);
    }

    function getEmptyEntity()
    {
        $this->initApi();

        return response()->json([
            'data' => [
                'attributes' => self::$_rootModel->getFillable()
            ],
            'meta' => []
        ]);
    }

    public function create()
    {
        $this->initApi();

        $data = $this->request->all();

        $record = $this->_create($data);

        return response()->json([
            'data' => $record,
            'meta' => []
        ]);
    }

    private function _create($attributes) {
        try {

            $this->initApi();

            $record = self::$_rootModel->create($attributes);

            return $record;

        } catch(\Illuminate\Database\QueryException $ex){
            print_r($ex->getMessage());
            // Note any method of class PDOException can be called on $ex.
        }

    }

    /*
     * POST $redords = [];
     * */
    function save() { // TODO
        try {

            $recordsOut = [];

            $this->initApi();

            $records = $this->request->input('records');

            foreach ($records as $record) {
                $result = $this->_create($record['attributes']);
                $record['attributes'] = $result->toArray();
                $recordsOut[] = $record;
            }
//            $record = self::$_rootModel->create($attributes);
//            return response()->json(['data' => $record]);

            return response()->json(['data' => ['records' => $recordsOut]]);

        } catch(\Illuminate\Database\QueryException $ex){
            debug($ex->getMessage());
            // Note any method of class PDOException can be called on $ex.
        }

    }

}
?>
