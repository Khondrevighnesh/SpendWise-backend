import { Response, NextFunction } from "express";
import { generatePDF, generateExcel } from "./report.service";
import { AuthRequest } from "../../middleware/auth.middleware";

// PDF
export const downloadPDF = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { month } = req.query;

    await generatePDF(req.user, month as string, res);
  } catch (error) {
    next(error);
  }
};

// Excel
export const downloadExcel = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { month } = req.query;

    await generateExcel(req.user, month as string, res);
  } catch (error) {
    next(error);
  }
};