import { v2 as cloudinary } from 'cloudinary';
import fs from 'node:fs'

cloudinary.config({
    cloud_name: 'dbcezfmni',
    api_key: '337992458282776',
    api_secret: 'Hu0wp9d5E9qGo8QRec90xAMegQM'
});

const uploadUsingCloudinary = async (localFilePath) => {
    try {
        if(!localFilePath) return null
        const response=await cloudinary.uploader.upload(localFilePath,
        {resource_type:"auto"});
        console.log("File uplaoded on Cloudinary",response.url)
        return response;
    } catch (error) {
        fs.unlinkSync(localFilePath); //remove the temporary file from the server
        return null;
    }
}
export {uploadUsingCloudinary}