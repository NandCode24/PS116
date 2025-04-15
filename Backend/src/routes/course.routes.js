import express from "express";
import {pool} from "../config/db.js"
import { createCourse } from "../controllers/courses.controllers.js";

const router = express.Router();

// Define routes
router.post("/create", createCourse);

router.get("/tutor/:tutorId", (req, res) => {
    const { tutorId } = req.params;
    const query = "SELECT * FROM courses WHERE tutor_id = ?";
  
    pool.query(query, [tutorId], (err, results) => {
      if (err) {
        console.error("Error fetching tutor courses:", err);
        return res.status(500).json({ message: "Internal Server Error" });
      }
      res.status(200).json(results);
    });
  });

export default router;
