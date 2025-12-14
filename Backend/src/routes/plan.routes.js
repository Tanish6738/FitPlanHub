import express from "express";
import {
  createPlan,
  getAllPlans,
  getPlanDetails,
  updatePlan,
  deletePlan,
} from "../controllers/plan.controllers.js";
import authMiddleware from "../middleware/auth.middleware.js";
import { requireTrainer } from "../middleware/role_check.middleware.js";

const router = express.Router();

router.get("/", getAllPlans);
router.get("/:planId", authMiddleware, getPlanDetails);
router.post("/", authMiddleware, requireTrainer, createPlan);
router.put("/:planId", authMiddleware, requireTrainer, updatePlan);
router.delete("/:planId", authMiddleware, requireTrainer, deletePlan);

export default router;
