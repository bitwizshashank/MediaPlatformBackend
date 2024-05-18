const Content = require("../models/Content");

exports.createComment = async (req, res) => {
  const { text } = req.body;
  const content = await Content.findById(req.params.contentId);

  if (content) {
    const comment = {
      user: req.user.id,
      text,
    };

    content.comments.push(comment);
    await content.save();
    res.json(content);
  } else {
    res.status(404).json({ message: "Content not found" });
  }
};

exports.editComment = async (req, res) => {
  const { text } = req.body;
  const content = await Content.findOne({
    "comments._id": req.params.commentId,
  });

  if (content) {
    const comment = content.comments.id(req.params.commentId);

    if (comment.user.toString() === req.user.id.toString()) {
      comment.text = text;
      await content.save();
      res.json(content);
    } else {
      res.status(401).json({ message: "User not authorized" });
    }
  } else {
    res.status(404).json({ message: "Content not found" });
  }
};

exports.deleteComment = async (req, res) => {
  const content = await Content.findOne({
    "comments._id": req.params.commentId,
  });

  if (content) {
    const comment = content.comments.id(req.params.commentId);

    if (comment.user.toString() === req.user.id.toString()) {
      comment.remove();
      await content.save();
      res.json(content);
    } else {
      res.status(401).json({ message: "User not authorized" });
    }
  } else {
    res.status(404).json({ message: "Content not found" });
  }
};
