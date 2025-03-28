<?php

namespace App\Observers;

use App\Models\History;
use Carbon\Carbon;

class FileObserver
{
    public function creating($model)
    {
        $attributes = $model->getAttributes();

        $splFileInfo = $splFileInfo = new \SplFileInfo($attributes['path']);

        $model->basename = $splFileInfo->getBasename();
        $model->ext = $splFileInfo->getExtension();
        $model->uri = str_replace(
            env('FILES_STORAGE_PATH') . DIRECTORY_SEPARATOR,
            DIRECTORY_SEPARATOR . DIRECTORY_SEPARATOR,
            $splFileInfo->getRealPath()
        );
        $model->size = filesize($splFileInfo->getRealPath());
        $model->mime = mime_content_type($splFileInfo->getRealPath());

        if (explode('/', $model->mime)[0] = 'image') {
            list($model->width, $model->height) = getimagesize($model->path);
        }
    }

}
