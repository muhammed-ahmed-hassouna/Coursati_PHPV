<?php

namespace App\Http\Controllers\Courses;

use App\Http\Controllers\Controller;
use App\Models\Courses;
use Illuminate\Http\Request;
use Exception;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class CourseController extends Controller
{
    function getAllCourses()
    {
        try {
            $courses = Courses::getAllCourses();
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

    function updateCourse(Request $req, $courseID)
    {
        try {
            $validatedData = $req->validate([
                'course_name' => 'sometimes |string|max:255',
                'description' => 'sometimes |string|max:1000',
                'startDate' => 'sometimes |date',
                'endDate' => 'sometimes |date|after:startDate',
                'image' => 'sometimes |string',
                'video' => 'sometimes |string',
            ]);

            $course = Courses::findCourseById($courseID);
            
            $updatedCourse = Courses::updateCourse($validatedData, $course);
           
            return response()->json(['data' => $updatedCourse], 200);
        } catch (Exception $e) {
            Log::error('Exception: ' . $e->getMessage());
            return response()->json(['error' => 'Internal Server Error', 'message' => $e->getMessage()], 500);
        }
    }

    function test()
    {
        try {
        } catch (Exception $e) {
            Log::error('Exception: ' . $e->getMessage());
            return response()->json(['error' => 'Internal Server Error', 'message' => $e->getMessage()], 500);
        }
    }
}
