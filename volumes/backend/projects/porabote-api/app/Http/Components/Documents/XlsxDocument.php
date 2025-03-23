<?php

namespace App\Http\Components\Documents;

use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;
use PhpOffice\PhpSpreadsheet\IOFactory;
use Illuminate\Http\File;
use Illuminate\Support\Facades\Storage;

class XlsxDocument implements DocumentInterface
{

    private Spreadsheet $spreadsheet;
    protected $activeWorksheet;
    public int $lineNumber = 1;
    public static array $alphabet;
    public $fileName;

    public static $ext = 'xlsx';

    function __construct()
    {
        self::$alphabet = range('A', 'Z');
    }

    public static function create($pathToPattern = null): self
    {
        $instance = new self();
        $instance->fileName = uniqid() . '.' . self::$ext;
        $instance->storagePath = $instance->getPath() . DIRECTORY_SEPARATOR . $instance->getName();

        if (!empty($pathToPattern)) {
            $instance->spreadsheet = IOFactory::load($pathToPattern);
        } else {
            $instance->spreadsheet = new Spreadsheet();
        }

        $instance->activeWorksheet = $instance->spreadsheet->getActiveSheet();

        return $instance;
    }

    public function getName()
    {
        return $this->fileName;
    }

    public function getLineNumber()
    {
        return $this->lineNumber;
    }

    public function setColsWidths($sizesMap)
    {
        $sheet = $this->spreadsheet->getActiveSheet();

        foreach ($sizesMap as $colLetter => $width) {
            $sheet->getColumnDimension($colLetter)->setWidth($width);
        }

        return $this;
    }

    public function setStyleBold($from, $to)
    {
        $this->spreadsheet->getActiveSheet()->getStyle("$from:$to")->getFont()->setBold( true );

    }

    public function incrLineNumber(): void
    {
        $this->lineNumber++;
    }

    public function setCursorRow(int $lineNumber): void
    {
        $this->lineNumber = $lineNumber;
    }

    public function setRow(array $data): void
    {

        $colPosition = 0;
        foreach ($data as $colIndex => $cellVal) {
            $this->spreadsheet->getActiveSheet()->setCellValue(self::$alphabet[$colPosition] . $this->lineNumber, $cellVal);
            $colPosition++;
        }

        $this->incrLineNumber();
    }

    public function output(): string
    {
        $writer = new Xlsx($this->spreadsheet);
        ob_start();
        ob_clean();

        $filePath = $this->getStoragePath() . DIRECTORY_SEPARATOR . $this->getName() . '.xlsx';
        //$writer->save('php://output');
        $writer->save($filePath);
        $res = base64_encode(ob_get_contents());

        ob_end_clean();
        return $res;
    }

    public function getPath()
    {
        // TODO: Implement getPath() method.
    }

    public function setPath(string $path)
    {
        // TODO: Implement setPath() method.
    }

    public function setFilename(string $filename)
    {
        // TODO: Implement setFilename() method.
    }

    public function download(string $format = null)
    {
        // TODO: Implement download() method.
    }

    public function delete()
    {
        // TODO: Implement delete() method.
    }

}
