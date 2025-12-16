import mongoose from "mongoose";
import dotenv from "dotenv";
import { AppError } from "../utils/appError.js";
import { httpStatusText } from "../utils/httpStatusText.js";
import { logger } from "./logger.js";
dotenv.config();

export const connectDb = async () => {
  const mongoUrl = process.env.MONGO_URL;
  if (!mongoUrl)
    throw new AppError(
      "MONGO_URL is not defined in .env",
      404,
      httpStatusText.ERROR
    );
  try {
    const connect = await mongoose.connect(mongoUrl);
    logger.info(`Database is connected ${connect.connection.host}`);
  } catch (err) {
    logger.error(`Database is failed to connect ${err}`);
  }
};
