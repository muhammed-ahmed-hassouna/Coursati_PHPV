import { useState } from "react";
import api from "../../configs/api";
import { FiSave, FiUpload } from "react-icons/fi";

const VideoUploader = ({ onVideoSelect }) => {
  const [selectedVideo, setSelectedVideo] = useState(null);

  const handleVideoChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);

      try {
        const response = await api.post(`/firebase/upload`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        const videoUrl = response.data.fileUrl;
        setSelectedVideo(videoUrl);
        onVideoSelect(videoUrl);
      } catch (error) {
        console.error("Error uploading video:", error);
      }
    }
  };

  return (
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
  );
};

export default VideoUploader;
