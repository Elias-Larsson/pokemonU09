import mongoose from "mongoose";

async function connectDB() {
  try {
    const URL = process.env.MONGODB_URI || "";
    await mongoose.connect(URL);
    console.log("DB connected successfully!");
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(`Error while connecting to DB: ${error.message}`);
    }
  }
}

export default connectDB;
