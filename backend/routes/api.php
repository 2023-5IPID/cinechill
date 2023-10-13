<?php

use App\Http\Controllers\FilmController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\Controller;

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

// Route::prefix('api/films')->group(function () {
//     Route::get('/', 'filmController@index');
//     Route::post('/', 'filmController@store');
//     Route::get('/{id}', 'filmController@show');
//     Route::get('/{id}/edit', 'filmController@edit');
//     Route::put('/{id}', 'filmController@update');
//     Route::delete('/{id}', 'filmController@destroy');
// });

route::get("index",[FilmController::class,"index"]);
Route::post('/', [FilmController::class,"store"]);
Route::get('/{id}', [FilmController::class,'show']);
Route::get('/{id}/edit', [FilmController::class,'edit']);
Route::put('/{id}', [FilmController::class,'update']);
Route::delete('/{id}', [FilmController::class,'destroy']);