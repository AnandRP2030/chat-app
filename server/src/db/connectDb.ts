import mongoose from "mongoose";
export const connectDb = async () => {
  try {
    await mongoose.connect(
      process.env.MONGO_DB_URL || "mongodb://localhost:27017/chat-app"
    );
    console.log(`DB connected`)
  } catch (error) {
    console.error("ERROR ON CONNECT DB:", error);
  }
};