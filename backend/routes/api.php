<?php

use App\Http\Controllers\FilmController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\Controller;
use App\Http\Controllers\SalleController;
use App\Http\Controllers\ForgotPasswordController;


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

Route::post('forgot-password', [ForgotPasswordController::class, 'submitForgetPasswordForm']); 
Route::get('reset-password/{token}', [ForgotPasswordController::class, 'showResetPasswordForm']);
Route::post('reset-password', [ForgotPasswordController::class, 'submitResetPasswordForm']);

route::get("/film",[FilmController::class,"index"]);
Route::get('/film/{id}', [FilmController::class,'show']);
Route::post('/film/add', [FilmController::class,"store"]);
Route::get('/film/{id}/edit', [FilmController::class,'edit']);
Route::put('/film/{id}', [FilmController::class,'update']);
Route::delete('/film/{id}', [FilmController::class,'destroy']);

Route::get('/salle',[SalleController::class,'index']);
Route::get('/salle/{id}',[SalleController::class,'show']);
Route::post('/salle/add',[SalleController::class,'store']);
Route::get('/salle/{id}/edit',[SalleController::class,'edit']);
Route::put('/salle/{id}',[SalleController::class,'update']);
Route::delete('/salle/{id}',[SalleController::class,'destroy']);

