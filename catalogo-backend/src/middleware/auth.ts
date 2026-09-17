// src/middleware/auth.ts
import { Request, Response, NextFunction } from "express";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      message: "No autorizado",
    });
  }

  const token = authHeader.replace("Bearer ", "");

  if (token !== process.env.ADMIN_PASSWORD) {
    return res.status(401).json({
      message: "Token inválido",
    });
  }

  next();
};
