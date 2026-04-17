import { Router } from "express";
import {
  addExpense,
  fetchExpenses,
  editExpense,
  removeExpense,
  approveExpenseController,
  rejectExpenseController,
} from "./expense.controller";
import { protect } from "../../middleware/auth.middleware";
import { isAdmin } from "../../middleware/role.middleware";

const router = Router();

router.post("/", protect, addExpense);
router.get("/", protect, fetchExpenses);
router.put("/:id", protect, editExpense);
router.delete("/:id", protect,  removeExpense);

// 🔥 Advanced
router.patch("/:id/approve", protect, isAdmin, approveExpenseController);
router.patch("/:id/reject", protect, isAdmin, rejectExpenseController);

export default router;