import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import studentRouter from "./routes/student.routes.js";
import tutorRouter from "./routes/tutor.routes.js";
import instituteRouter from "./routes/institute.routes.js";
import parentRouter from "./routes/parent.routes.js";
import courseRoutes from "./routes/course.routes.js";
import fileUpload from "express-fileupload";
import chatRoutes from "./routes/chatbot.routes.js";

dotenv.config(); 

const app = express();

// Middleware Setup
app.use(
    cors({
        origin: "http://localhost:5173", // Replace with frontend URL
        credentials: true, // Allow cookies & sessions
        methods: ["GET", "POST", "PUT", "DELETE"], // Allowed methods
        allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
    })
);

app.use('/uploads', express.static('uploads')); // Serve uploaded files
app.use(express.json()); // Parse JSON requests
app.use(express.urlencoded({ extended: true, limit: "16kb" })); // Parse URL-encoded data
app.use(express.static("public")); // Serve static files
app.use(cookieParser()); // Parse cookies
app.use(fileUpload({ useTempFiles: true }));

// Routes
app.use("/tutors", tutorRouter);
app.use("/students", studentRouter);
app.use("/institutes", instituteRouter);
app.use("/parents", parentRouter);
app.use("/courses", courseRoutes);
app.use("/chat",chatRoutes);

export { app };
