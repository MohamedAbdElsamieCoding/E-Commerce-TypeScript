import winston from "winston";

const levels = {
  error: 0,
  warn: 1,
  info: 3,
  http: 4,
  debug: 5,
} as const;

const colors = {
  error: "red",
  warn: "yellow",
  info: "green",
  http: "magenta",
  debug: "white",
} as const;
winston.addColors(colors);

const getLevel = () => {
  const env = process.env.NODE_ENV || "development";
  const isDev = env === "development";
  return isDev ? "debug" : "warn";
};
const format = winston.format.combine(
  winston.format.timestamp({ format: "YYYY-MM-DD hh:mm:ss" }),
  winston.format.colorize({ all: true }),
  winston.format.printf(
    (info) => `${info.timestamp} , ${info.level} , ${info.message} `
  )
);

const transports: winston.transport[] = [
  new winston.transports.Console(),
  new winston.transports.File({ filename: "logs/error.log", level: "error" }),
  new winston.transports.File({ filename: "logs/allLogs.log" }),
];

export const logger = winston.createLogger({
  level: getLevel(),
  levels,
  format,
  transports,
});
