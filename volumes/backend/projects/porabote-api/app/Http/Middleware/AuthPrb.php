<?php

namespace App\Http\Middleware;

use App\Http\Components\Rest\Exceptions\ApiException;
use Closure;
use Illuminate\Http\Request;
use App\Http\Components\Auth\Authentication;

class AuthPrb
{
    private $clientId = null;

    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next)
    {
        try {
            Authentication::authenticate($request);
        } catch (ApiException $e) {
            $e->json(401);
        }

        return $next($request);
    }
}
