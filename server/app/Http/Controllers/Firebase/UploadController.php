<?php

namespace App\Http\Controllers\Firebase;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Services\FirebaseService;
use Exception;

class UploadController extends Controller
{
    protected $firebaseService;

    public function __construct(FirebaseService $firebaseService)
    {
        $this->firebaseService = $firebaseService;
    }

    public function uploadFile(Request $request)
    {
        try {
            if (!$request->hasFile('file')) {
                return response()->json(['message' => 'No file uploaded'], 400);
            }

            $file = $request->file('file');
            $fileName = time() . '_' . $file->getClientOriginalName();

            $fileUrl = $this->firebaseService->uploadFileToFirebase($file, $fileName);

            return response()->json(['fileUrl' => $fileUrl], 200);
        } catch (Exception $e) {
            return response()->json(['message' => 'Failed to upload file', 'error' => $e->getMessage()], 500);
        }
    }
}
