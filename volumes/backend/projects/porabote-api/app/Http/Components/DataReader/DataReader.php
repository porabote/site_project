<?php

namespace App\Http\Components\DataReader;

class DataReader
{
    private object|array $data;

    public function get(string $path)
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

    public function __construct(object|array $data)
    {
        if (gettype($data) == "array") {
            $data = json_decode(json_encode($data));
        }
        $this->data = $data;
    }

    public function toArray()
    {
        return (array) $this->data;
    }
}
