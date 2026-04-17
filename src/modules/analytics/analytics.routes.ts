import { Router } from "express";
import { fetchAnalytics } from "./analytics.controller";
import { protect } from "../../middleware/auth.middleware";

const router = Router();

router.get("/", protect, fetchAnalytics);

export default router;