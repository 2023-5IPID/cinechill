<?php

use App\Http\Controllers\FilmController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\Controller;
use App\Http\Controllers\SalleController;
use App\Http\Controllers\SeanceController;
use App\Http\Controllers\EmployerController;
use App\Http\Controllers\ReservationController;


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

Route::get('/employers', [EmployerController::class, 'index']);
Route::post('/employers/add', [EmployerController::class, 'store']);
Route::get('/employers/{id}', [EmployerController::class, 'show']);
Route::put('/employers/{id}', [EmployerController::class, 'update']);
Route::delete('/employers/{id}', [EmployerController::class, 'destroy']);

Route::get('/employers/{employerId}/absences', [EmployerController::class, 'showAbsences']);
Route::get('/employers/absences/index', [EmployerController::class, 'indexAbsence']);
Route::post('/employers/{employerId}/absences', [EmployerController::class, 'storeAbsence']);
Route::put('/employers/absences/{absenceId}', [EmployerController::class, 'updateAbsence']);
Route::delete('/employers/{employerId}/absences/{absenceId}', [EmployerController::class, 'destroyAbsence']);

Route::get('/reservation', [ReservationController::class, 'index']);
Route::get('/reservation/{id}', [ReservationController::class, 'show']);
Route::get('/reservation/where/{id}', [ReservationController::class, 'where']);
Route::post('/reservation/add/{id}', [ReservationController::class, 'store']);
Route::put('/reservation/{id}', [ReservationController::class, 'update']);
Route::delete('/reservation/{id}', [ReservationController::class, 'destroy']);

