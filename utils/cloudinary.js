import { v2 as cloudinary } from 'cloudinary';
import fs from 'node:fs'
import dotenv from 'dotenv'
dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadUsingCloudinary = async (localFilePath) => {
    try {
        if(!localFilePath) return null
        const response=await cloudinary.uploader.upload(localFilePath,
        {resource_type:"auto"});
        fs.unlinkSync(localFilePath);
        return response;
    } catch (error) {
        fs.unlinkSync(localFilePath); //remove the temporary file from the server
        return null;
    }
}
export {uploadUsingCloudinary}