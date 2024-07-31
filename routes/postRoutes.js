const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authmiddleware");
const postController = require("../controllers/postController");

router.post("/", authMiddleware, postController.createPost);
router.get("/", authMiddleware, postController.getAllPosts);
router.get("/:id", authMiddleware, postController.getPostById);
router.put("/:id", authMiddleware, postController.updatePost);
router.delete("/:id", authMiddleware, postController.deletePost); // pass the post id in the url

module.exports = router;
