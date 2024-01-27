<?php

use App\Http\Controllers\Authentication\UserController;
use App\Http\Controllers\GradeController;
use App\Http\Controllers\Register\RegisterController;
use App\Http\Controllers\Users\StudentContoller;
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


Route::post('/register', [UserController::class, 'register']);
Route::post('/login', [UserController::class, 'login']);

Route::middleware(['auth.guard'])->prefix('users')->group(function () {
    Route::post('email-verifications', [UserController::class, 'verification']);
    Route::post('/resend-emails', [UserController::class, 'resendEmail']);
});

Route::middleware(['email.verified'])->prefix('auth')->group(function () {
    // Route::post('dashboard', [UserController::class, 'test']);
    Route::get('dashboard', [StudentContoller::class, 'index']);
    
    Route::post('logout', [UserController::class, 'logout']);

    Route::prefix('checks')->group(function () {
        Route::post('students', [RegisterController::class, 'checkFieldStudent']);
        Route::post('parents', [RegisterController::class, 'checkFieldParent']);
    });
    
    Route::post('registers/students', [RegisterController::class, 'register']);

    Route::prefix('grades')->group(function () {
        Route::get('/', [GradeController::class, 'getAll']);
    });
});

