import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";

import routes from "./routes/index.js";
import {
  //   notFound,
  errorHandler,
} from "./middlewares/index.js";
import path from "node:path";

const app = express();

/**
 * Security Middleware
 */
app.use(helmet(
  {
    crossOriginResourcePolicy: {
      policy: "cross-origin",
    },
  }
));
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

/**
 * Request Logging
 */
app.use(morgan("dev"));

/**
 * Body Parser
 */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/**
 * Cookie Parser
 */
app.use(cookieParser());
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));
/**
 * Routes
 */
app.use("/api", routes);

/**
 * 404 Middleware
 */
// app.use(notFound);

/**
 * Global Error Handler
 */
app.use(errorHandler);

export default app;
