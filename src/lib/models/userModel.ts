import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    roll: { type: String },
    avatar: { type: String },
  },
  { timestamps: true }
);

const UserModel = mongoose.models.userSchema || mongoose.model("user", userSchema);

export default UserModel;
