<?php

namespace App\Http\Components\Documents;

use Illuminate\Support\Facades\Storage;

abstract class AbstractDocument implements DocumentInterface
{
    private $mime;
    private $storagePath;
    private $relativePath = 'tmp';
    private $baseName;

    function __construct()
    {
        $this->setName(uniqid());
    }

    public static function create($pathToTemplate = null)
    {

    }

    public function createFile()
    {
        if (!Storage::exists($this->getRelativePath())) {
            Storage::makeDirectory($this->getRelativePath(), 0755, true, true);
        }
    }

//    public function setName(string $name, bool $randomPostfix = true)
//    {
//        if ($randomPostfix) {
//            $this->baseName = uniqid($name . '_') . '.csv';
//        } else {
//            $this->baseName = $name . '.csv';
//        }
//        return $this;
//    }
//
//    public function getName()
//    {
//        return $this->baseName;
//    }
//
//    protected function setPath(string $path, string $absolutePath = null)
//    {
//        $this->relativePath = $path;
//
//        if (!$absolutePath) {
//            $this->storagePath =  storage_path() . DIRECTORY_SEPARATOR . 'app' . DIRECTORY_SEPARATOR . $path;
//        } else {
//            $this->storagePath = $absolutePath . DIRECTORY_SEPARATOR . $path;
//        }
//        return $this;
//    }
//
//    protected function getPath()
//    {
//        return $this->storagePath;
//    }
//
//    public function getFilePath()
//    {
//        return $this->getPath() . DIRECTORY_SEPARATOR . $this->getName();
//    }
//
//    protected function getRelativePath()
//    {
//        return $this->relativePath;
//    }
//
//    public function getSize()
//    {
//        return filesize($this->storagePath);
//    }
//
//    protected function setMime($mime)
//    {
//        $this->mime = $mime;
//    }
//
//    public function getMime()
//    {
//        return filesize($this->mime);
//    }
//
//    public function delete()
//    {
//        unlink($this->getPath() . DIRECTORY_SEPARATOR . $this->getName());
//    }
//
//    public function read()
//    {
//
//    }
//
//    public static function __callStatic(string $funcName, array $args)
//    {
//        $className = get_called_class();
//        $object = new $className();
//        return $object->{$funcName}(...$args);
//    }
}
