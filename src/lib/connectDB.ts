import mongoose, { Mongoose } from "mongoose";
import * as dotenv from "dotenv";
import pc from "picocolors";

dotenv.config();


const DATABASE_URL = process.env.DATABASE_URL;

declare global {
  var mongoose: {
    conn: Mongoose | null;
  };
}

if (!DATABASE_URL) throw new Error("DATABASE_URL is not defined.");

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null };
}

export const connectMongoDB = async () => {
  try {
    if (cached.conn) {
      console.log(pc.green("MongoDB Connected"));

      return cached.conn;
    }

    cached.conn = await mongoose.connect(DATABASE_URL);
    console.log("MongoDB Connection Created");
    return cached.conn;
  } catch (error) {
    console.log("Something went wrong with MongoDB connection");
  }
};

export default connectMongoDB;
