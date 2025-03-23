<?php

namespace App\Http\Components\Auth;

use App\Http\Components\Auth\AuthToken\AuthToken;
use App\Http\Components\DataReader\DataReader;
use App\Http\Components\JwtToken\JwtTokenBuilder;
use App\Http\Components\JwtToken\JwtTokenHandler;
use App\Http\Components\Rest\Exceptions\ApiException;
use App\Http\Components\Stringer\Stringer;
use App\Models\Account;
use Illuminate\Http\Request;

class Authentication
{
    /**
     * UserAuth
     * @throws AuthException
     */
    static DataReader $user;
    static string $accessToken;
    static string $refreshToken;

    /**
     * @throws AuthException
     */
    public static function authenticate(Request $request)
    {
        if (self::checkIsMethodAllow()) {
            return true;
        }

        try {
            $clientId = $request->header('ClientId');
            if (!$clientId) {
                $clientId = $request->input('client_id');
            }

            if (!$clientId) {
                throw new AuthException('The parameter Client ID of authentication is not indicated', 401);
            }

            if ($authHeader = $request->header('Authorization')) {
                $authHeaderSplit = explode(' ', trim($authHeader));

                if (!isset($authHeaderSplit[0])) {
                    throw new AuthException('The type of authentication is not indicated', 401);
                } else {
                    $authType = $authHeaderSplit[0];
                }

                if (!isset($authHeaderSplit[1])) {
                    throw new AuthException('The token of authentication is not indicated', 401);
                }

                self::$accessToken = $authHeaderSplit[1];

                if (strtolower($authType) == 'token') {
                    return AuthToken::authenticate($clientId, self::$accessToken);
                } elseif (strtolower($authType) == 'bearer' && !empty(self::$accessToken)) {

                    if (!JwtTokenHandler::checkIsValid(self::$accessToken)) {
                        throw new AuthException('Invalid access token', 401);
                    }

//                    if (JwtTokenHandler::checkIsExpired(self::$accessToken)) {
//                        throw new AuthException('Access token expiredd', 401);
//                    }

                    $payload = JwtTokenHandler::getPayload(self::$accessToken);

                    if ($payload) {

                        self::$user = new DataReader($payload);

                        config(['database.connections.mysql_client.database' => 'client_' . self::$user->get('account_alias')]);

                    } else {
                        throw new AuthException("Incorrect token", 401);
                    }
                }

                return false;
            }
        } catch (AuthException $e) {
            $e->json();
        }

    }

    public static function setUser($user)
    {
        self::$user = $user;
    }

    public static function getAccount()
    {
        $url = parse_url(request()->header('Origin'));
        $account = Account::where('host', $url['host'])->first();

        if (!$account) {
            throw new ApiException('Извините, аккаунт не найден.' . $url['host']);
        }

        return $account;
    }

    public static function checkIsMethodAllow(): bool
    {
        $uri = parse_url(url()->current())['path'];
        $uri = str_replace('/api/', '', $uri);
        $uri = explode('/', $uri);

        $controllerName = $uri[0];
        $action = $uri[1];
        if ($action == 'action') {
            $action = $uri[2];
        }

        $controllerName = ucfirst(Stringer::snakeToCamel($controllerName)) . 'Controller';
        $controllerNs = 'App\Http\Controllers\\' . $controllerName;

        if (class_exists($controllerNs) && method_exists($controllerNs, 'authAllow')) {
            $allowMethods = $controllerNs::authAllow();

            if (in_array($action, $allowMethods)) {
                return true;
            }
        }
        return false;
    }

}
