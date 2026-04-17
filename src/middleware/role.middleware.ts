import { Response, NextFunction } from "express";
import { AuthRequest } from "./auth.middleware";
import User from "../modules/user/user.model";

export const isAdmin = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await User.findById(req.user.userId);

    if (!user || user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Access denied: Admin only"
      });
    }

    next();
  } catch (error) {
    next(error);
  }
};