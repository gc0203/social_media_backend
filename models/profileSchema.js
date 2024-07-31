const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ProfileSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectID,
      ref: "Users", // making a reference to the user model
      required: true,
    },
    bio: {
      type: String,
      default: "",
    },
    profilePicture: {
      type: String,
      default: "", //you can add url of your profile pic
    },
    socialLinks: {
      youtube: { type: String, default: "" },
      twitter: { type: String, default: "" },
      facebook: { type: String, default: "" },
      instagram: { type: String, default: "" },
      linkedin: { type: String, default: "" },
    },
    followers: [
      {
        type: Schema.Types.ObjectID,
        ref: "Users",
      },
    ],
  },
  { timestamps: true }
);
module.exports = mongoose.model("Profile", ProfileSchema);
