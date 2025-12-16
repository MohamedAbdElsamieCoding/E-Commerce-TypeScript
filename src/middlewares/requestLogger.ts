import { logger } from "../config/logger.js";
import { randomUUID } from "crypto";
import { httpStatusText } from "../utils/httpStatusText.js";
import { Request, Response, NextFunction } from "express";

declare module "express-serve-static-core" {
  interface Request {
    id?: string;
    startTime: number;
  }
}

export const requestLogger = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const requestId: string = randomUUID();
  req.id = requestId;
  req.startTime = Date.now();

  res.setHeader("x-Request-Id", requestId);

  logger.http(
    `[${requestId}] Incoming -> ${req.method} ${req.originalUrl} from ${req.ip}`
  );

  res.on("finish", () => {
    const duration: number = Date.now() - (req.startTime || Date.now());
    const status: number = res.statusCode;
    const statusType: string =
      status >= 400 ? httpStatusText.ERROR : httpStatusText.SUCCESS;
    const logMessage: string = `[${requestId}] Completed -> ${req.method} ${req.originalUrl} | ${statusType} (${status}) | ${duration}ms`;
    if (status >= 400) {
      logger.error(logMessage);
    } else {
      logger.http(logMessage);
    }
  });
  next();
};
