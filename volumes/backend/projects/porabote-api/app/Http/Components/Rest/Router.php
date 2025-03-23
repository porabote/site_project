<?php
namespace App\Http\Components\Rest;

use App\Models\LogsRequest;
use Illuminate\Http\Request;
use App\Http\Components\Rest\Exceptions\ApiException;

class Router {

    private $class;
    private $request;

    function __construct(Request $request)
    {
        $this->request = $request;
    }

    private function _setCorsHeaders()
    {
        header("Access-Control-Allow-Origin: *");
        header("Content-Type: application/json; charset=UTF-8");
        header("Access-Control-Allow-Methods: OPTIONS,GET,POST,PUT,DELETE");
        header("Access-Control-Max-Age: 3600");
        header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
    }

    function get(Request $request, $controller, $id = null)
    {
        try {
            //LogsController::writeRequestLog($request);

            $this->_setClass($controller);
            $this->_checkMethodExists('get');

            $this->class->setId($id);

            return $this->class->get();
        } catch (ApiException $e) {
            return $e->json();
        }
    }

    function update($controller, $primaryKeyValue)
    {
        try {
            $this->_setClass($controller);
            $this->_checkMethodExists('update');

            $result = $this->class->update($primaryKeyValue, $controller);

            if (method_exists($this->class, 'postHandleUpdate')) {
                return $this->class->postHandleUpdate($result);
            }

            return $result;

        } catch (ApiException $e) {
            return $e->json();
        }
    }

    function getEmptyEntity(Request $request, $controller)
    {
        try {
            $this->_setClass($controller);
            $this->_checkMethodExists('getEmptyEntity');

            $this->class->request = $request;
            return $this->class->getEmptyEntity($controller);

        } catch (ApiException $e) {
            return $e->json();
        }
    }

    function getRelationships(Request $request, $controller, $id, $relationshipName)
    {
        $this->_setClass($controller);
        $this->_checkMethodExists('getRelationship');

        $this->class->setId($id);
        $this->class->setRelatedModelName($relationshipName);

        return $this->class->get();
    }

    function create(Request $request, $controller)
    {
        $this->_setClass($controller);
        $this->_checkMethodExists('create');

        return $this->class->create();
    }

    function save(Request $request, $controller)
    {
        $this->_setClass($controller);
        $this->_checkMethodExists('save');

        return $this->class->save();
    }

    function delete(Request $request, $controller, $id)
    {
        $this->_setClass($controller);
        $this->_checkMethodExists('delete');

        return $this->class->delete($id, $controller);
    }

    function callCustomAction(Request $request, $controller, $action, $id = null)
    {
        $this->_setClass($controller);
        $this->_checkMethodExists($action);

        return $this->class->$action($id);
    }

    private function _setNameSpace($controller)
    {
        $separator = '-';
        return 'App\Http\Controllers\\' . str_replace($separator, '', ucwords($controller, $separator)) . 'Controller';
    }

    private function _setClass($className)
    {
        $ns = $this->_setNameSpace($className);

        if (!class_exists($ns)) {
            throw new ApiException('This controller doesn`t exist');
        }

        $class = new $ns();
        $class->request = $this->request;

        $this->class = $class;
    }

    private function _checkMethodExists($methodName)
    {
        if (!method_exists($this->class, $methodName)) {
            $this->_setError('404', 'This method doesn`t exist');
        }
        return true;
    }

    private function _setError($code, $msg)
    {
        return response()->json([
            'errors' => [  [
                'status' => 404,
                'title' =>  'This method doesn`t exist'
            ]]
        ], 404);
    }

}
?>
