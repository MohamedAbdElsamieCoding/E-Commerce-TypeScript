import express, { Request, Response } from "express";
import hpp from "hpp";
import helmet from "helmet";
import cors from "cors";
import { requestLogger } from "./middlewares/requestLogger.js";
import { errorHandling } from "./middlewares/errorHandling.js";

const app = express();

app.use(express.json());
app.use(hpp());
app.use(cors());
app.use(helmet());

// Logger Request
app.use(requestLogger);

app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Hello TypeScript + Express 🚀" });
});

// Error Handler
app.use(errorHandling);

export default app;
