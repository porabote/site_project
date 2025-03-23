<?php

namespace App\Http\Controllers;

use App\Http\Components\Rest\Exceptions\ApiException;
use App\Http\Components\Uploader\UploaderLaravelFile;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\File;
use App\Models\Files;
use App\Models\History;
use App\Http\Components\Rest\ApiTrait;

class FilesController extends Controller
{
    use ApiTrait;

    public static function authAllow()
    {
        return [
            //'get',
        ];
    }

    function upload(Request $request)
    {
        $data = $request->all();

        try {

            if (isset($data['files'])) {

                $files = [];

                foreach ($data['files'] as $item) {
                    $File = $item['file'];
                    unset($item['file']);
                    $files[] = self::uploadFile($File, $item);
                }

                return response()->json([
                    'data' => $files,
                    'meta' => []
                ]);

            } elseif (isset($data['file'])) {

                $File = $data['file'];
                unset($data['file']);
                $file = self::uploadFile($File, $data);

                return response()->json([
                    'data' => $file,
                    'meta' => []
                ]);
            }

        } catch (ApiException $e) {
            $e->json();
        }

    }

    static function uploadFile($file, $fileInfo = [])
    {
        // TODO Other resources
        return UploaderLaravelFile::create($file)
            ->setPath('content')
            ->upload()
            ->setInfo($fileInfo)
            ->save();
    }

    function changeFileInfo(Request $request)
    {
        $data = $request->all();

        $file = File::find($data['id']);
        foreach ($data as $fieldName => $value) {
            $file->$fieldName = $value;
        }
        $file->update();

        return response()->json([
            'data' => $file,
            'meta' => []
        ]);
    }

    function editDescription(Request $request, $id)
    {
        $data = $request->all();

        $file = File::find($id);
        foreach ($data as $fieldName => $value) {
            $file->$fieldName = $value;
        }
        $file->update();

        return response()->json([
            'data' => $file,
            'meta' => []
        ]);
    }

    function markToDelete()
    {
        $file = File::find(request()->id);

        $file->flag = "to_delete";
        $file->update();

        return response()->json([
            'data' => $file,
            'meta' => []
        ]);
    }

    function delete()
    {
        $file = File::find(request()->id);
       // unlink($file->path);
        $file->delete();

        return response()->json([
            'data' => $file,
            'meta' => []
        ]);
    }

    function editMetaData()
    {
        $file = File::find(request()->id);

        $file->update(request()->all());

        return response()->json([
            'data' => $file,
        ]);
    }


}
