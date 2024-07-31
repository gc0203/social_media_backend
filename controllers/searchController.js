const User = require("../models/userschema");
const Post = require("../models/postSchema");

// search for users by keyword

exports.searchUsers = async (req, res) => {
  const { keyword } = req.query; // to retrieve the keyword from query parameters in the request URL
  try {
    const users = await User.find({
      username: { $regex: keyword, $options: "i" },
    }); // options i is to make it case insensitive
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// search for posts by keywords
exports.searchPosts = async (req, res) => {
  const { keyword } = req.query;
  try {
    const posts = await Post.find({
      content: { $regex: keyword, $options: "i" },
    }).populate("user");
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
