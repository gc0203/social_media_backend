/// now defining the product schema
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true, // Ensures login is unique
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },
  followers: [{ type: Schema.Types.ObjectId, ref: "Users" }],
  following: [{ type: Schema.Types.ObjectId, ref: "Users" }],
});
userSchema.index({ username: "text" }); // a text index on the username field for search

const user = mongoose.model("Users", userSchema);
module.exports = user;

//To bring this blueprint, i.e., the schema to actuality, we use mongoose.model method. We pass it two arguments,
//the first is the name of the collection, and the second is the schema.
