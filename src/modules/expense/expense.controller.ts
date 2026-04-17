import { Response, NextFunction } from "express";
import {
  createExpense,
  getExpenses,
  updateExpense,
  deleteExpense,
  approveExpense,
  rejectExpense,
} from "./expense.service";
import { AuthRequest } from "../../middleware/auth.middleware";

// ➕ Add Expense
export const addExpense = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { amount, category } = req.body;

    if (!amount || !category) {
      return res.status(400).json({
        success: false,
        message: "Amount and category are required",
      });
    }

    const expense = await createExpense(
      req.user._id.toString(),
      req.body
    );

    res.status(201).json({
      success: true,
      data: expense,
    });
  } catch (error) {
    console.error("ADD EXPENSE ERROR:", error);
    next(error);
  }
};

// 📥 Get Expenses
export const fetchExpenses = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    // ✅ FIXED: pass full req.user instead of only user ID
    const expenses = await getExpenses(req.user, req.query);

    res.status(200).json({
      success: true,
      data: expenses,
    });
  } catch (error) {
    console.error("FETCH EXPENSE ERROR:", error);
    next(error);
  }
};

// ✏️ Update Expense
export const editExpense = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const expense = await updateExpense(
      req.params.id,
      req.user._id.toString(),
      req.body
    );

    res.status(200).json({
      success: true,
      data: expense,
    });
  } catch (error) {
    console.error("UPDATE EXPENSE ERROR:", error);
    next(error);
  }
};

// ❌ Delete Expense
export const removeExpense = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await deleteExpense(
      req.params.id,
      req.user._id.toString()
    );

    res.status(200).json({
      success: true,
      message: result.message,
    });
  } catch (error) {
    console.error("DELETE EXPENSE ERROR:", error);
    next(error);
  }
};

// ✅ Approve Expense
export const approveExpenseController = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { signature } = req.body;

    if (!signature) {
      return res.status(400).json({
        success: false,
        message: "Signature is required",
      });
    }

    const expense = await approveExpense(
      req.params.id,
      req.user._id.toString(),
      signature
    );

    res.status(200).json({
      success: true,
      data: expense,
    });
  } catch (error) {
    console.error("APPROVE ERROR:", error);
    next(error);
  }
};

// ❌ Reject Expense
export const rejectExpenseController = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const expense = await rejectExpense(
      req.params.id,
      req.user._id.toString()
    );

    res.status(200).json({
      success: true,
      data: expense,
    });
  } catch (error) {
    console.error("REJECT ERROR:", error);
    next(error);
  }
};