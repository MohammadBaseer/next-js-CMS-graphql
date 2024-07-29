import mongoose from "mongoose";

const { Schema } = mongoose;

const blogContextSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true, unique: true },
    avatar: { type: String },
  },
  { timestamps: true }
);

// const BlogContextModel = mongoose.model("blogContext", blogContextSchema);
const BlogContextModel = mongoose.models.blogContextSchema || mongoose.model("blogContext", blogContextSchema);

export default BlogContextModel;
