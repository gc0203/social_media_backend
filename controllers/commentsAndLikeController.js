const Post = require("../models/postSchema");

// add a comment to the post

exports.addComment = async (req, res) => {
  const { content } = req.body;
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ error: "Post Not Found" });
    }
    const comment = {
      user: req.user.id,
      content,
      createdAt: new Date(),
    };
    post.comments.push(comment);
    await post.save();
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// delete a comment
exports.deleteComment = async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    if (!post) {
      return res.status(404).json({ error: "Post Not Found" });
    }
    const comment = post.comments.id(req.params.commentId);
    if (!comment) {
      return res.status(404).json({ error: "comment not found" });
    }
    if (comment.user.toString() !== req.user.id.toString()) {
      return res.status(403).json({ error: "Unauthorized" }); // this ensures the user who created the comment is deleting it
    }
    post.comments.pull(req.params.commentId); // remove the requested comment
    await post.save();
    res.status(200).json({ message: "comment deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// get all comments for a post

exports.getcomments = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate("comments.user");
    if (!post) {
      return res.status(404).json({ error: "post not found" });
    }
    return res.status(200).json(post.comments);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// like a post
exports.likePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ error: "Post Not Found" });
    }
    if (!post.likes.includes(req.user.id)) {
      post.likes.push(req.user.id); // if not liked then include
      await post.save();
      res.status(200).json({ message: "Post liked" });
    } else {
      res.status(400).json({ error: "Already Liked " });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// unlike a post

exports.UnlikePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ error: "Post Not Found" });
    }
    if (post.likes.includes(req.user.id)) {
      post.likes.pull(req.user.id); // if liked then take it away
      await post.save();
      res.status(200).json({ message: "Post Unliked" });
    } else {
      res.status(400).json({ error: "Not Liked yet" });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
