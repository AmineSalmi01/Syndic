<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ResidentController;
use App\Http\Controllers\Annoncce;

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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('login', [AuthController::class, 'login']);
Route::post('register', [AuthController::class, 'register']);
Route::post('/residents', [ResidentController::class, 'selectResdent']);
Route::get('/residents/{id}', [ResidentController::class, 'residentProfile']);
Route::post('residentRegister', [AuthController::class,'residentRegister']);



Route::get('SyndicID/{id}', [AuthController::class,'getSyndic']);
Route::get('annonce', [Annoncce::class,'selectAnonnce']);
Route::delete('annonce/{id}', [Annoncce::class,'deleteAnonnce']);
Route::put('annonce/{id}', [Annoncce::class,'favouris']);


