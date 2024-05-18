const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoutes = require("./routes/userRoutes");
const contentRoutes = require("./routes/contentRoutes");
const commentRoutes = require("./routes/commentRoutes");
const likeRoutes = require("./routes/likeRoutes.js");
const schedule = require("node-schedule");

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use("/uploads", express.static("uploads"));

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Use routes
app.use("/api/users", userRoutes);
app.use("/api/content", contentRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/likes", likeRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
