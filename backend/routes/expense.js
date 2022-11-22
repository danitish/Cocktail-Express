const express = require("express");
const router = express.Router();

const { auth } = require("../middleware/auth");
const {
  addExpense,
  getExpensesByEvent,
  getAllMyExpenses,
} = require("../controllers/expense");

router.post("/createExpense", auth, addExpense);
router.post("/getExpensesByEvent", auth, getExpensesByEvent);
router.get("/getAllExpenses", auth, getAllMyExpenses);

module.exports = router;
