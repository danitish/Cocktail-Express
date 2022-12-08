const express = require("express");
const router = express.Router();

const { auth } = require("../middleware/auth");
const { createItem, getMyItems, deleteItem } = require("../controllers/item");

router.route("/").post(auth, createItem).get(auth, getMyItems);

router.delete("/:id", auth, deleteItem);

module.exports = router;
