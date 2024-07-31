const Profile = require("../models/profileSchema");
const User = require("../models/userschema");

// create or update profile
exports.createorUpdateProfile = async (req, res) => {
  const { bio, profilePicture, socialLinks } = req.body;

  // build a profile object
  const profileFields = {
    user: req.user.id,
    bio,
    profilePicture,
    socialLinks,
  };
  try {
    let profile = await Profile.findOne({ user: req.user.id });
    if (profile) {
      //update
      profile = await Profile.findOneAndUpdate(
        {
          user: req.user.id,
        },
        { $set: profileFields },
        { new: true }
      );
      return res.json(profile);
    }
    // create
    profile = new Profile(profileFields);
    await profile.save();
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};
// Get Current user's profile

exports.getCurrentProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id }).populate(
      "user",
      ["username", "role"]
    );

    if (!profile) {
      return res.status(400).json({ msg: "There is no profile of this user" });
    }
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// Get profile by user id
exports.getProfileById = async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.userId,
    }).populate("user", ["username", "role"]);
    if (!profile) {
      return res.status(400).json({ msg: "Profile Not found" });
    }
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    if (err.kind == "ObjectId") {
      return res.status(400).json({ msg: "Profile Not found" });
    }
    res.status(500).send("Server Error");
  }
};

//Delete Profile

exports.deleteProfile = async (req, res) => {
  try {
    //Remove Profile
    await Profile.findOneAndDelete({ user: req.user.id });
    res.json({ msg: "Profile Deleted" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};
