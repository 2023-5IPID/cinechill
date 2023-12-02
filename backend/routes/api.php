<?php

use App\Http\Controllers\FilmController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\Controller;
use App\Http\Controllers\SalleController;
use App\Http\Controllers\SeanceController;


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
Route::post('/logout', [AuthController::class, 'logout']);


Route::get("/film", [FilmController::class, "index"]);
Route::get('/film/{id}', [FilmController::class, 'show']);
Route::post('/film/add', [FilmController::class, "store"]);
Route::get('/film/{id}/edit', [FilmController::class, 'edit']);
Route::put('/film/{id}', [FilmController::class, 'update']);
Route::delete('/film/{id}', [FilmController::class, 'destroy']);

Route::get('/salle', [SalleController::class, 'index']);
Route::get('/salle/{id}', [SalleController::class, 'show']);
Route::post('/salle/add', [SalleController::class, 'store']);
Route::get('/salle/{id}/edit', [SalleController::class, 'edit']);
Route::put('/salle/{id}', [SalleController::class, 'update']);
Route::delete('/salle/{id}', [SalleController::class, 'destroy']);

Route::get('/seance', [SeanceController::class, 'index']);
Route::get('/seance/{id}', [SeanceController::class, 'show']);
Route::post('/seance/add', [SeanceController::class, 'store']);
Route::put('/seance/{id}', [SeanceController::class, 'update']);
Route::delete('/seance/{id}', [SeanceController::class, 'destroy']);

Route::get('/user', [AuthController::class, 'index']);