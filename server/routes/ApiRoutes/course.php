<?php

use App\Http\Controllers\Courses\CourseController;
use Illuminate\Support\Facades\Route;

Route::prefix('course')->middleware(['auth:sanctum'])->group(function () {
    // Routes for Both
    Route::middleware(['role:Teacher,Student'])->group(function () {
        Route::get('/getAllCourses', [CourseController::class, 'getAllCourses']);
        Route::get('/getCourseByTeacherId', [CourseController::class, 'getCourseByTeacherId']);
    });

    // Routes for Teachers
    Route::middleware(['role:Teacher'])->group(function () {
        Route::post('/addCourse', [CourseController::class, 'addCourse']);
        Route::patch('/updateCourse', [CourseController::class, 'updateCourse']);
        Route::put('/softDeleteCourse', [CourseController::class, 'softDeleteCourse']);
        Route::post('/uploadFile', [CourseController::class, 'uploadFile']);
    });
});
