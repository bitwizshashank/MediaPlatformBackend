const express = require("express");
const {
  registerUser,
  loginUser,
  getUserProfile,
  followUser,
  findUserByName,
} = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", protect, getUserProfile);
router.post("/follow/:id", protect, followUser);
router.get("/find", protect, findUserByName);

module.exports = router;
