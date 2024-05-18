const express = require("express");
const {
  createComment,
  editComment,
  deleteComment,
} = require("../controllers/commentController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/:contentId", protect, createComment);
router.put("/:commentId", protect, editComment);
router.delete("/:commentId", protect, deleteComment);

module.exports = router;
