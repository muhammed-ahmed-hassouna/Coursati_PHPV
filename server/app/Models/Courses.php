<?php

namespace App\Models;

use Exception;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Courses extends Model
{
    use HasFactory;
    use SoftDeletes;
    protected $table = 'Courses';

    protected $fillable = [
        'course_name',
        'description',
        'startDate',
        'endDate',
        'image',
        'video',
        'teacher_id',
    ];

    protected static function getAllCourses()
    {
        try {
            return self::all();
        } catch (Exception $e) {
            throw $e;
        }
    }

    protected static function getCourseByTeacherId($id)
    {
        try {
            return self::where('teacher_id', $id)->get();
        } catch (Exception $e) {
            throw $e;
        }
    }

    protected static function createCourse($course)
    {
        try {
            return self::create($course);
        } catch (Exception $e) {
            throw $e;
        }
    }

    // Utility Function for separation
    protected static function findCourseById($id)
    {
        try {
            return self::findOrFail($id);
        } catch (Exception $e) {
            throw $e;
        }
    }

    protected static function updateCourse($validatedData, $course)
    {
        $course->update($validatedData);

        return $course;
    }
    
    protected static function test()
    {
        try {
            return;
        } catch (Exception $e) {
            throw $e;
        }
    }
}
