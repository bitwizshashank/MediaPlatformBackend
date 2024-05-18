const mongoose = require("mongoose");

const contentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  text: { type: String },
  media: { type: String },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  comments: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      text: { type: String, required: true },
      date: { type: Date, default: Date.now },
    },
  ],
  date: { type: Date, default: Date.now },
  scheduledDate: { type: Date },
});

const Content = mongoose.model("Content", contentSchema);
module.exports = Content;
