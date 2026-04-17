import { Response, NextFunction } from "express";
import { getAnalytics } from "./analytics.service";
import { AuthRequest } from "../../middleware/auth.middleware";

export const fetchAnalytics = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { month } = req.query;

    const data = await getAnalytics(req.user, month as string);

    res.json({
      success: true,
      data
    });
  } catch (error) {
    next(error);
  }
};