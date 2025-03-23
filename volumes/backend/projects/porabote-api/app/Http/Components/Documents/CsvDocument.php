<?php

namespace App\Http\Components\Documents;

use Illuminate\Http\File;

class CsvDocument extends AbstractDocument
{

    function __construct()
    {
        parent::__construct();
        $this->setMime('text/csv');
    }

    public function create()
    {
        parent::create();

        $fh = fopen($this->getPath() . DIRECTORY_SEPARATOR . $this->getName(), 'w')  or die('Permission error');
        fclose($fh);

        return $this;
    }

    function append(array $rows)
    {
        $handle = fopen($this->getPath() . DIRECTORY_SEPARATOR . $this->getName(), "a");
        fputcsv($handle, $rows);
        fclose($handle);

        return $this;
    }

    public function output()
    {
        ob_clean();
        header('Content-type: text/csv; charset=UTF-8');
        header('Content-Disposition: attachment; filename=Customers_Export.csv');
        echo "\xEF\xBB\xBF";
        echo file_get_contents($this->getPath() . DIRECTORY_SEPARATOR . $this->getName());
    }

}
