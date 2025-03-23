<?php

namespace App\Http\Components\Images;

use App\Http\Components\Directory\Directory;
use App\Http\Components\Rest\Exceptions\ApiException;

class ImagesGdHandler
{
    protected $absolutePath;
    protected $width;
    protected $height;
    protected $maxWidth;
    protected $maxHeight;
    protected $thumbnailWidth;
    protected $thumbnailHeight;
    protected $namePrefix = 'images';
    protected $convertType = 'image/jpeg';

    public static function init(string $absolutePath)
    {
        $handler = new ImagesGdHandler();
        $handler->absolutePath = $absolutePath;
//        $handler->maxWidth = env('IMAGES_MEDIUM_MAX_WIDTH');
//        $handler->maxHeight = env('IMAGES_MEDIUM_MAX_HEIGHT');
//        $handler->thumbnailWidth = env('IMAGES_THUMBNAIL_WIDTH');
//        $handler->thumbnailHeight = env('IMAGES_THUMBNAIL_HEIGHT');
        list($handler->width, $handler->height) = getimagesize($absolutePath);

        return $handler;
    }

    public function setNamePrefix($namePrefix)
    {
        $this->namePrefix = $namePrefix;
        return $this;
    }

//    public function createThumbnail(): string | null
//    {
//           try {
//                $this->namePrefix = 'thumb_';
//                $thumbPath = $this->resize($this->thumbnailWidth, $this->thumbnailHeight, true);
//                return str_replace(env('FILES_STORAGE_PATH'), '/files', $thumbPath);
//           } catch (ApiException $e) {
//               $e->json();
//           }
//        return null;
//    }

//    public function resize(): string | null
//    {
//        try {
//            $this->namePrefix = 'medium_';
//            $thumbPath = $this->resize($this->maxWidth, $this->maxHeight);
//            return str_replace(env('FILES_STORAGE_PATH'), '/files', $thumbPath);
//        } catch (ApiException $e) {
//            $e->json();
//        }
//        return null;
//    }

