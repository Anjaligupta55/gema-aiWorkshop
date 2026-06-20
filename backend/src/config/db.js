import mongoose from "mongoose";
import { DB_NAME } from "../utils/constants.js";

const connectDB = async () => {
  try {
    const dbUri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017";
    
    // Correctly format the connection string to place the DB_NAME before any query parameters (like ?appName=...)
    let connectionString = dbUri;
    if (dbUri.includes("?")) {
      const [base, query] = dbUri.split("?");
      const separator = base.endsWith("/") ? "" : "/";
      connectionString = `${base}${separator}${DB_NAME}?${query}`;
    } else {
      const separator = dbUri.endsWith("/") ? "" : "/";
      connectionString = `${dbUri}${separator}${DB_NAME}`;
    }
    
    // Connect to database using configured connection string
    const conn = await mongoose.connect(connectionString);
    console.log(`\nMongoDB Connected: ${conn.connection.host}/${DB_NAME}`);
  } catch (error) {
    console.error(`MongoDB database connection error: ${error.message}`);
    console.log("Ensure your MongoDB server is active or review MONGODB_URI in the environment.");
    throw error;
  }
};

export default connectDB;
