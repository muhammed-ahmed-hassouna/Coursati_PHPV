import { useState, useRef } from "react";
import api from "../../configs/api";
import { FiUpload, FiX } from "react-icons/fi";

const VideoUploader = ({ onVideoSelect }) => {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0); 
  const [isUploading, setIsUploading] = useState(false); 
  const abortControllerRef = useRef(null);

  const handleVideoChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);

      abortControllerRef.current = new AbortController();

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
          signal: abortControllerRef.current.signal, 
        });

        const videoUrl = response.data.fileUrl;
        setSelectedVideo(videoUrl);
        onVideoSelect(videoUrl);
      } catch (error) {
        if (error.name === "AbortError") {
          console.log("Upload canceled");
        } else {
          console.error("Error uploading video:", error);
        }
      } finally {
        setIsUploading(false); 
        setUploadProgress(0); 
      }
    }
  };

  const handleCancelUpload = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      setIsUploading(false);
      setUploadProgress(0); 
    }
  };

  return (
    <div className="relative">
      <div className="mt-4 flex items-center">
        <label
          htmlFor="videoInput"
          className="cursor-pointer bg-orange-500 text-white hover:bg-orange-700 py-2 px-4 rounded inline-block flex items-center"
        >
          Choose Video
          <FiUpload className="ml-4" />
        </label>
        <input
          type="file"
          id="videoInput"
          className="hidden"
          accept="video/*"
          onChange={handleVideoChange}
        />
      </div>

      {isUploading && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex flex-col items-center justify-center z-50">
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
            <button
              onClick={handleCancelUpload}
              className="mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded flex items-center"
            >
              Cancel Upload
              <FiX className="ml-2" />
            </button>
          </div>
        </div>
      )}

      {isUploading && <div className="fixed inset-0 z-40 pointer-events-none" />}
    </div>
  );
};

export default VideoUploader;
