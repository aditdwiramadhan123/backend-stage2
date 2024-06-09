import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
export default async function uploadCloudinary(image: string) {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

  const upload = await cloudinary.uploader.upload(image, {
    folder: "circle-folder",
  });

  fs.unlink(image, (err) => {
    if (err) {
      console.error("Error while deleting image:", err);
    }
  });
  return upload;
}
