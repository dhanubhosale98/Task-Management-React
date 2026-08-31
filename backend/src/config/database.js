import mongoose from "mongoose";
import { config } from "./index.js";

const connectDatabase = async () => {
  try {
    await mongoose.connect(config.database.uri);

    console.log("database connected successfully");
  } catch (error) {
    console.error("Failed to connect to MongoDB");
    console.error(error.message);

    process.exit(1);
  }
};

export default connectDatabase;