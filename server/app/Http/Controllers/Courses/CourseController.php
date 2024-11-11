<?php

namespace App\Http\Controllers\Courses;

use App\Http\Controllers\Controller;
use App\Models\Courses;
use Illuminate\Http\Request;
use Exception;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Redis;

class CourseController extends Controller
{
    // Todo : Add if !value for each function

    function getAllCourses()
    {
        try {
            $courses = Cache::remember('all_courses', 60, function () {
                return Courses::with(['teacher' => function ($query) {
                    $query->select('id', 'username'); 
                }])->get()->toArray();
            });

            Cache::store('redis')->put('test_key', 'test_value', 3600);

            return response()->json(['data' => $courses], 200);
        } catch (Exception $e) {
            Log::error('Exception: ' . $e->getMessage());
            return response()->json(['error' => 'Internal Server Error', 'message' => $e->getMessage()], 500);
        }
    }

    function getCourseByTeacherId($id)
    {
        try {
            if (!$id) {
                return response()->json(['error' => 'Teacher ID is required'], 400);
            }

            $courses = Courses::getCourseByTeacherId($id);
            return response()->json(['data' => $courses], 200);
        } catch (Exception $e) {
            Log::error('Exception: ' . $e->getMessage());
            return response()->json(['error' => 'Internal Server Error', 'message' => $e->getMessage()], 500);
        }
    }

    function createCourse(Request $req)
    {
        try {
            $user = Auth::user();
            $validatedData = $req->validate([
                'course_name' => 'required|string|max:255',
                'description' => 'required|string|max:1000',
                'startDate' => 'required|date',
                'endDate' => 'required|date|after:startDate',
                'image' => 'required|string',
                'video' => 'required|string',
            ]);
            $validatedData['teacher_id'] = $user->id;

            $course = Courses::createCourse($validatedData);
            return response()->json(['data' => $course], 201);
        } catch (Exception $e) {
            Log::error('Exception: ' . $e->getMessage());
            return response()->json(['error' => 'Internal Server Error', 'message' => $e->getMessage()], 500);
        }
    }

    function updateCourse(Request $req, $courseId)
    {
        try {
            $validatedData = $req->validate([
                'course_name' => 'string|max:255',
                'description' => 'string|max:1000',
                'startDate' => 'date',
                'endDate' => 'date|after:startDate',
                'image' => 'string',
                'video' => 'string',
            ]);

            $course = Courses::findCourseById($courseId);

            $updatedCourse = Courses::updateCourse($validatedData, $course);

            return response()->json(['data' => $updatedCourse], 200);
        } catch (Exception $e) {
            Log::error('Exception: ' . $e->getMessage());
            return response()->json(['error' => 'Internal Server Error', 'message' => $e->getMessage()], 500);
        }
    }

    public function softDeleteCourse($courseId)
    {
        try {
            $course = Courses::findCourseById($courseId);

            Courses::softDeleteCourse($course);

            return response()->json(['message' => 'Course soft deleted successfully with id ' . $course->id], 200);
        } catch (Exception $e) {
            Log::error('Exception: ' . $e->getMessage());
            return response()->json(['error' => 'Internal Server Error', 'message' => $e->getMessage()], 500);
        }
    }
}
