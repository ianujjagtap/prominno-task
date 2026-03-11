import mongoose from "mongoose";
import env from "@/config/env.js";
import { messages } from "@/constants/index.js";

const connectDatabase = async () => {
  try {
    await mongoose.connect(env.MONGODB_URI);
    console.log(messages.DB_OK);
  } catch (err) {
    console.error(messages.DB_FAIL, err.message);
    process.exit(1);
  }
};

export default connectDatabase;
