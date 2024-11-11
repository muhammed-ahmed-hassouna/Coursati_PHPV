<?php

namespace App\Services;

use Illuminate\Support\Facades\Log;
use Kreait\Firebase\Factory;

class FirebaseService
{
    protected $storage;
    protected $bucket;

    public function __construct()
    {
        $factory = (new Factory)->withServiceAccount(storage_path('app/firebase-service-account.json'));

        $this->storage = $factory->createStorage();
        $this->bucket = $this->storage->getBucket();
    }

    public function uploadFileToFirebase($file, $fileName)
    {
        $filePath = $file->getRealPath();
        $fileUpload = $this->bucket->upload(fopen($filePath, 'r'), [
            'name' => $fileName
        ]);

        return $this->getFileUrl($fileName);
    }

    private function getFileUrl($fileName)
    {
        $bucketName = env('FIREBASE_STORAGE_BUCKET');

        $publicUrl = 'https://firebasestorage.googleapis.com/v0/b/'. $bucketName . '/o/' . urlencode($fileName) . '?alt=media';
        
        return $publicUrl;
    }
}
