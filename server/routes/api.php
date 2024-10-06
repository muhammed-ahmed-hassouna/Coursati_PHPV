<?php

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\Facades\Request;

// RateLimiter::for('api', function (Request $request) {
//     return Limit::perMinute(60)->by($request->user()?->id ?: $request->ip());
// });

require base_path('routes/ApiRoutes/auth.php');
require base_path('routes/ApiRoutes/course.php');
require base_path('routes/ApiRoutes/firebase.php');


