<?php

namespace App\Http\Components\Uploader;

use App\Http\Components\Directory\Directory;
use App\Http\Components\Rest\Exceptions\ApiException;
use App\Http\Components\Stringer\Stringer;
use App\Models\File;
use Illuminate\Http\UploadedFile;

class UploaderLaravelFile
{
    protected $tmpFile;
    protected $destDirectory;
    protected $fileName;
    protected $size;
    protected $mimeType;
    protected $error;
    protected $info = [];

    protected static $uploadErrors;

    static function setErrors()
    {
        self::$uploadErrors = [
            UPLOAD_ERR_OK => 'There is no error, the file uploaded with success.',
            UPLOAD_ERR_INI_SIZE => 'The uploaded file exceeds the upload_max_filesize directive in php.ini.',
            UPLOAD_ERR_FORM_SIZE => 'The uploaded file exceeds the MAX_FILE_SIZE directive that was specified in the HTML form.',
            UPLOAD_ERR_PARTIAL => 'The uploaded file was only partially uploaded.',
            UPLOAD_ERR_NO_FILE => 'No file was uploaded.',
            UPLOAD_ERR_NO_TMP_DIR => 'Missing a temporary folder.',
            UPLOAD_ERR_CANT_WRITE => 'Cannot write to target directory. Please fix CHMOD.',
            UPLOAD_ERR_EXTENSION => 'A PHP extension stopped the file upload.',
        ];
    }

    public static function create(UploadedFile $file)
    {
        try {
            self::setErrors();

            $errorCode = $file->getError();

            if ($errorCode) {
                throw new ApiException(self::$uploadErrors[$errorCode]);
            }

            $instance = new UploaderLaravelFile();
            $instance->tmpFile = $file;

            $instance->fileName = Stringer::transcript($file->getClientOriginalName());
            $instance->size = $file->getSize();
            $instance->error = $file->getError();
            $instance->mimeType = $file->getMimeType();

            return $instance;
        } catch (ApiException $e) {
            $e->json();
        }
    }

    public function setPath($dest)
    {
        $this->destDirectory = (substr($dest, 0, 1) == DIRECTORY_SEPARATOR) ?
            $dest : env('FILES_STORAGE_PATH') . DIRECTORY_SEPARATOR . $dest;

        Directory::createIsNotExist($this->destDirectory);

        return $this;
    }

    public function upload()
    {
        //ini_set('upload_max_filesize', '10M');

        try {
            if (move_uploaded_file(
                $this->tmpFile->getPathName(),
                $this->destDirectory . DIRECTORY_SEPARATOR . $this->fileName
            )) {
                return $this;
            } else {
                throw new UploadException(self::$uploadErrors[UPLOAD_ERR_CANT_WRITE]);
            }
        } catch (ApiException $e) {
            $e->json();
        }
    }

    public function setInfo($data)
    {
        $this->info = $data;
        return $this;
    }

    public function save()
    {
        return File::create(array_merge($this->info, [
            'path' => $this->destDirectory . DIRECTORY_SEPARATOR . $this->fileName,
        ]));
    }

}
