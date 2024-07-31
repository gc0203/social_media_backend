const express = require("express");
const router = express.Router();
const auth = require("../middleware/authmiddleware");
const searchController = require("../controllers/searchController");

// search for users by keyword

router.get("/search/users", auth, searchController.searchUsers);

// search for posts with keywords

router.get("/search/posts", auth, searchController.searchPosts);
module.exports = router;
