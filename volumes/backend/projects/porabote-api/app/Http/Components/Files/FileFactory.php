<?php
namespace App\Http\Components\Files;

use App\Http\Components\Files\IFile;
use App\Http\Components\Files\TmpFile;

class FileFactory {

    public static function create(string $fileFormat)
    {
        switch ($fileFormat) {
            case 'csv': return new TmpFile::create();
        }
    }
}
?>
