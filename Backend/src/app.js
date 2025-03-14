import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";



import userRouter from "./routes/user.routes.js";
import tutorRouter from "./routes/tutor.routes.js";
import instituteRouter from "./routes/institute.routes.js";
import parentRouter from "./routes/parent.routes.js";

dotenv.config(); 

const app = express();


app.use(cors({
    origin: process.env.CORS_ORIGIN, // Frontend URL
    credentials: true
}));
app.use(express.json()); // Parse JSON requests
app.use(express.urlencoded({ extended: true, limit: "16kb" })); // Parse URL-encoded data
app.use(express.static("public")); // Serve static files
app.use(cookieParser()); // Parse cookies


app.use("/users", userRouter);          // Handles Student registration & login
app.use("/tutors", tutorRouter);        // Handles Tutor registration & login
app.use("/institutes", instituteRouter);// Handles Institute registration & login
app.use("/parents", parentRouter);      // Handles Parent registration & login




export { app };
