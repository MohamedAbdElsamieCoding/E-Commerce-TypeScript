import app from "./app.js";
import dotenv from "dotenv";
import { connectDb } from "./config/db.js";
import { logger } from "./config/logger.js";

dotenv.config();

const PORT = process.env.PORT;

const startServer = async (): Promise<void> => {
  await connectDb();
  app.listen(PORT, () => {
    logger.info(`Server is running on port ${PORT}`);
  });
};

startServer();
