const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const commentSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "Users", required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.Now },
});
const postSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "Users", required: true },
    content: { type: String, required: true },
    likes: [{ type: Schema.Types.ObjectId, ref: "User" }],
    comments: [commentSchema],
  },
  { timestamp: true }
);
postSchema.index({ content: "text" }); // text index on content field for search
const Post = mongoose.model("Post", postSchema);
module.exports = Post;
