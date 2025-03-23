<?php

namespace App\Http\Controllers;

use App\Http\Components\Auth\AuthBearer\AuthUser;
use App\Http\Components\Auth\AuthBearer\JwtToken;
use App\Http\Components\Auth\Authentication as Auth;
use App\Http\Components\Auth\AuthForm\AuthForm;
use App\Http\Components\JwtToken\JwtTokenBuilder;
use App\Http\Components\JwtToken\JwtTokenHandler;
use App\Http\Components\Mailer\Mailer;
use App\Http\Components\Mailer\MailMessage;
use App\Models\Account;
use App\Models\PasswordResetRequest;
use App\Models\User;
use App\Models\UsersInvitation;
use Carbon\Carbon;
use Illuminate\Support\Facades\Hash;
use App\Http\Components\Rest\Exceptions\ApiException;

class AuthController extends Controller
{

    private static $usernameFiled = 'username';

    /**
     * @throws ApiException
     */
    public static function login()
    {
        try {

            if (!request()->input(self::$usernameFiled) || !request()->input('password')) {
                throw new ApiException('Логин или пароль не указаны', 200);
            }

            $user = AuthForm::auth(request(), self::$usernameFiled);

            $tokens = self::createTokens($user);

            return response()->json([
                'data' => $tokens,
            ]);

        } catch (ApiException $e) {
            return $e->json();
        }
    }

    public static function createTokens(User $user, Account $account = null): array
    {
        $jwtTokenBuilder = new JwtTokenBuilder();
        $jwtTokenBuilder->setData([
            'id' => $user->id,
            'name' => $user->sur_name . ' ' . $user->first_name,
            'username' => $user->username,
            'post_name' => $user->post_name,
            'is_su' => $user->is_su,
            'club_id' => $user->club_id,
            'avatar' => $account?->avatar,
            'lang' => $user->lang,
            'accounts' => $user->accounts->toArray(),
            'account_id' => $account?->account_id,
            'account_alias' => $account?->alias,
        ]);

        $accessToken = $jwtTokenBuilder->createAccessToken();//$account
        $refreshToken = $jwtTokenBuilder->createRefreshToken();

        return [
            'accessToken' => $accessToken,
            'refreshToken' => $refreshToken,
        ];
    }

    public function switchAccount()
    {
        try {

            if (!JwtTokenHandler::checkIsValid(Auth::$accessToken)) {
                throw new ApiException('Invalid access token', 401);
            }

//            if (JwtTokenHandler::checkIsExpired(Auth::$accessToken)) {
//                throw new ApiException('Access token expired', 401);
//            }

//            $currentRT = request()->input('refresh_token');
//            if (JwtTokenHandler::checkIsExpiredRefreshToken($currentRT)) {
//                throw new ApiException('Refresh token not found or expired', 401);
//            }

            $accountId = request()->input('account_id');
            if (!$accountId) {
                throw new ApiException('Account id not received', 401);
            }
            $account = Account::find($accountId);
            $payload = JwtTokenHandler::getPayload(Auth::$accessToken);
            $payload->account_id = $account->id;
            $payload->account_alias = $account->alias;

            $jwtTokenBuilder = new JwtTokenBuilder();
            $jwtTokenBuilder->setData($payload);

            $accessToken = $jwtTokenBuilder->createAccessToken();

            return [
                'access_token' => $accessToken,
            ];

        } catch (ApiException $e) {

        }
    }

    private static function checkPasswordFormat($password)
    {
        // TODO проверка на русские символы и пробелы
        if (strlen($password) < 5) {
            throw new ApiException('Длина пароля должна быть больше 5 символов');
        }
    }

    private static function setTokenAccountsList(User &$user): void
    {
        $accounts = [];
        foreach ($user->accounts as $key => $account) {
            $accounts[$key]['id'] = $account->id;
            $accounts[$key]['alias'] = $account->alias;
        }
        $user->accountsList = $accounts;
    }

    public function refreshToken()
    {

    }

    public static function resetPasswordByEmail()
    {
        try {

            $email = request()->input('email');

            if (!$email) {
                throw new ApiException("Please, set the Email");
            }

            $user = User::where('email', $email)->first();

            if (!$user) {
                throw new ApiException("Sorry, record not found");
            }

            $code = random_int(100000, 999999);

            $requestRecord = PasswordResetRequest::create([
                'user_id' => $user->id,
                'email' => $email,
                'code' => $code,
                'expired_at' => Carbon::now()->addHour(),
                'by_email_flg' => 1,
            ]);

            MailMessage::init()
                ->setTo($email)
                ->setData($requestRecord)
                ->setTemplateId(29)
                ->send();

            return response()->json([
                'data' => [],
            ]);


        } catch (ApiException $e) {
            $e->json();
        }
    }

    public static function resetPassword(): void
    {
        try {

            $code = request()->input('code');
            if (!$code) {
                throw new ApiException("Please, enter the code");
            }

            $requestRecord = PasswordResetRequest::where('code', $code)
                ->where('created_at', '>=', Carbon::now()->subHour())
                ->first();

            if (!$requestRecord) {
                throw new ApiException("Your code expired or not valid");
            }

            $password = request()->input('password');
            if (!$password) {
                throw new ApiException("Please, enter the new password");
            } elseif ($password != request()->input('password_confirm')) {
                throw new ApiException("Password and confirm password do not match");
            }

            $user = User::where('email', $requestRecord->email)->first();
            $user->password = password_hash($password, PASSWORD_BCRYPT);
            $user->update();

            $requestRecord->delete();

        } catch (ApiException $e) {
            $e->json();
        }
    }

}
