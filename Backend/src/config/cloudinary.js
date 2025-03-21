import { v2 as cloudinary } from "cloudinary";
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Multer Storage for Images (Thumbnails)
const imageStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "course_thumbnails",
    allowed_formats: ["jpg", "jpeg", "png"],
  },
});

// Multer Storage for Videos
const videoStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "course_videos",
    resource_type: "video",
    allowed_formats: ["mp4", "mov", "avi"],
  },
});

const uploadImage = multer({ storage: imageStorage });
const uploadVideo = multer({ storage: videoStorage });

export { cloudinary, uploadImage, uploadVideo };
