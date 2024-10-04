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

    function getCourseByTeacherId()
    {
        try {
           
        } catch (Exception $e) {
            Log::error('Exception: ' . $e->getMessage());
            return response()->json(['error' => 'Internal Server Error', 'message' => $e->getMessage()], 500);
        }
    }

    function addCourse(Request $req)
    {
        try {
            $user = Auth::user();
            $validatedData = $req->validate([
                'course_name' => 'required|string|max:255', 
                'description' => 'required|string|max:1000', 
                'startDate' => 'required|timestamp', 
                'endDate' => 'required|timestamp|after:startDate', 
                'image' => 'required|string', 
                'video' => 'required|string',
            ]);
            $validatedData['teacher_id'] = $user->id;
            
            $course = Courses::addCourse($validatedData);
            return response()->json(['data' => $course], 201);
        } catch (Exception $e) {
            Log::error('Exception: ' . $e->getMessage());
            return response()->json(['error' => 'Internal Server Error', 'message' => $e->getMessage()], 500);
        }
    }
}