    # Уменьшаем изображение по центру
    /*
	 * Param
	 * @ $src_img - абсолютный путь к исходному изображению
	 * @ $resize_wh - массив с новыми значенимями ширины и высоты нового изображения
	 * @ $convertType - указание формата сжатия ( image/png, image/jpeg, image/gif )
	 * @ $prefix - префикс размера к файлу
	 *
	 *   Возвращает абсолютный путь к созданному файлу
     */
    public function resize($max_w, $max_h, $isCrop = false): string|ApiException
    {
        try {

            # определяем координаты положения и размеры исходного изображения
            list($src_w, $src_h) = getimagesize($this->absolutePath);

            # определяем новую папку с учетом ресайза ( path / new_width x new_height / basename )
            $dst_path = self::_setFolder($this->absolutePath, $this->namePrefix, ['width' => $max_w, 'height' => $max_h]);

            # создаем новый ресурс для создаваемого изображения
            $dst_source = imagecreatetruecolor($max_w, $max_h);

            # создаем ресурс из исходного изображения
            $imageType = self::getImagetype($this->absolutePath);
            switch ($imageType) {
                case 'image/png':
                    $src_img = imagecreatefrompng($this->absolutePath);
                    # сохраняем прозрачность
                    imagealphablending($dst_source, false);
                    imagesavealpha($dst_source, true);
                    break;
                case 'image/jpeg':
                    $src_img = imagecreatefromjpeg($this->absolutePath);
                    break;
                case 'image/gif':
                    $src_img = imagecreatefromgif($this->absolutePath);
                    break;
                default:
                    return false;
                    break;
            }


            # если и ширина и высота оригинала меньше заданных
            if ($max_w > $src_w && $max_h > $src_h) {

                # пересоздаем новый ресурс для создаваемого изображения
                $dst_source = imagecreatetruecolor($src_w, $src_h);
                imagealphablending($dst_source, false);
                imagesavealpha($dst_source, true);

                # копируем изображение
                imagecopyresampled(
                    $dst_source, $src_img,
                    0, 0, 0, 0,
                    $src_w, $src_h, $src_w, $src_h
                );
            } elseif ($max_w > $src_w) { // если только ширина оригинала меньше

                # определяем новые ширину и высоту
                $percent = $max_h / $src_h * 100;

                $width_new = $src_w / 100 * $percent;
                $height_new = $src_h / 100 * $percent;

                # пересоздаем новый ресурс для создаваемого изображения
                $dst_source = imagecreatetruecolor($width_new, $max_h);
                imagealphablending($dst_source, false);
                imagesavealpha($dst_source, true);

                # делаем ширину максимально возможной, ширину ставим по оригиналу
                imagecopyresampled(
                    $dst_source, $src_img,
                    0, 0, 0, 0,
                    $width_new, $height_new, $src_w, $src_h
                );

            } # если только высота оригинала меньше
            elseif ($max_h > $src_h) {

                # пересоздаем новый ресурс для создаваемого изображения
                $dst_source = imagecreatetruecolor($max_w, $src_h);
                imagealphablending($dst_source, false);
                imagesavealpha($dst_source, true);

                # точка смещения по x
                $w_point = (($src_w - $max_w) / 2);

                # делаем ширину максимально возможной, ширину ставим по оригиналу
                imagecopyresampled(
                    $dst_source, $src_img,
                    0, 0, $isCrop ? $w_point : 0, 0,
                    $max_w, $src_h, $max_w, $src_h
                );
            } # если хватает и ширины и высоты
            else {
                // ini_set('memory_limit', '928MB');
                $src_scale = $src_w / $src_h;
                $dst_scale = $max_w / $max_h;

                # если ширина оригинала больше высоты, кадрируем по x
                if ($src_scale > 1) {

                    # если при ориентире на высоту нам хватает ширины
                    if ($src_scale > $dst_scale):

                        # определяем новые ширину и высоту
                        $percent = $max_h / $src_h * 100;

                        $width_new = $src_w / 100 * $percent;
                        $height_new = $src_h / 100 * $percent;

                        # пересоздаем новый ресурс для создаваемого изображения
                        $dst_source = imagecreatetruecolor($max_w, $max_h);
                        imagealphablending($dst_source, false);
                        imagesavealpha($dst_source, true);
                        if ($isCrop) {
//                            print_r(++$width_new);
//                            print_r('---');
//                            print_r(++$height_new);
                        }
//print_r(99);
                        $w_point = ($width_new - $max_w) / 2;
                        imagecopyresampled(
                            $dst_source, $src_img,
                            0, 0, $isCrop ? $w_point : 0, 0,
                            ++$width_new, ++$height_new, $src_w, $src_h
                        );

                    # если НЕ хватает ширины
                    else:

                        $percent = $max_w / $src_w * 100;

                        $width_new = $src_w / 100 * $percent;
                        $height_new = $src_h / 100 * $percent;

                        # пересоздаем новый ресурс для создаваемого изображения
                        $dst_source = imagecreatetruecolor($max_w, $max_h);
                        imagealphablending($dst_source, false);
                        imagesavealpha($dst_source, true);

                        $h_point = ($height_new - $max_h) / 2;
                        imagecopyresampled(
                            $dst_source, $src_img,
                            0, 0, 0, $isCrop ? $h_point : 0,
                            $width_new, $height_new, $src_w, $src_h
                        );

                    endif;


                } else {
                    # определяем новые ширину и высоту

                    $percent = $max_h / $src_h * 100;

                    $width_new = $src_w / 100 * $percent;
                    $height_new = $src_h / 100 * $percent;

                    # пересоздаем новый ресурс для создаваемого изображения
                    $dst_source = imagecreatetruecolor($width_new, $max_h);
                    imagealphablending($dst_source, false);
                    imagesavealpha($dst_source, true);

                    $h_point = (($src_h - $height_new) / 2);
                    imagecopyresampled(
                        $dst_source, $src_img,
                        0, 0, 0, 0,
                        ++$width_new, ++$height_new, $src_w, $src_h
                    );
                }

            }

            # записываем ресурс в новый файл
            if ($this->convertType == 'original') {
                $convertType = $imageType;
            }

            switch ($this->convertType) {
                case 'image/gif':
                    imagegif($dst_source, $dst_path, null);
                    break;
                case 'image/png':
                    imagepng($dst_source, $dst_path, 9);
                    break;
                case 'image/jpeg':
                    imagejpeg($dst_source, $dst_path, 100);
                    break;
                default:
                    return false;
                    break;
            }

            # очищаем память
            if ($dst_source) imagedestroy($dst_source);
            if ($src_img) imagedestroy($src_img);

        } catch (ApiException $e) {
            $e->json();
        }

        return $dst_path;
    }

