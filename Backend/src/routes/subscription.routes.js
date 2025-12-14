import express from "express";
import { subscribeToPlan, getUserSubscriptions } from "../controllers/subscription.controllers.js";
import authMiddleware from "../middleware/auth.middleware.js";
import { requireUser } from "../middleware/role_check.middleware.js";

const router = express.Router();

router.post("/:planId", authMiddleware, requireUser, subscribeToPlan);
router.get("/my", authMiddleware, requireUser, getUserSubscriptions);

export default router;
