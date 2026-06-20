import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import compression from "compression";
import enquiryRouter from "./routes/enquiry.routes.js";
import { notFoundHandler } from "./middlewares/notFound.middleware.js";
import { errorHandler } from "./middlewares/error.middleware.js";
import ApiResponse from "./utils/ApiResponse.js";

const app = express();

// Load security HTTP headers
app.use(helmet());

// Cross Origin Resource Sharing controls
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "*",
    credentials: true,
  })
);

// Enable response GZIP compression for lightweight packet transfers
app.use(compression());

// Request logger middleware
app.use(morgan("dev"));

// Body parser limits
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(cookieParser());

// Root status index endpoint
app.get("/", (req, res) => {
  return res.status(200).json(new ApiResponse(200, null, "RoboSpark API Running"));
});

// Mount API routes
app.use("/api/v1", enquiryRouter);

// Fallback error-handling middlewares
app.use(notFoundHandler);
app.use(errorHandler);

export { app };
