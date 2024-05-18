const User = require("../models/User");
const jwt = require("jsonwebtoken");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

exports.registerUser = async (req, res) => {
  const { username, email, password } = req.body;
  const userExists = await User.findOne({ email });

  if (userExists) {
    return res.status(400).json({ message: "User already exists" });
  }

  const user = await User.create({ username, email, password });

  if (user) {
    res.status(201).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400).json({ message: "Invalid user data" });
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(401).json({ message: "Invalid email or password" });
  }
};

exports.getUserProfile = async (req, res) => {
  const user = await User.findById(req.user.id);

  if (user) {
    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
      followers: user.followers,
      following: user.following,
    });
  } else {
    res.status(404).json({ message: "User not found" });
  }
};

exports.followUser = async (req, res) => {
  const user = await User.findById(req.user.id);
  const userToFollow = await User.findById(req.params.id);

  if (user && userToFollow) {
    if (user.following.includes(userToFollow._id)) {
      return res
        .status(400)
        .json({ message: "You are already following this user" });
    }

    user.following.push(userToFollow._id);
    userToFollow.followers.push(user._id);

    await user.save();
    await userToFollow.save();

    res.json({ message: "User followed" });
  } else {
    res.status(404).json({ message: "User not found" });
  }
};

exports.findUserByName = async (req, res) => {
  const { name } = req.query;
  const users = await User.find({ username: { $regex: name, $options: "i" } });

  if (users) {
    res.json(users);
  } else {
    res.status(404).json({ message: "No users found" });
  }
};
