<?php
namespace App\Http\Components\Uploader;

use App\Http\Components\UploaderUploadException;
use App\Http\Components\Stringer\Stringer;
use App\Http\Components\Directory\Directory;
use App\Models\File;

class Uploader
{
    /**
     * @var string $absoluteSourcePath
     */
    private $absoluteSourcePath;
    /**
     * @var string $destDirectory
     */
    private $destDirectory;

    private static $uploadErrors = [];

    private $filesRecords = [];

    private $uploadOptions = [];

    private $dataRecord = [];


    public function init()
    {
        $uploader = new Uploader();
        $uploader->setUploadErrors();
        $uploader->setUploadOptions();
        return $uploader;
    }

    private function setUploadErrors()
    {
        self::$uploadErrors = [
            UPLOAD_ERR_OK => _('There is no error, the file uploaded with success.'),
            UPLOAD_ERR_INI_SIZE => _('The uploaded file exceeds the upload_max_filesize directive in php.ini.'),
            UPLOAD_ERR_FORM_SIZE => _('The uploaded file exceeds the MAX_FILE_SIZE directive that was specified in the HTML form.'),
            UPLOAD_ERR_PARTIAL => _('The uploaded file was only partially uploaded.'),
            UPLOAD_ERR_NO_FILE => _('No file was uploaded.'),
            UPLOAD_ERR_NO_TMP_DIR => _('Missing a temporary folder.'),
            UPLOAD_ERR_CANT_WRITE => _('Cannot write to target directory. Please fix CHMOD.'),
            UPLOAD_ERR_EXTENSION => _('A PHP extension stopped the file upload.'),
        ];
    }

    private function setUploadOptions()
    {
        $this->uploadOptions = [
            'overload' => false,
        ];
    }

    public function setDataRecord($data)
    {
        $this->dataRecord = array_merge($this->dataRecord, $data);
        return $this;
    }

    protected function setUploadOption($optionName, $value): Uploader
    {
        $this->uploadOptions[$optionName] = $value;
        return $this;
    }

    /**
     * @param $source string|array|source - string|relative/absolute depending "/" or "http" in string start
     * @param $dest string|null - relative/absolute path of destination (depending "/" in string start)
     *
     * @return array
     *
     * @throws UploadException
     */
    public function upload($source, string $dest = null)
    {
        try {
            $this->destDirectory = (substr($dest, 0, 1) == DIRECTORY_SEPARATOR) ?
                $dest : storage_path() . DIRECTORY_SEPARATOR . 'app' . DIRECTORY_SEPARATOR . $dest;

            Directory::createIsNotExist($this->destDirectory);

            if (gettype($source) == 'string') {
                if (substr($source, 0, 4) == "http") {
                    $this->_uploadRemoteFile($source);
                } else {
                    $this->cloneLocalFile($source, $this->destDirectory);
                }
            } else if (gettype($source) == 'array') {
                $this->_uploadRequestFiles($source);
            } else {
                throw new UploadException('Error: source is empty', self::$uploadErrors[UPLOAD_ERR_NO_FILE]);
            }

            return $this->filesRecords;

        } catch (UploadException $e) {
            $bt = debug_backtrace();
            $caller = array_shift($bt);
            $e->logError($caller['file'] . ' on line ' . $caller['line'] . PHP_EOL);
        }

    }

    public function _uploadRequestFiles(array $files)
    {
        if (isset($files['files'])) {

            foreach ($files['files'] as $file) {
                $this->filesRecords[] = $this->_uploadRequestFile($file);
            }

        } else if (isset($files['file'])) {
            $this->filesRecords[] = $this->_uploadRequestFile($files['file']);
        }
    }

    public function _uploadRequestFile($file)
    {
        $fileAbsolutePath = $this->moveTo(
            [
                'tmp_name' => $file->getPathName(),
                'name' => $file->getClientOriginalName(),
                'size' => $file->getSize(),
                'type' => $file->getMimeType(),
                'error' => $file->getError(),
            ]
        );

    }

    // TODO
    private function _uploadRemoteFile(string $fileUrl)
    {
        $fileName = Stringer::transliteFileName(basename($fileUrl));
        $filePath = $this->destDirectory . DIRECTORY_SEPARATOR . $fileName;

        copy($fileUrl, $filePath);

        $this->createRecord($filePath);
    }

    private function createRecord(string $path)
    {
        $data = array_merge(
            $this->dataRecord,
            [
                'path' => $path,
            ]
        );

        $this->filesRecords[] = File::create($data);
    }

    private function _cloneLocalFile(string $source, string $dest)
    {

    }


    /**
     * @throws UploadException
     */
    public function moveTo($file)
    {
        $fileName = Stringer::transliteFileName($file['name']);
        $filePath = $this->destDirectory . DIRECTORY_SEPARATOR . $fileName;

        if (move_uploaded_file($file['tmp_name'], $filePath)) {
            return $filePath;
        } else {
            throw new UploadException("Error: move_uploaded_file", self::$uploadErrors[UPLOAD_ERR_CANT_WRITE]);
        }
    }

}

?>
