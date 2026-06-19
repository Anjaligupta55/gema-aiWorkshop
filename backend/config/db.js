import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const dbUri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/robospark";
    
    const conn = await mongoose.connect(dbUri);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`MongoDB connection error: ${error.message}`);
    console.log("Please make sure MongoDB is running or check the MONGODB_URI configuration in .env.");
    
    // In production, exit process on failure to prevent unstable deploys
    if (process.env.NODE_ENV === "production") {
      process.exit(1);
    }
  }
};

export default connectDB;
