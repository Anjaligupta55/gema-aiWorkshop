import dotenv from "dotenv";
import connectDB from "./config/db.js";
import { app } from "./app.js";

// Load environment configurations
dotenv.config();

const PORT = process.env.PORT || 5000;

// Connect database and run listener
connectDB()
  .then(() => {
    const server = app.listen(PORT, () => {
      console.log(`🚀 Server is listening on port ${PORT}`);
    });

    // Handle Unhandled Promise Rejections (e.g. database disconnects or unhandled API rejections)
    process.on("unhandledRejection", (err) => {
      console.error(`Unhandled Rejection: ${err.message}`);
      console.log("Gracefully closing server connections...");
      server.close(() => {
        process.exit(1);
      });
    });
  })
  .catch((err) => {
    console.error("Mongoose connection boot failed:", err);
    process.exit(1);
  });

// Handle Uncaught Exceptions
process.on("uncaughtException", (err) => {
  console.error(`Uncaught Exception: ${err.message}`);
  console.log("Immediate system shutdown...");
  process.exit(1);
});
