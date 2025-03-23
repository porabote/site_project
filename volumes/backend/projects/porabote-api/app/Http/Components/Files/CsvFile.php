<?php

namespace App\Http\Components\Files;

use Illuminate\Http\File;
use Illuminate\Support\Facades\Storage;

class CsvFile extends AbstractFile
{

    public $file;
    public $storagePath = 'tmp';
    private $absolutePath;
  //  public $baseName;

    function __destruct()
    {
        //unlink($this->file);
    }

    static function init()
    {
        $file = new CsvFile();

        if (!Storage::exists($file->relativePath)) {
            Storage::makeDirectory($file->relativePath, 0777, true, true);
        }

        $file->absolutePath = storage_path('app/' . $file->relativePath . '/' . uniqid('tmp_') . '.txt');

        $fh = fopen($file->absolutePath, 'w')  or die('Permission error');
        fclose($fh);

        return $file;
    }

    function write()
    {
        $fp = fopen($this->absolutePath, 'w');
        fwrite($fp, 'store temporary data in a file');
        fclose($fp);
        return $this;
    }

}
