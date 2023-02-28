const express = require("express");
const router = express.Router();

const { auth } = require("../middleware/auth");
const {
  addExpense,
  getExpensesByEvent,
  getMyExpenses,
} = require("../controllers/expense");

router.route("/").post(auth, addExpense).get(auth, getMyExpenses);
router.get("/:event_id", auth, getExpensesByEvent);

module.exports = router;
