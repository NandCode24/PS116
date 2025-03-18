import express from "express";
import { registerParent, loginParent } from "../controllers/parent.controllers.js";

const router = express.Router();

router.post("/register", registerParent);
router.post("/login", loginParent);

export default router;
