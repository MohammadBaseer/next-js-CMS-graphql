import mongoose from "mongoose";

const { Schema } = mongoose;

const videoBlogContentSchema = new Schema(
  {
    title: { type: String, required: true },
    url: { type: String, required: true },
    createdBy: {
      id: { type: mongoose.Types.ObjectId, required: true },
      username: { type: String, required: true },
    },
    createdAt: { type: String },
    updatedAt: { type: String },
  },
  { timestamps: true }
);

const videoBlogContentModel = mongoose.models.videoblogcontexts || mongoose.model("videoblogcontexts", videoBlogContentSchema);

export default videoBlogContentModel;
