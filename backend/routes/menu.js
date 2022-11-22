const express = require("express");
const { auth } = require("../middleware/auth");
const { createMenu, deleteMenu, getMyMenus } = require("../controllers/menu");

const router = express.Router();

router
  .route("/")
  .post(auth, createMenu)
  .get(auth, getMyMenus)
  .delete(auth, deleteMenu);

module.exports = router;
