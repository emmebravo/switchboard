import "dotenv/config";
import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect("");
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

export default connectDB;
