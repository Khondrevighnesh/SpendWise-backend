import { Request, Response, NextFunction } from "express";
import { setBudget, getBudget } from "./budget.service";
import { AuthRequest } from "../../middleware/auth.middleware";

export const createBudget = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { amount, month } = req.body;

    const budget = await setBudget(
      req.user._id,
      amount,
      month
    );

    res.json({
      success: true,
      data: budget
    });
  } catch (error) {
    next(error);
  }
};

export const fetchBudget = async (req: AuthRequest, res: Response) => {
  try {
    const month =
      (req.query.month as string) ||
      new Date().toISOString().slice(0, 7); // ✅ current month

    const budget = await getBudget(req.user._id, month);

    res.json({
      success: true,
      data: budget || null,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};