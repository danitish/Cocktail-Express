const express = require("express");
const { auth } = require("../middleware/auth");
const {
  createMenu,
  deleteMenu,
  getMyMenus,
  updateRatio,
  updatePricePerPerson,
} = require("../controllers/menu");

const router = express.Router();

router
  .route("/")
  .post(auth, createMenu)
  .get(auth, getMyMenus)
  .delete(auth, deleteMenu);

router.put("/updateRatio", auth, updateRatio);
router.put("/updatePricePerPerson", auth, updatePricePerPerson);
module.exports = router;
