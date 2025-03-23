<?php

namespace App\Http\Components\Reader;

class ObjectReader
{
    private mixed $data;

    public function get($path)
    {
        $path = explode('.', $path);
        $stackCursor = $this->data;

        $i = 0;
        $value = null;
        while ($i < count($path)) {

            if (!property_exists($stackCursor, $path[$i])) {
                break;
            }

            if ($i == (count($path) - 1)) {
                $value = $stackCursor->{$path[$i]};
            } else {
                $stackCursor = $stackCursor->{$path[$i]};
            }

            $i++;
        }

        return $value;
    }

    public function __construct(array $data)
    {
        $this->data = json_decode(json_encode($data));
    }
}
