import { Request, Response, NextFunction } from "express";
import { registerUser, loginUser } from "./auth.service";

export const signup = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await registerUser(req.body);

    res.status(201).json({
      success: true,
      message: "User registered",
      data
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await loginUser(req.body);

    res.status(200).json({
      success: true,
      message: "Login successful",
      data
    });
  } catch (error) {
    next(error);
  }
};