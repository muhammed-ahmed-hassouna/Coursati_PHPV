<?php

use App\Http\Controllers\Firebase\UploadController;
use Illuminate\Support\Facades\Route;

Route::prefix('firebase')->middleware(['auth:sanctum'])->group(function () {
    Route::middleware(['role:Teacher'])->group(function () {
        Route::post('/upload', [UploadController::class, 'uploadFile']);
    });
});
