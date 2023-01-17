const express = require("express");
const router = express.Router();

const { auth } = require("../middleware/auth");
const {
  createMenuItem,
  getMenuItemsByMenuId,
} = require("../controllers/menu_item");

router.route("/").post(auth, createMenuItem);
router.get("/:id", auth, getMenuItemsByMenuId);

module.exports = router;
