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

    protected static function getCourseByTeacherId()
    {
        try {
            return ;
        } catch (Exception $e) {
            throw $e;
        }
    }

    protected static function addCourse($course)
    {
        try {
            return self::create($course);
        } catch (Exception $e) {
            throw $e;
        }
    }
}
