<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\BarbershopController;
use App\Http\Controllers\SearchController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\BarberController;
use App\Http\Controllers\ServiceController;
use App\Http\Controllers\BookerController;
use App\Http\Controllers\BookingController;

Route::get('/search', [SearchController::class, 'search']);
Route::get('/barbershops', [BarbershopController::class, 'all']);
Route::get('/barbershop/{id}', [BarbershopController::class, 'show']);
Route::get('/barbers', [BarberController::class, 'all']);
Route::get('/barber/{id}', [BarberController::class, 'show']);
Route::get('/barber/{id}/bookings', [BarberController::class, 'bookings']);
Route::get('/services', [ServiceController::class, 'all']);
Route::get('/service/{id}', [ServiceController::class, 'show']);
Route::prefix('bookers')->group(function () {
    Route::get('/', [BookerController::class, 'all']);
    Route::get('/{id}', [BookerController::class, 'show']);
    Route::post('/', [BookerController::class, 'store']);
    Route::delete('/{id}', [BookerController::class, 'destroy']);
});
Route::prefix('bookings')->group(function () {
    Route::get('/', [BookingController::class, 'all']);
    Route::get('/{id}', [BookingController::class, 'show']);
    Route::post('/', [BookingController::class, 'store']);
    Route::delete('/{id}', [BookingController::class, 'destroy']);
});

// Updated Barbershop-related routes
//Route::post('/addBarbershop', [BarbershopController::class, 'add']);
//Route::get('/barbershop/{id}/barbers', [BarberController::class, 'add']);
//Route::post('/barbershop/{id}/services', [ServiceController::class, 'add']);

// User-related routes
//Route::get('/loginUser', [UserController::class, 'loginUser']);
//Route::post('/registerUser', [UserController::class, 'registerUser']);


//Route::get('/login', function () {
//    // Handle login logic or return a response
//})->name('login');
//
//Route::get('/login', [LoginController::class, 'showLoginForm'])->name('login');


// Authenticated routes (protected by Sanctum)

//Route::middleware(['auth:sanctum'])->group(function () {
//    Route::get('/user', function (Request $request) {
//        return $request->user();
//    });
//});
//Route::middleware(['auth:sanctum'])->group(function () {
//    Route::get('/user-info', [UserController::class, 'getUserInfo']);
//    Route::post('/user-info', [UserController::class, 'getUserInfo']);
//});
