import { Router } from "express";
import { createBudget, fetchBudget } from "./budget.controller";
import { protect } from "../../middleware/auth.middleware";

const router = Router();

router.post("/", protect, createBudget);
router.get("/", protect, fetchBudget);

export default router;