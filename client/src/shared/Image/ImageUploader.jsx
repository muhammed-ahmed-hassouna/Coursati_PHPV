import { useState } from 'react';
import api from '../../configs/api';
import { FiSave, FiUpload } from "react-icons/fi";

const ImageUploader = ({ onImageSelect, fieldPath }) => {
    const [selectedImage, setSelectedImage] = useState(null);

    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            const formData = new FormData();
            formData.append('file', file);

            try {
                const response = await api.post(`/firebase/upload`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });

                console.log('res from imageupload', response);
                
                const imageUrl = response.data.fileUrl;
                setSelectedImage(imageUrl);
                onImageSelect(imageUrl, fieldPath);
            } catch (error) {
                console.error('Error uploading image:', error);
            }
        }
    };

    return (
        <div className="mt-4 flex items-center">
            <label htmlFor={`imageInput_${fieldPath}`} className="cursor-pointer bg-orange-500 text-white hover:bg-orange-700 py-2 px-4 rounded inline-block flex items-center"> {/* Apply flex to align label contents */}
                Choose Image
                <FiUpload className='ml-4' />
            </label>
            <input
                type="file"
                id={`imageInput_${fieldPath}`}
                className="hidden"
                accept="image/*"
                onChange={handleImageChange}
            />
        </div>
    );
    
};

export default ImageUploader;
