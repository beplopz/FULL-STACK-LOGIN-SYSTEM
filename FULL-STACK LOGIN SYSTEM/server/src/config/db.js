import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export default async function connectToDatabase() {
  const mongoUri = process.env.MONGODB_URI;

  if (!mongoUri) {
    throw new Error("MONGODB_URI is missing from the environment variables.");
  }

  await mongoose.connect(mongoUri);
  console.log("Connected to MongoDB");
}
