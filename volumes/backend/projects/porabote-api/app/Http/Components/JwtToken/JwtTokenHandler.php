<?php

namespace App\Http\Components\JwtToken;

use App\Http\Components\Auth\AuthBearer\Configure;
use App\Http\Components\Auth\AuthException;
use App\Http\Components\DataReader\DataReader;
use App\Http\Components\Rest\Exceptions\ApiException;
use App\Models\RefreshToken;
use App\Models\User;
use Carbon\Carbon;
use Firebase\JWT\JWT as FirebaseJWT;

class JwtTokenHandler
{

    /**
     * HS256 - HMAC-SHA256 для проверки достаточно ключа, RS256  - требуется два ключа приватный и публичный
     */
    private static $_alg = 'HS256';

    public static $_supported_algs = [
        'ES384' => ['openssl', 'SHA384'],
        'ES256' => ['openssl', 'SHA256'],
        'ES256K' => ['openssl', 'SHA256'],
        'HS256' => ['hash_hmac', 'SHA256'],
        'HS384' => ['hash_hmac', 'SHA384'],
        'HS512' => ['hash_hmac', 'SHA512'],
        'RS256' => ['openssl', 'SHA256'],
        'RS384' => ['openssl', 'SHA384'],
        'RS512' => ['openssl', 'SHA512'],
        'EdDSA' => ['sodium_crypto', 'EdDSA'],
    ];

    private static $_typ = 'JWT';
    private static int $_accessTokenExpireTime = 60;
    private static int $_refreshTokenExpireTime = 300;
    private static int $_tokenLength = 65;

    /**
     * Private key for generating hash signature.
     * @var string|null
     */
    private $_privateKey;

    /**
     * Payload data (JWT-claims).
     * @var array
     */
    private $_payload = [];

    /**
     * @var User|null
     */
    protected $_user;

    /**
     * @var array|null
     */
    protected $_header;

    /**
     * @var AuthException
     */
    static protected $_error;

    public function __construct($config = [])
    {
        $this->_privateKey = getenv('API_PRIVATE_KEY', true);
    }

    public function createAccessToken(DataReader $data): string
    {

        $signing_key = getenv('API_PRIVATE_KEY', true);
        list($function, $algorithm) = static::$_supported_algs[self::$_alg];

        $header = [
            "alg" => self::$_alg,
            "typ" => self::$_typ,
        ];
        $header = self::base64_url_encode(json_encode($header));

        $payload = array_merge($data->toArray(), [
            'iat' => Carbon::now(), // (issued at) время создания токена
            'exp' => Carbon::now()->addSeconds(self::$_accessTokenExpireTime), // (expire time) срок действия токена
            'iss' => 'https://api.passmen.ru', // (issuer) издатель токена
            'nbf' => 0 // (not before) срок, до которого токен не действителен
        ]);
        $payload = self::base64_url_encode(json_encode($payload));

        $signature = self::base64_url_encode(hash_hmac($algorithm, "$header.$payload", $signing_key, true));

        return "$header.$payload.$signature";
    }

    /**
     * per https://stackoverflow.com/questions/2040240/php-function-to-generate-v4-uuid/15875555#15875555
     */
    public static function base64_url_encode($text): string
    {
        return str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($text));
    }

    public static function base64_url_decode($text)
    {
        return base64_decode(str_replace(['-', '_'], ['+', '/'], $text));
    }

    public static function checkIsValid(string $accessToken): bool
    {
        list($function, $algorithm) = static::$_supported_algs[self::$_alg];
        list($header, $payload, $signature) = explode('.', $accessToken);

        $sign = self::base64_url_encode(hash_hmac($algorithm, "$header.$payload", getenv('API_PRIVATE_KEY', true), true));

        return $signature === $sign;
    }

    public function createRefreshToken(DataReader $data)
    {
        $randomString =
            substr(str_shuffle(str_repeat($x = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
                ceil(self::$_tokenLength / strlen($x)))), 1,
                self::$_tokenLength);

        $token = RefreshToken::create([
            'user_id' => $data->get('id'),
            'token' => $randomString,
            'expiry_date' => Carbon::now()->addSeconds(self::$_refreshTokenExpireTime),
        ]);

        return $token->token;
    }

    public static function checkIsExpired(string $accessToken)
    {
        $payload = self::getPayload($accessToken);

        if (!isset($payload->exp)) {
            return true;
        }

        $dateNow = Carbon::now()->setTimezone('UTC');
        $expDate = Carbon::create($payload->exp)->setTimezone('UTC');

        if ($expDate->gt($dateNow)) {
            return false;
        }

        return true;
    }

    public static function checkIsExpiredRefreshToken(string $refreshToken): bool
    {
        $record = RefreshToken::where('token', $refreshToken)
            ->where('expiry_date', '>', Carbon::now())
            ->first();

        if (!$record) {
            return true;
        }

        return false;
    }

    /**
     * @throws ApiException
     */
    public static function getPayload(string $accessToken)
    {
        try {

            $tokenSplotedArray = explode(".", $accessToken);

            if (!isset($tokenSplotedArray[1])) {
                throw new ApiException('Invalid access token');
            }

            return json_decode(self::base64_url_decode($tokenSplotedArray[1]));

        } catch (AuthException $e) {
            $e->json();
        }
    }

    /**
     * Decode JWT token.
     *
     * @param string $token JWT token to decode.
     *
     * @return object|null The JWT's payload as a PHP object, null on failure.
     */
    public function decode(string $token)
    {
        try {
            return;// TODO FirebaseJWT::decode($token,new Key(getenv('APP_KEY', true), $this->_alg));//, $headers = new \stdClass()
        } catch (ApiException $e) {
            if (Configure::read('debug')) {
                throw $e;
            }
            self::$_error = $e;
        }
    }

}

?>
