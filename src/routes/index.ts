import { Router } from "express";
import authRoutes from "../modules/auth/auth.routes";
import expenseRoutes from "../modules/expense/expense.routes";
import budgetRoutes from "../modules/budget/budget.routes";
import analyticsRoutes from "../modules/analytics/analytics.routes";
import reportRoutes from "../modules/report/report.routes";

const router = Router();

router.use("/auth", authRoutes);
router.use("/expense", expenseRoutes);
router.use("/budget", budgetRoutes);
router.use("/analytics", analyticsRoutes);
router.use("/report", reportRoutes);

export default router;