const Content = require("../models/Content");

exports.likeContent = async (req, res) => {
  const content = await Content.findById(req.params.contentId);

  if (content) {
    if (content.likes.includes(req.user.id)) {
      return res
        .status(400)
        .json({ message: "You already liked this content" });
    }

    content.likes.push(req.user.id);
    await content.save();
    res.json({ message: "Content liked" });
  } else {
    res.status(404).json({ message: "Content not found" });
  }
};

exports.unlikeContent = async (req, res) => {
  const content = await Content.findById(req.params.contentId);

  if (content) {
    if (!content.likes.includes(req.user.id)) {
      return res
        .status(400)
        .json({ message: "You have not liked this content" });
    }

    content.likes = content.likes.filter(
      (like) => like.toString() !== req.user.id.toString()
    );
    await content.save();
    res.json({ message: "Content unliked" });
  } else {
    res.status(404).json({ message: "Content not found" });
  }
};
