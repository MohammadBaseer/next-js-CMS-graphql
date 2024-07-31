import mongoose from "mongoose";

const { Schema } = mongoose;

const videoBlogContentSchema = new Schema(
  {
    title: { type: String, required: true },
    url: { type: String, required: true },
  },
  { timestamps: true }
);

const videoBlogContentModel = mongoose.models.videoblogcontexts || mongoose.model("videoblogcontexts", videoBlogContentSchema);

export default videoBlogContentModel;
