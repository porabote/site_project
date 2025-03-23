<?php
namespace App\Http\Components\Rest;

use App\Http\Components\Stringer\Stringer;

class PayloadItem {

    public $id;
    public $type;
    public $attributes;
   // public $relationships = [];
    public $links;
    public $data = [];

    public function __construct($modelName)
    {
        $this->type = Stringer::camelToSnake($modelName);
        $this->relationships = [];
    }

    public function setData($data)
    {
       // $this->id = $data['id'];
        $this->data = array_merge($this->data, $data);
    }

    public function setLink($link)
    {
        $this->data['meta']['link_self'] = $link;
    }

//    function setRelationship($relationship, $relationAlias)
//    {
//        $this->relationships[$relationAlias] = $relationship;
//    }
}
