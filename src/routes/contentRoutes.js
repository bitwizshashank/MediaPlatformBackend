const express = require("express");
const {
  createContent,
  getContentFeed,
  getContentDetails,
  scheduleContent,
  deleteContent,
} = require("../controllers/contentController");
const { protect } = require("../middleware/authMiddleware");
const multer = require("multer");
const path = require("path"); // Import the path module

const router = express.Router();

// Configure multer for media uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "..", "uploads")); // Use an absolute path
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });

router.post("/", protect, upload.single("media"), createContent);
router.get("/feed", protect, getContentFeed);
router.get("/:id", protect, getContentDetails);
router.post("/schedule", protect, upload.single("media"), scheduleContent);
router.delete("/:id", protect, deleteContent);

module.exports = router;
