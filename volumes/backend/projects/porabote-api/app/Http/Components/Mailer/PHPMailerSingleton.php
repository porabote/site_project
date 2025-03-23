<?php

namespace App\Http\Components\Mailer;

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

class PHPMailerSingleton
{

    private static $instance;

    private function __construct()
    {
    }

    static function getInstance()
    {
        if (!self::$instance) {
            self::$instance = new \PHPMailer\PHPMailer\PHPMailer();
            self::setDefaultParams();
        }
        return self::$instance;
    }

    static function setDefaultParams()
    {
        self::$instance->SMTPDebug = false;
        self::$instance->isSMTP(); // Set mailer to use SMTP
        self::$instance->SMTPAuth = true;
        self::$instance->setFrom(env('SMTP_USERNAME'), 'Porabote');
        self::$instance->Host = env('SMTP_HOST');
        self::$instance->Username = env('SMTP_USERNAME');
        self::$instance->Password = env('SMTP_PASSWORD');
        self::$instance->Port = env('SMTP_PORT');

        self::$instance->SMTPAutoTLS = false;
        self::$instance->SMTPSecure = false; // Enable TLS encryption, `ssl` also accepted
        self::$instance->CharSet = 'UTF-8';
        self::$instance->isHTML(true);
    }

}

?>
