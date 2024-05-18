const Content = require("../models/Content");
const User = require("../models/User");
const schedule = require("node-schedule");

exports.createContent = async (req, res) => {
  const { text } = req.body;
  const media = req.file ? req.file.path : null;

  const content = new Content({
    user: req.user.id,
    text,
    media,
  });

  const createdContent = await content.save();
  res.status(201).json(createdContent);
};

exports.getContentFeed = async (req, res) => {
  const user = await User.findById(req.user.id).populate("following");
  const followingIds = user.following.map((f) => f._id);

  const content = await Content.find({
    $or: [{ user: { $in: followingIds } }, { user: req.user.id }],
  })
    .populate("user", "username")
    .populate("comments.user", "username");

  res.json(content);
};

exports.getContentDetails = async (req, res) => {
  const content = await Content.findById(req.params.id)
    .populate("user", "username")
    .populate("comments.user", "username");

  if (content) {
    res.json(content);
  } else {
    res.status(404).json({ message: "Content not found" });
  }
};

exports.scheduleContent = async (req, res) => {
  const { text, date } = req.body;
  const media = req.file ? req.file.path : null;

  const content = new Content({
    user: req.user.id,
    text,
    media,
    scheduledDate: new Date(date),
  });

  const createdContent = await content.save();

  schedule.scheduleJob(new Date(date), async () => {
    createdContent.date = new Date();
    await createdContent.save();
  });

  res.status(201).json(createdContent);
};

exports.deleteContent = async (req, res) => {
  const content = await Content.findById(req.params.id);

  if (content) {
    if (content.user.toString() === req.user.id.toString()) {
      await content.remove();
      res.json({ message: "Content removed" });
    } else {
      res.status(401).json({ message: "User not authorized" });
    }
  } else {
    res.status(404).json({ message: "Content not found" });
  }
};
