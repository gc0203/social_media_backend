const express = require("express");
const router = express.Router();
const commentController = require("../controllers/commentsAndLikeController");
const auth = require("../middleware/authmiddleware");

// add a comment to the post

router.post("/posts/:id/comments", auth, commentController.addComment); // post id likhni isme

// delete a comment
router.delete(
  "/posts/:postId/comments/:commentId",
  auth,
  commentController.deleteComment
);

// get comments

router.get("/posts/:id/comments", auth, commentController.getcomments);

// like a post
router.post("/posts/:id/likes", auth, commentController.likePost);

// unlike a post

router.delete("/posts/:id/likes", auth, commentController.UnlikePost);

module.exports = router;
