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

  if (!(await user.matchedPasswords(password)) || !user) {
    res.status(400);
    throw new Error("Wrong email or password, try again");
  }
  res.send({
    full_name: user.full_name,
    email: user.email,
    isAdmin: user.isAdmin,
    token: user.generateToken(),
  });
});

module.exports = { registerUser, loginUser };
