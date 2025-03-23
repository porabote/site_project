<?php
namespace App\Http\Components\Rest;

use Illuminate\Http\Request;
use App\Http\Components\Rest\PayloadItem;
use App\Http\Components\Rest\ApiTrait;

class Payload
{
    private $type;
    private $url;
    private $requireList;
    private $rawData = [];
    public $data = [];
    public $meta = [];

    function __construct(Request $request)
    {

        $pathSplited = explode('/', str_replace('api/', '', $request->path()));

        $this->requireList = $this->setRequireList($request->query('include'));

        list($this->type) = $pathSplited;

        $this->url = $request->url();

        $this->meta = [
            'page' => ApiTrait::$page,
            'limit' => ApiTrait::$limit,
            'offset' => ApiTrait::$offset,
            'lastId' => 0,
            'order' => 'DESC'
        ];
    }

    function setRequireList($includeList)
    {
        if (!$includeList) return [];

        $list = [];

        foreach ($includeList as $key => $item) {
            $list[$key] = explode('.', $item);
        }

        $resortList = [];
        foreach ($list as $parts) {
            $item = $this->verticalArrayToGorizontal($parts);
            if (is_array($item)) {
                $resortList = array_merge_recursive($resortList, $item);
            } else {
                $resortList[$item] = [];
            }

        }

        return $resortList;
    }

    function verticalArrayToGorizontal($array)
    {
        $firstKey = array_shift($array);

        if ($array) {
            return [$firstKey => $this->verticalArrayToGorizontal($array)];
        } else {
            return [$firstKey => []];
        }
    }

    function setData($data)
    {
        $this->rawData = $data;

        if (isset($data['id'])) {
            $this->data = $this->setPayloadItem($data, $this->requireList, $this->type);
        } else {
            foreach ($data as $datum) {
                $this->data[] = $this->setPayloadItem($datum, $this->requireList, $this->type);
            }
        }
    }

    function setMeta($data)
    {
        $this->meta = array_merge($this->meta, $data);
    }

    function setPayloadItem($data, $requireList, $type)
    {
        $payloadItem = new PayloadItem($type);
        $payloadItem->setLink('/api/' . strtolower($type) . '/get/' . $data['id']);

//        foreach ($requireList as $key => $relationPath) {
//
//            if (is_int($key)) {
//
//                if (!is_array($relationPath)) $relationPath = [$relationPath];
//
//                foreach ($relationPath as $relationAlias) {
//                    $this->setPayloadItemRelation($data, $relationAlias, $payloadItem, $relationPath);
//                }
//
//            } else {
//
//                $relationName = $key;
//
//                if (isset($data[$relationName])) {
//                    $this->setPayloadItemRelation($data, $relationName, $payloadItem, $relationPath);
//                }
//            }
//        }

        $payloadItem->setData($data);

        return $payloadItem->data;
    }

    function setPayloadItemRelation(&$data, $relationName, &$payloadItem, $relationPath)
    {
        $extractedData = $this->extractRelationData($data, $relationName);

        if (isset($extractedData['id'])) {

            $item = $this->setPayloadItem(
                $extractedData,
                isset($relationPath[$relationName]) ? [$relationPath[$relationName]] : [],
                $relationName
            );
            $payloadItem->setRelationship($item, $relationName);

        } else if (is_array($extractedData)) {

            $items = [];

            foreach ($extractedData as $datum) {

                //   $relates = [];
//                if (isset($relationPath[$relationName])) {
//                    $relates = $relationPath[$relationName];
//                } elseif (is_array($relationPath)) {
//                    foreach ($relationPath as $path) {
//                        if ($path == $relationName) $relates = $path;
//                    }
//                }
//                debug($relationName);
//debug($relationPath);
                $item = $this->setPayloadItem(
                    $datum,
                    isset($relationPath[$relationName]) ? [$relationPath[$relationName]] : $relationPath,
                    $relationName
                );

                $items[] = $item;
            }

            $payloadItem->setRelationship($items, $relationName);
        }
    }

    function extractRelationData(&$data, $alias)
    {
        $relatedData = $data[$alias];

        unset($data[$alias]);

        return $relatedData;
    }

}

?>
