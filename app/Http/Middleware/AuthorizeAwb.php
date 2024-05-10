<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class AuthorizeAwb
{
    /**
     * Handle an incoming request.
     *
     * @param \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if ($request->route()->parameter('awb')->user->id !== $request->user()->id) {
            return redirect('/')->with('error', "You can't issue actions on this AWB since you don't own it.");
        }
        return $next($request);
    }
}
