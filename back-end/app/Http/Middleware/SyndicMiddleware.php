<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use App\Models\Syndic;
use Illuminate\Http\RedirectResponse;

class SyndicMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $syndic = $request->user();
        if($syndic && $syndic->isSyndic()){
            return $next($request);
        }

       return response()->json('not done');
    }
}
