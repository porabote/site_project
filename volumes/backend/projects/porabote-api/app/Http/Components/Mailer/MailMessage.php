<?php
namespace App\Http\Components\Mailer;

use Illuminate\Support\Facades\Blade;
use App\Http\Components\Rest\Exceptions\ApiException;
use App\Models\MailsPatterns;
use Illuminate\Support\Facades\DB;
use PHPMailer\PHPMailer\Exception;

class MailMessage {

    private $data = [];
    private $twig;
    protected $template;
    private $subject;
    private $attachments;
    private $recipients;

    public static function init(): MailMessage
    {
        $instance = new MailMessage();
        $instance->data = [
            'domain' => env('DOMAIN'),
        ];
        return $instance;
    }

    public function setTemplateId($templateId): static
    {
        $template = MailsPatterns::find($templateId);

        $this->setSubject($template->subject);
        $this->setTemplate($template->body);

        return $this;
    }

    public function setData(object | array $data): MailMessage
    {
        if (gettype($data) == "object") {
            $data = json_decode(json_encode($data), true);
        }

        $this->data = array_merge($this->data, $data);
        return $this;
    }

//    private function setTwig(): void
//    {
//        $this->subject = Blade::render($this->subject, ['data' => []]);
//        $this->template = Blade::render($this->template, ['data' => []]);
//        $loader = new \Twig\Loader\ArrayLoader([
//            'subject_html' => $this->subject,
//            'body_html' => $this->template
//        ]);
//
//        $this->twig = new \Twig\Environment($loader);
//        //$this->twig->addExtension(new \Twig\Extra\Intl\IntlExtension());
//        $this->twig->getExtension(\Twig\Extension\CoreExtension::class)->setTimezone('Europe/Moscow');
//    }

    public function setTemplate($template): void
    {
        $this->template = $template;
    }

    public function setSubject($subject): MailMessage
    {
        $this->subject = $subject;
        return $this;
    }

    public function renderSubject()
    {
        return Blade::render($this->subject, $this->data, true);
    }

    public function renderTemplate()
    {
        return Blade::render($this->template, $this->data, true);
    }

//    private function setBody()
//    {
//        return $this->twig->render('body_html', $this->data);
//    }

    public function getAttachments()
    {
        return $this->attachments;
    }

    public function setAttachment($name, $path)
    {
        $this->attachments[] = [
            'name' => $name,
            'path' => $path,
        ];
        return $this;
    }

    public function setAttachments($files)
    {
        $this->attachments = $files;
        return $this;
    }

    public function setTo($recipients)
    {
        if (is_array($recipients)) {
            foreach ($recipients as $recipient) {
                $this->recipients[] = $recipient;
            }
        } else {
            $this->recipients[]['email'] = $recipients;
        }

        return $this;
    }

    /**
     * @throws ApiException
     */
    public function send()
    {
        try {
            $mailer = PHPMailerSingleton::getInstance();

            # Кому
            foreach ($this->recipients as $recipient) {
                $mailer->addAddress(trim($recipient['email']));
            }

            # Content
            $mailer->Subject = Blade::render($this->renderSubject(), $this->data);
            $mailer->Body    = Blade::render($this->renderTemplate(), $this->data);


            if ($this->getAttachments()) {
                foreach ($this->getAttachments() as $attachment){
                    $mailer->addAttachment($attachment['path'], $attachment['name']);
                }
            }

            if(!$mailer->send())
            {
                throw new ApiException("Mailer Error: " . $mailer->ErrorInfo);
            }
//            else {
//                throw new ApiException("Message has been sent successfully");
//            }

        } catch (Exception $e)
        {
            throw new ApiException('Send error: ', $e->getMessage());

        }
    }

}
