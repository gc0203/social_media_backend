const Post = require("../models/postSchema");
const Profile = require("../models/profileSchema");

// create a new post
exports.createPost = async (req, res) => {
  try {
    const post = new Post({
      user: req.user.id,
      content: req.body.content,
    });
    await post.save();
    res.status(201).send(post);
  } catch (error) {
    res.status(400).send(error);
  }
};
exports.getAllPosts = async (req, res) => {
  try {
    const profile = await Post.findOne({ user: req.user._id }).populate(
      "followers"
    ); // get logged in users profile and populate the followers field
    const followersIds = profile.followers.map((follower) => follower._id); //extract the IDS of the users the logged in ser follows
    // find posts from users the logged-in user follows
    const posts = await Post.find({ user: { $in: followersIds } }).populate(
      "user comments.user"
    );
    res.send(posts);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate(
      "user comments.user"
    );
    if (!post) {
      res.status(404).send();
    }
    res.send(post);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.updatePost = async (req, res) => {
  try {
    const post = await Post.findOneAndUpdate(
      { _id: req.params.id },
      { content: req.body.content },
      { new: true, runValidators: true }
    );

    if (!post) {
      return res.status(404).send();
    }
    res.send(post);
  } catch (error) {
    res.status(400).send(error);
  }
};
// to delete a post
exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findOneAndDelete({
      _id: req.params.id,
      //   user: req.user._id,
    });

    if (!post) {
      return res.status(404).send();
    }
    res.send(post);
  } catch (error) {
    res.status(400).send(error);
  }
};
