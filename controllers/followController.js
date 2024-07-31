const User = require("../models/userschema");

// follow a user
exports.followUser = async (req, res) => {
  try {
    const userToFollow = await User.findById(req.params.id);
    const currentUser = await User.findById(req.user.id);
    if (!userToFollow || !currentUser) {
      return res.status(404).json({ error: "user not found" });
    }
    if (!currentUser.following.includes(req.params.id)) {
      currentUser.following.push(req.params.id);
      userToFollow.followers.push(req.params.id);
      await currentUser.save();
      await userToFollow.save();
      res.status(200).json({ message: "user followed successfully" });
    } else {
      res.status(400).json({ error: "already following this user" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// unfollow a user

exports.unfollowUser = async (req, res) => {
  try {
    const userToFollow = await User.findById(req.params.id);
    const currentUser = await User.findById(req.user.id);
    if (!userToFollow || !currentUser) {
      return res.status(404).json({ error: "user not found" });
    }
    if (currentUser.following.includes(req.params.id)) {
      currentUser.following.pull(req.params.id);
      userToFollow.followers.pull(req.params.id);
      await currentUser.save();
      await userToFollow.save();
      res.status(200).json({ message: "user unfollowed successfully" });
    } else {
      res.status(400).json({ error: "Not following this user" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// get a user's followers

exports.getFollowers = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate("followers");
    if (!user) {
      return res.status(404).json({ error: "user not found" });
    }
    res.status(200).json(user.followers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getFollowing = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate("following");
    if (!user) {
      return res.status(404).json({ error: "user not found" });
    }
    res.status(200).json(user.following);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
