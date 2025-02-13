<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;

use Exception;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\Hash;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;
    use SoftDeletes;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $table = 'users';
    protected $fillable = [
        'username',
        'email',
        'password',
        'role',
    ];

    protected static function register($user)
    {
        try {
            $createdUser = self::create($user);

            return $createdUser;
        } catch (Exception $e) {
            throw $e;
        }
    }

    protected static function checkEmail($email)
    {
        try {
            $checkEmail = self::where('email', $email)->first();

            return $checkEmail;
        } catch (Exception $e) {
            throw $e;
        }
    }

    protected static function checkPassword($password, $hashedPass)
    {
        try {
            $checkPass = Hash::check($password, $hashedPass);
            return $checkPass;
        } catch (Exception $e) {
            throw $e;
        }
    }



    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];
}
