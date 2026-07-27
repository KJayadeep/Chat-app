import * as cloudinaryModule from "cloudinary";

const cloudinary = cloudinaryModule.v2 || cloudinaryModule.default || cloudinaryModule;

cloudinary.config({
    cloud_name: process.env.Cloudinary_cloud_name,
    api_key: process.env.Cloudinary_api_key,
    api_secret: process.env.Cloudinary_api_secret,
});

export const uploader = cloudinary.uploader;
export default cloudinary;