const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    user:    { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    text:    { type: String, required: true, maxlength: 1000 },
  },
  { timestamps: true }
);

const postSchema = new mongoose.Schema(
  {
    author:   { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    text:     { type: String, maxlength: 3000, default: "" },
    mediaUrl: { type: String, default: "" },      // filename in uploads/posts/
    mediaType:{ type: String, enum: ["image", "video", ""], default: "" },
    likes:    [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    comments: [commentSchema],
    shares:   { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", postSchema);
