import mongoose from "mongoose";

const MONGODB_URI= import.meta.env.MONGODB_URI as string;


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
