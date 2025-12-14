import express from "express";
import { getUserFeed } from "../controllers/feed.controllers.js";
import authMiddleware from "../middleware/auth.middleware.js";
import { requireUser } from "../middleware/role_check.middleware.js";

const router = express.Router();

router.get("/", authMiddleware, requireUser, getUserFeed);

export default router;
