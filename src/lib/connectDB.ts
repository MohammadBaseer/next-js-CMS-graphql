import mongoose from "mongoose";
import * as dotenv from "dotenv";
dotenv.config();

const MONGODB_URL = process.env.MONGODB_URL;

const connectDB = async () => {
  const connectionState = mongoose.connection.readyState;
  if (connectionState === 1) {
    console.log("Already MongoDB Connected");
    return;
  }
  if (connectionState === 2) {
    console.log("Connecting");
    return;
  }

  try {
    mongoose.connect(MONGODB_URL!, {
      dbName: "next-js-cms-with-apollo-graphql",
      bufferCommands: true,
    });
    console.log("Connected");
  } catch (error: any) {
    console.log(error);
  }
};

export default connectDB;
