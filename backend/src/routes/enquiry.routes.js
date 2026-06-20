import express from "express";
import { createEnquiry } from "../controllers/enquiry.controller.js";
import { enquiryValidationRules, validate } from "../validators/enquiry.validator.js";
import rateLimit from "express-rate-limit";
import ApiResponse from "../utils/ApiResponse.js";

const router = express.Router();

// Strict rate-limiting for registration endpoints to prevent script spamming
const enquiryRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes window
  max: 10, // limit to 10 submissions per IP
  message: {
    success: false,
    message: "Too many registration requests from this IP address, please try again after 15 minutes.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Server health check route
router.get("/health", (req, res) => {
  const healthData = {
    status: "OK",
    uptime: `${Math.floor(process.uptime())}s`,
    timestamp: new Date().toISOString(),
  };
  
  return res
    .status(200)
    .json(new ApiResponse(200, healthData, "System is running healthy"));
});

// Post registration handler
router.post(
  "/enquiry",
  enquiryRateLimiter,
  enquiryValidationRules,
  validate,
  createEnquiry
);

export default router;
