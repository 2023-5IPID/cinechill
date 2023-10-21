<?php

use App\Http\Controllers\filmController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {return view('welcome');});


// route::get("index",[FilmController::class,"index"]);
// Route::get('/{id}', [FilmController::class,'show']);
// Route::post('/', [FilmController::class,"store"]);
// Route::get('/{id}/edit', [FilmController::class,'edit']);
// Route::put('/{id}', [FilmController::class,'update']);
// Route::delete('/{id}', [FilmController::class,'destroy']);