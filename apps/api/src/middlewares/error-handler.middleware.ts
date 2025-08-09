// apps/api/src/middlewares/error-handler.middleware.ts
import { BaseError } from "app-domain";
import { Request, Response, NextFunction } from "express";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof BaseError) {
    res.status(err.statusCode).json({
      name: err.name,
      message: err.message,
      context: err.context
    });
    return;
  }

  console.error(err); 
  res.status(500).json({
    name: "INTERNAL_SERVER_ERROR",
    message: "An unexpected error occurred.",
  });
};