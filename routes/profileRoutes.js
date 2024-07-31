const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authmiddleware");
const profileController = require("../controllers/profileController");

// create or update
router.post("/", authMiddleware, profileController.createorUpdateProfile);

// get current user profile
router.get("/me", authMiddleware, profileController.getCurrentProfile);

// get profile by id
router.get("/:userId", authMiddleware, profileController.getProfileById);

//delete a profile
router.delete("/me", authMiddleware, profileController.deleteProfile);

module.exports = router;