    public static function getImagetype($file)
    {
        if (exif_imagetype($file) == IMAGETYPE_JPEG) {
            return 'image/jpeg';
        } elseif (exif_imagetype($file) == IMAGETYPE_PNG) {
            return 'image/png';
        } elseif (exif_imagetype($file) == IMAGETYPE_GIF) {
            return 'image/gif';
        }
        return false;
    }

    # ini установки для валидации размера файла
//    private static function _setIniSettings()
//    {
//        #максимально допустимый размер данных, отправляемых методом POST
//        self::$options['post_max_size_byte'] = intval(ini_get('post_max_size')) * 1024 * 1024;
//
//        # Максимальный размер закачиваемого файла.
//        self::$options['upload_max_filesize_byte'] = intval(ini_get('upload_max_filesize')) * 1024 * 1024;
//
//        #Максимально разрешенное количество одновременно закачиваемых файлов
//        self::$options['max_file_uploads'] = ini_get('max_file_uploads');
//    }

    /* -------------- Общие вспомогательные функции --------------  */

    # Проверяем необходимость создания новой папки
    private static function _setFolder($src_image, $prefix, $resize_wh)
    {
        $path_info = pathinfo($src_image);
        $dst_image = $path_info['dirname'] . '/' . $prefix . $path_info['basename'];

        if ($resize_wh['width'] > 0 || $resize_wh['height'] > 0) {
            # проверяем и создаем при необходимости директорию
            Directory::createIsNotExist($path_info['dirname'] . '/' . $resize_wh['width'] . 'x' . $resize_wh['height'] . '/');
            $dst_image = $path_info['dirname'] . '/' . $resize_wh['width'] . 'x' . $resize_wh['height'] . '/' . $prefix . $path_info['basename'];

            $dst_image = self::_renameFile($dst_image);

        }
        return $dst_image;
    }

    /**
     * добавляем цифры к названию файла, если параметр перезаписи FALSE
     *
     */
    public static function _renameFile($dst_path = null)
    {
        // if(!$fileName) $fileName = $this->clientFilename;

        preg_match('/(\..[^\.]*)$/', $dst_path, $ext);

        $ext_alias = '';
        if (isset($ext[0])) $ext_alias = $ext[0];

        $dst_path = str_replace($ext_alias, '', $dst_path);

        for ($i = 1; ; $i++) {
            $dst_path = $dst_path . '-' . $i . $ext_alias;
            //    print_r($dst_path);
            if (!file_exists($dst_path)) {
                //  throw new ApiException('File not exists');
                return $dst_path;
            }
        }
    }

    /*
* Очистака изображения от белого фона
*/
    public static function setOpacity($data, $color = 'white', $levelBlack = 95)
    {
        if (is_string($data)) {
            $path = $data;
        } else {
            $path = $data['save']['uri'];
            $path = str_replace('//', '/', $path);
        }

        $img_thread = 'convert ' . $path . ' -level 5%,' . $levelBlack . '% -transparent ' . $color . ' ' . $path . '';
        exec($img_thread, $output, $result);
    }

    /*
     * Установка фона
     */
    public static function setBackground($path, $options = [])
    {

        list($width, $height) = getimagesize($path);

        $optionsDefault = [
            'color' => 'ffffff',
            'opacity' => '1'
        ];

        //создаем градиентную заливку
        $gradient_path = pathinfo($path)['dirname'] . '/gradient.png';
        exec('convert \
            -size ' . $width . 'x' . $height . ' \
            gradient:"rgba(255,255,255,0.85)"-"rgba(255,255,255,0.85)" \
            ' . $gradient_path . '');

        //накладываем градиент на изображение
        exec('convert ' . $gradient_path . ' ' . $path . '   -composite  ' . $path . '');

        // Удаляем файл градиента
        unlink($gradient_path);
    }

    /* -------------- Обработка изображений --------------  */


    /*
	 * Обрезка изображение по координатам (загрузка аватарок, факсимиле и прочего)
     */
    public static function cropByCoordinates($data)
    {

        $patch = $data['save']['uri'];
        # определяем размеры исходного изображения
        list($width, $height) = getimagesize($patch);

        $width_new = $data['x2'] - $data['x1'];
        $height_new = $data['y2'] - $data['y1'];

        $img_thread = 'convert -crop ' . $width_new . 'x' . $height_new . '+' . $data['x1'] . '+' . $data['y1'] . '  ' . $patch . ' ' . $patch . '';
//debug($img_thread);
        exec($img_thread, $output, $result);
        return $patch;
    }
}

