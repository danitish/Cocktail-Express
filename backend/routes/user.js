const express = require("express");
const { auth } = require("../middleware/auth");
const router = express.Router();

const {
  registerUser,
  loginUser,
  getUserProfile,
} = require("../controllers/user");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.route("/").get(auth, getUserProfile);

module.exports = router;
