import { Request, Response, NextFunction } from "express";

export function registerValidation(req: Request, res: Response, next: NextFunction) {
  const { username, password } = req.body;

  if (!username || typeof username !== "string") {
    return res.status(400).json({ success: false, message: "Username is required" });
  }

  if (!password || typeof password !== "string") {
    return res.status(400).json({ success: false, message: "Password is required" });
  }

  next();
}

export function loginValidation(req: Request, res: Response, next: NextFunction) {
  const { username, password } = req.body;

  if (!username || typeof username !== "string") {
    return res.status(400).json({ success: false, message: "Username is required" });
  }

  if (!password || typeof password !== "string") {
    return res.status(400).json({ success: false, message: "Password is required" });
  }

  next();
}