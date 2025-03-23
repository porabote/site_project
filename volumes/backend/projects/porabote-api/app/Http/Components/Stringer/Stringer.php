<?php

namespace App\Http\Components\Stringer;

class Stringer
{
    static function camelToSnake($string)
    {
        preg_match_all('!([A-Z][A-Z0-9]*(?=$|[A-Z][a-z0-9])|[A-Za-z][a-z0-9]+)!', $string, $matches);
        $ret = $matches[0];

        foreach ($ret as &$match) {
            $match = $match == strtoupper($match) ? strtolower($match) : lcfirst($match);
        }
        return implode('-', $ret);
    }

    static function snakeToCamel($string)
    {
        return ucfirst(preg_replace_callback(
            '/(-\w|_\w)/',
            function ($matches) {
                return substr(strtoupper($matches[0]), 1);
            },
            $string
        ));
    }

    public static function translit($word): string
    {
        return self::transcript($word);
    }

    public static function transcript($word)
    {
        $trans = [
            "а" => "a", "б" => "b", "в" => "v", "г" => "g", "д" => "d", "е" => "e",
            "ё" => "yo", "ж" => "j", "з" => "z", "и" => "i", "й" => "i", "к" => "k",
            "л" => "l", "м" => "m", "н" => "n", "о" => "o", "п" => "p", "р" => "r",
            "с" => "s", "т" => "t", "у" => "u", "ф" => "f", "х" => "h", "ц" => "c",
            "ч" => "ch", "ш" => "sh", "щ" => "sh", "ы" => "y", "э" => "e", "ю" => "yu",
            "я" => "ya",
            "А" => "a", "Б" => "b", "В" => "v", "Г" => "g", "Д" => "d", "Е" => "e",
            "Ё" => "yo", "Ж" => "j", "З" => "z", "И" => "i", "Й" => "i", "К" => "k",
            "Л" => "l", "М" => "m", "Н" => "n", "О" => "o", "П" => "p", "Р" => "r",
            "С" => "s", "Т" => "t", "У" => "u", "Ф" => "f", "Х" => "h", "Ц" => "c",
            "Ч" => "ch", "Ш" => "sh", "Щ" => "sh", "Ы" => "y", "Э" => "e", "Ю" => "yu",
            "Я" => "ya", "ь" => "", "Ь" => "", "ъ" => "", "Ъ" => "", "№" => "N",
        ];

        $word = mb_strtolower(strtr($word, $trans));
        $word = preg_replace("/[^A-Za-z0-9.]/", '_', $word);

        return trim($word, '-');
    }

    public static function transliteFileName($fileName)
    {
        $fileName = preg_replace('/[^a-zA-Zа-яА-Я0-9\_\-\.]/ui', '', $fileName);

        return mb_ereg_replace_callback(
            "(.+)(\.[a-zA-Z]+$)",
            function ($match) {
                return self::transliteFileName($match[1]) . '_' . time() . $match[2];
            },
            $fileName);
    }
}
