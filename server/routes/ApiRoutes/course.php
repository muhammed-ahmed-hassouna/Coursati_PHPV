<?php

use App\Http\Controllers\Courses\CourseController;
use Illuminate\Support\Facades\Route;

Route::prefix('course')->middleware(['auth:sanctum'])->group(function () {
    // Routes for Both
    Route::middleware(['role:Teacher,Student'])->group(function () {
        Route::get('/getAllCourses', [CourseController::class, 'getAllCourses']);
        Route::get('/getCourseByTeacherId/{id}', [CourseController::class, 'getCourseByTeacherId']);
    });

    // Routes for Teachers
    Route::middleware(['role:Teacher'])->group(function () {
        Route::post('/createCourse', [CourseController::class, 'createCourse']);
        Route::patch('/updateCourse/{id}', [CourseController::class, 'updateCourse']);
        Route::put('/softDeleteCourse', [CourseController::class, 'softDeleteCourse']);
        Route::post('/uploadFile', [CourseController::class, 'uploadFile']);
    });
});
