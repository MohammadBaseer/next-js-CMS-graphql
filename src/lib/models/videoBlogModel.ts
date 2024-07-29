import mongoose from "mongoose";

const { Schema } = mongoose;

const videoBlogContentSchema = new Schema(
  {
    title: { type: String, required: true },
    url: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

const VideoBlogContentModel = mongoose.models.videoBlogContentSchema || mongoose.model("videoblogcontext", videoBlogContentSchema);

export default VideoBlogContentModel;
