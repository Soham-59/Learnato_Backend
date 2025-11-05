import mongoose from "mongoose";

const replySchema = new mongoose.Schema(
  {
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
      required: true,
    },
    content: { type: String, required: true },
    author: { type: String, default: "User" },
  },
  { timestamps: true }
);

export default mongoose.model("Reply", replySchema);
