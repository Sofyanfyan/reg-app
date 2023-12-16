<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Symfony\Component\HttpFoundation\Response;

class EnsureTokenEmailIsValid
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if(!auth()->guard('api')->check()){
            return response()->json([
                'code' => 401,
                'msg' => 'Invalid token',
            ]);
        } else if (auth()->guard('api')->user() && !auth()->guard('api')->user()->email_verified_at) {
            return response()->json([
                'code' => 401,
                'msg' => 'Email not verified',
            ]);
        }
        
        return $next($request);
    }
}
