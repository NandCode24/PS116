import express from "express";
import { loginUser, getSession, logoutUser } from "../controllers/auth.controllers.js";

const router = express.Router();

router.post("/login", loginUser);
router.get("/session", getSession);
router.post("/logout", logoutUser);

export default router;
