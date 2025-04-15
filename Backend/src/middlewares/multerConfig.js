import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { cloudinary } from "../config/cloudinary.js";

// 🔹 Configure Storage for Videos & Thumbnails
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    let folder = file.mimetype.startsWith("image/") ? "course_thumbnails" : "course_videos";
    return {
      folder,
      resource_type: file.mimetype.startsWith("image/") ? "image" : "video",
    };
  },
});

// 🔹 Multer Middleware for multiple files
const upload = multer({ storage }).fields([
  { name: "thumbnail", maxCount: 1 },
  { name: "video", maxCount: 1 }
]);

export { upload };
