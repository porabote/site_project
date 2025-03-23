<?php

class DirectoryComponent {

    /**
     * @throws Exception
     */
    private static function createIsNotExist(string $path, $mode = 0755)
    {
        if (is_dir($path)) {
            return true;
        }

        if (is_file($path)) {
            throw new Exception(sprintf('%s is a file', $path));
        }
        $pathname = rtrim($path, DIRECTORY_SEPARATOR);
        $nextPathname = substr($path, 0, strrpos($path, DIRECTORY_SEPARATOR));

        if (self::createIsNotExist($nextPathname, $mode)) {
            if (!file_exists($path)) {
                $old = umask(0);
                if (mkdir($pathname, $mode, true)) {
                    umask($old);
                    return true;
                }
                umask($old);

                throw new Exception(sprintf('%s NOT created', $path));
            }
        }

        return $path;
    }

}
