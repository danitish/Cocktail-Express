const User = require("../models/user");
const asyncHandler = require("express-async-handler");
const { registerValidation, loginValidation } = require("../validations/user");

const registerUser = asyncHandler(async (req, res) => {
  const { error } = registerValidation(req.body);
  if (error) {
    res.status(400);
    throw new Error(error.details[0].message);
  }
  const { full_name, password, email } = req.body;

  const existing_email = await User.findOne({ email });
  if (existing_email) {
    res.status(400);
    throw new Error("Email already in use");
  }

  const user = await User.create({ full_name, password, email });
  if (!user) {
    res.status(400);
    throw new Error("Invalid user data");
  }
  res.status(201);
  res.send({
    _id: user._id,
    full_name: user.full_name,
    email: user.email,
    isAdmin: user.isAdmin,
  });
});

const loginUser = asyncHandler(async (req, res) => {
  const { error } = loginValidation(req.body);

  if (error) {
    res.status(400);
    throw new Error(error.details[0].message);
  }
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await user.matchedPasswords(password))) {
    res.send({
      _id: user._id,
      full_name: user.full_name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: user.generateToken(),
    });
    return;
  }
  res.status(400);
  throw new Error("Invalid email or password");
});

const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }
  res.send({
    _id: user._id,
    full_name: user.full_name,
    email: user.email,
  });
});

const updateUserProfile = asyncHandler(async (req, res) => {
  const { full_name, email, password } = req.body;

  const user = await User.findById(req.user._id);
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  user.full_name = full_name ? full_name : user.full_name;
  user.email = email ? email : user.email;
  if (password && password.length) {
    user.password = password;
  }
  await user.save();

  res.status(200);
  res.send({
    _id: user._id,
    full_name: user.full_name,
    email: user.email,
    isAdmin: user.isAdmin,
    token: user.generateToken(),
  });
});

module.exports = { registerUser, loginUser, getUserProfile, updateUserProfile };
