import { Request, Response, NextFunction } from "express";
import { logger } from "../config/logger.js";
import { httpStatusText } from "../utils/httpStatusText.js";

interface CustomError extends Error {
  statusCode: number;
  statusText?: string;
}

export const errorHandling = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode: number = err.statusCode || 500;
  const statusText: string = err.statusText || httpStatusText.ERROR;
  logger.error(
    `[${req.id || "no id"}] ${err.message} | ${req.method} | ${
      req.originalUrl
    }\n${err.stack || ""}`
  );
  res.status(statusCode).json({
    status: statusText,
    message: err.message || "Something went wrong",
  });
};
