import axios from 'axios';

export async function uploadImageToCloudinary(file) {
    const cloudName = import.meta.env.VITE_CLOUD_NAME;
    const unsignedPreset = import.meta.env.VITE_UNSIGNED_PRESET;

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', unsignedPreset);

    const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        formData
    );

    return response.data.secure_url;
}