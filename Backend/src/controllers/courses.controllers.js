import { pool } from "../config/db.js";
import {cloudinary} from "../config/cloudinary.js";
import multer from "multer";
import { asyncHandler } from "../utils/asyncHandler.js";

// ⚡ Multer setup for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage });


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

// 📌 Upload Course API
export const createCourse = async (req, res) => {
    try {
      const { tutor_id, title, description, resource_links } = req.body;
      const thumbnail = req.files?.thumbnail;
      const video = req.files?.video;
  
      if (!tutor_id || !title || !description) {
        return res.status(400).json({ message: "All fields are required!" });
      }
  
      let thumbnailUrl = null;
      let videoUrl = null;
  
      // ✅ Upload Thumbnail
      if (thumbnail) {
        const uploadedThumbnail = await cloudinary.uploader.upload(thumbnail.tempFilePath, { folder: "thumbnails" });
        thumbnailUrl = uploadedThumbnail.secure_url;
      }
  
      // ✅ Upload Video
      if (video) {
        const uploadedVideo = await cloudinary.uploader.upload(video.tempFilePath, { resource_type: "video", folder: "videos" });
        videoUrl = uploadedVideo.secure_url;
      }
  
      // ✅ Save in MySQL
      const [result] = await pool.execute(
        "INSERT INTO courses (tutor_id, title, description, resource_links, thumbnail_url, video_url) VALUES (?, ?, ?, ?, ?, ?)",
        [tutor_id, title, description, resource_links, thumbnailUrl, videoUrl]
      );
  
      res.status(201).json({ message: "Course created!", courseId: result.insertId });
  
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  };