import express from "express";
import { 
    followTrainer, 
    unfollowTrainer, 
    getFollowedTrainers, 
    getTrainerProfile 
} from "../controllers/trainer.controllers.js";
import authMiddleware from "../middleware/auth.middleware.js";
import { requireUser } from "../middleware/role_check.middleware.js";

const router = express.Router();

router.get("/:trainerId/profile", authMiddleware, getTrainerProfile); // Auth optional logic handled in controller if needed, but here we enforce it for isFollowing check simplicity or make it optional middleware

router.post("/:trainerId/follow", authMiddleware, requireUser, followTrainer);
router.delete("/:trainerId/unfollow", authMiddleware, requireUser, unfollowTrainer);
router.get("/following", authMiddleware, requireUser, getFollowedTrainers);

export default router;
