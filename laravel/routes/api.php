<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

Route::resource('tasks', \App\Http\Controllers\TaskController::class);
Route::resource('users', \App\Http\Controllers\UserController::class)->only('index');
Route::resource('states', \App\Http\Controllers\StateController::class)->only('index');
