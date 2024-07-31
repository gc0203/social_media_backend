const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authmiddleware");
const followcontroller = require("../controllers/followController");

// follow a user
router.post("/users/:id/follow", authMiddleware, followcontroller.followUser);

// unfollow a user
router.delete(
  "/users/:id/follow",
  authMiddleware,
  followcontroller.unfollowUser
);

// get a user's following

router.get(
  "/users/:id/followers",
  authMiddleware,
  followcontroller.getFollowers
);

// get users a user is following

router.get(
  "/users/:id/following",
  authMiddleware,
  followcontroller.getFollowing
);

module.exports = router;
