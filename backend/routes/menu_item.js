const express = require("express");
const router = express.Router();

const { auth } = require("../middleware/auth");
const {
  createMenuItem,
  getMenuItemsByMenuId,
  removeMenuItem,
} = require("../controllers/menu_item");

router.route("/").post(auth, createMenuItem);
router
  .route("/:id")
  .get(auth, getMenuItemsByMenuId)
  .delete(auth, removeMenuItem);

module.exports = router;
