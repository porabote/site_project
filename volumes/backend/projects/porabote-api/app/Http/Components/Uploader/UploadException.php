<?php
namespace App\Http\Components\Uploader;

use App\Models\Log;

class UploadException extends \Exception
{
    private static $phpFileUploadErrors = [
        0 => 'There is no error, the file uploaded with success',
        1 => 'The uploaded file exceeds the upload_max_filesize directive in php.ini',
        2 => 'The uploaded file exceeds the MAX_FILE_SIZE directive that was specified in the HTML form',
        3 => 'The uploaded file was only partially uploaded',
        4 => 'No file was uploaded',
        6 => 'Missing a temporary folder',
        7 => 'Failed to write file to disk.',
        8 => 'A PHP extension stopped the file upload.',
    ];

    public function logError(string $callerLog)
    {
        Log::create([
            'log' => self::$phpFileUploadErrors[$this->getCode()] . '. ' . $this->getMessage() . ' Caller: ' . $callerLog,
        ]);
    }

}
?>
