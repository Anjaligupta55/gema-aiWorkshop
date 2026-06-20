import Enquiry from "../models/Enquiry.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";

// Async handler wrapper helper to prevent repetitive try-catch blocks
const asyncHandler = (requestHandler) => {
  return (req, res, next) => {
    Promise.resolve(requestHandler(req, res, next)).catch((err) => next(err));
  };
};

export const createEnquiry = asyncHandler(async (req, res) => {
  const { name, email, phone } = req.body;

  // Duplicate email registration verification (Bonus Feature)
  const existingEnquiry = await Enquiry.findOne({ email });
  if (existingEnquiry) {
    throw new ApiError(409, "An enquiry with this email address has already been registered");
  }

  const newEnquiry = new Enquiry({
    name,
    email,
    phone,
  });

  const savedEnquiry = await newEnquiry.save();

  const responseData = {
    id: savedEnquiry._id,
    name: savedEnquiry.name,
    email: savedEnquiry.email,
  };

  return res
    .status(201)
    .json(new ApiResponse(201, responseData, "Registration Successful"));
});
