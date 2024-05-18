const express = require("express");
const { likeContent, unlikeContent } = require("../controllers/likeController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/:contentId", protect, likeContent);
router.delete("/:contentId", protect, unlikeContent);

module.exports = router;
