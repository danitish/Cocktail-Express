const express = require("express");
const { auth } = require("../middleware/auth");
const router = express.Router();

const {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
} = require("../controllers/user");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.route("/").get(auth, getUserProfile).put(auth, updateUserProfile);

module.exports = router;
