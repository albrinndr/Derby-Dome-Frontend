import React, { useState } from 'react';
import axios from 'axios';

const ImageTest: React.FC = () => {
    const [selectedFile, setSelectedFile] = useState<File | null>();

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            setSelectedFile(event.target.files[0]);
        }
    };

    const uploadImageToCloudinary = async (imageFile: File | null) => {
        try {
            if (imageFile) {
                const clubLogo = new FormData();
                clubLogo.append('file', imageFile);
                clubLogo.append('upload_preset', 'zpxlk0ib');
                clubLogo.append('folder', 'logo');
                const response = await axios.post(
                    `https://api.cloudinary.com/v1_1/dcgwujg63/image/upload`,
                    clubLogo
                );

                // console.log(response.data);
                return response.data.secure_url;
            }
        } catch (error) {
            console.error('Error uploading image to Cloudinary:', error);
        }
    };


    const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (selectedFile) {
            const data = await uploadImageToCloudinary(selectedFile);
            console.log(data);
        }
    };

    return (
        <form onSubmit={handleFormSubmit}>
            <input type="file" onChange={handleFileChange} />
            <button type="submit">Upload</button>
        </form>
    );
};

export default ImageTest;
