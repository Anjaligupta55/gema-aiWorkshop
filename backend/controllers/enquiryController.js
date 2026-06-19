import { validationResult } from "express-validator";
import Enquiry from "../models/Enquiry.js";

export const createEnquiry = async (req, res) => {
  // Check express-validation validation results
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array(),
      message: errors.array()[0].msg,
    });
  }

  try {
    const { name, email, phone } = req.body;

    const enquiry = new Enquiry({
      name,
      email,
      phone,
    });

    await enquiry.save();

    return res.status(201).json({
      success: true,
      message: "Registration Successful",
    });
  } catch (error) {
    console.error("Enquiry submission error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error. Please try again.",
    });
  }
};
