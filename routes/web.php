<?php

use App\Http\Controllers\AwbController;
use App\Http\Controllers\ProfileController;
use App\Http\Middleware\AuthorizeAwb;
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

Route::get('/', function () {
    return redirect('/dashboard');
});

Route::get('/dashboard', [AwbController::class, 'index'])->middleware(['auth', 'verified'])->name('dashboard');
Route::get('/awb/create', [AwbController::class, 'create'])->middleware(['auth', 'verified'])->name('awb.create');
Route::get('/awb/show/{awb}', [AwbController::class, 'show'])->middleware(['auth', 'verified', 'authorizeawb'])->name('awb.show');
Route::post('/awb/store' , [AwbController::class, 'store'])->middleware(['auth', 'verified'])->name('awb.store');
Route::get('/awb/delete/{awb}', [AwbController::class, 'delete'])->middleware(['auth', 'verified', 'authorizeawb'])->name('awb.delete');

Route::get('/check/{awb}', [\App\Http\Controllers\AwbChecker::class, 'check'])->middleware(['auth', 'verified']);
Route::get('/checkall', [\App\Http\Controllers\AwbChecker::class, 'checkall'])->middleware(['auth', 'verified']);

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
