const express = require("express");
const router = express.Router();

const { auth } = require("../middleware/auth");
const {
  addExpense,
  getExpensesByEvent,
  getMyExpenses,
  deleteSingleExpense,
} = require("../controllers/expense");

router.route("/").post(auth, addExpense).get(auth, getMyExpenses);
router
  .route("/:id")
  .get(auth, getExpensesByEvent)
  .delete(auth, deleteSingleExpense);

module.exports = router;
