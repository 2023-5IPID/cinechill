<?php

use App\Http\Controllers\FilmController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;

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

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', [AuthController::class, 'user']);
});

Route::prefix('api/films')->group(function () {
    Route::get('/', 'FilmsController@index');
    Route::post('/', 'FilmsController@store');
    Route::get('/{id}', 'FilmsController@show');
    Route::get('/{id}/edit', 'FilmsController@edit');
    Route::put('/{id}', 'FilmsController@update');
    Route::delete('/{id}', 'FilmsController@destroy');
});
