import mongoose from "mongoose";

const { Schema } = mongoose;

const blogContextSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    // url: { type: String },
    // public_id: { type: String },

    photo: {
      public_id: { type: String },
      url: { type: String },
    },
  }
  // { timestamps: true }
);

const blogContextModel = mongoose.models.blogcontexts || mongoose.model("blogcontexts", blogContextSchema);

export default blogContextModel;
