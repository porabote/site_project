<?php

namespace App\Http\Components\Documents;

use Illuminate\Support\Facades\Storage;

interface DocumentInterface
{
    public static function create($pathToPattern = null);
    public function getPath();
    public function setPath(string $path);
    public function setFilename(string $filename);
    public function download(string $format = null);
    public function delete();
}
