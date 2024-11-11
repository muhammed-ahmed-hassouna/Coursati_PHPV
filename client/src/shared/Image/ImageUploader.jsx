import { useState } from "react";
import api from "../../configs/api";
import { FiUpload } from "react-icons/fi";

const ImageUploader = ({ onImageSelect, fieldPath }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0); 
  const [isUploading, setIsUploading] = useState(false); 

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);

      setIsUploading(true); 

      try {
        const response = await api.post(`/firebase/upload`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          
          onUploadProgress: (progressEvent) => {
            const progress = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setUploadProgress(progress);
          },
        });

        const imageUrl = response.data.fileUrl;
        setSelectedImage(imageUrl);
        onImageSelect(imageUrl, fieldPath);
      } catch (error) {
        console.error("Error uploading image:", error);
      } finally {
        setIsUploading(false); 
        setUploadProgress(0);
      }
    }
  };

  return (
    <div className="relative">
      <div className="mt-4 flex items-center">
        <label
          htmlFor={`imageInput_${fieldPath}`}
          className="cursor-pointer bg-orange-500 text-white hover:bg-orange-700 py-2 px-4 rounded inline-block flex items-center"
        >
          Choose Image
          <FiUpload className="ml-4" />
        </label>
        <input
          type="file"
          id={`imageInput_${fieldPath}`}
          className="hidden"
          accept="image/*"
          onChange={handleImageChange}
        />
      </div>

      {isUploading && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
          <div className="w-1/2 bg-white rounded shadow-lg p-6 flex flex-col items-center">
            <div className="w-full bg-gray-200 rounded">
              <div
                className="bg-green-500 text-xs font-medium text-center text-white py-1 leading-none rounded"
                style={{ width: `${uploadProgress}%` }}
              >
                {uploadProgress}%
              </div>
            </div>
            <p className="mt-4">Uploading... Please wait</p>
          </div>
        </div>
      )}

      {isUploading && (
        <div className="fixed inset-0 z-40 pointer-events-none" />
      )}
    </div>
  );
};

export default ImageUploader;
