const express = require("express");
const router = express.Router();

const { auth } = require("../middleware/auth");
const { createMenuItem } = require("../controllers/menu_item");

router.route("/").post(auth, createMenuItem);

module.exports = router;
