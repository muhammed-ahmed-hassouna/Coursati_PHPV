<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class AuthController extends Controller
{
    function register(Request $req)
    {
        try {
            if (User::checkEmail($req->email)) {
                return response()->json(['message' => 'Email Already Exists'], 400);
            }

            $validatedData = $req->validate([
                'username' => 'required|string|max:20',
                'email' => 'required|string|email|max:40|unique:users',
                'password' => 'required|string|max:20',
                'role' => 'required|string|in:Teacher,Student',
            ]);

            $user = User::register($validatedData);
            $token = $user->createToken('token', ['*'], now()->addHours(6))->plainTextToken;

            return response()->json([
                'message' => 'User added Successfully',
                'userID' => $user->id,
                'role' => $user->role,
                'access_token' => $token,
            ], 201);
        } catch (Exception $e) {
            Log::error('Exception: ' . $e->getMessage());
            return response()->json(['error' => 'Internal Server Error', 'message' => $e->getMessage()], 500);
        }
    }

    function login(Request $req)
    {
        try {
            $validatedData = $req->validate([
                'email' => 'required|string|email|max:40',
                'password' => 'required|string|max:20',
            ]);

            $email = $validatedData['email'];

            $user = User::checkEmail($email);
            if (!$user || !User::checkPassword($req->password, $user->password)) {
                return response()->json(['message' => 'Invalid Email or Password'], 400);
            }

            $token = $user->createToken('token', ['*'], now()->addHours(6))->plainTextToken;
            return response()->json([
                'message' => 'Logged In Successfully !',
                'userID' => $user->id,
                'role' => $user->role,
                'access_token' => $token,
            ], 200);
        } catch (Exception $e) {
            Log::error('Exception: ' . $e->getMessage());
            return response()->json(['error' => 'Internal Server Error', 'message' => $e->getMessage()], 500);
        }
    }
}
