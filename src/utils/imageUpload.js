export async function uploadImageToCloudinary(file) {
    const cloudName = import.meta.env.CLOUD_NAME;
    const unsignedPreset = "phonebook";

    const url = `https://api.cloudinary.com/v1_1/${cloudName}/upload`;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", unsignedPreset);
    formData.append('cloud_name', cloudName);

    const res = await fetch(url, {
        method: "POST",
        body: formData,
    });

    if (!res.ok) {
        const text = await res.text();
        throw new Error(`Upload failed: ${res.status} ${text}`);
    }

    const data = await res.json();
    return data.secure_url;
}