<?php
namespace App\Http\Components\Mailer;

use App\Http\Components\Mailer\Message;

/*
 * Builder for PHPMailer
 */

class Mailer
{
    private $message;
    private $sender;
    private $to = [];


    function setFrom($address = null, $name = null)
    {
        self::$sender = [
            'address' => $address,
            'name' => $name,
        ];
    }

    /**
     * Adding item to recipients list
     *
     * @return void
     */
    static function setTo($email)
    {
        if (is_array($email)) {
            foreach ($email as $item) {
                self::$recipients[][] = $item['email'];
            }
        } else {
            self::$recipients[][] = $email;
        }

    }


    public static function send(MailMessage $message)
    {
        try {

            self::$mail = PHPMailerSingleton::getInstance();

            # Кому
            self::$mail->clearAllRecipients();
            foreach (self::$recipients as $recipient) {
                self::$mail->addAddress(trim($recipient[0]));
            }

            # Content
            self::$mail->Subject = $message->getSubject();
            self::$mail->Body    = $message->getBody();

            if ($message->getAttachments()) {
                foreach ($message->getAttachments() as $attachment){
                    self::$mail->addAttachment($attachment['path'], $attachment['name']);
                }
            }

            if (self::$mail->send()) {
                self::clearTo();
                return true;
            } else {

            }

        } catch (Exception $e)
        {
            echo 'Сообщение не было отправлено. Ошибка отправки: ', $e->msg;
        }
    }

}
