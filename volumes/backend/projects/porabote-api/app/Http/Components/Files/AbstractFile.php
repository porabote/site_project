<?php
namespace App\Http\Components\Files;

abstract class AbstractFile {

    private $name;
    private $size;
    private $mime;
    private $absolutePath;
    private $storagePath;

    public function setStoragePath(string $relativeStoragePath): AbstractFile
    {
        $this->storagePath = $relativeStoragePath;
        return $this;
    }

    public abstract static function init();

    public function delete() {

    }

    public function read() {

    }

    public function append() {

    }
}
