const Expense = require("../models/expense");
const asyncHandler = require("express-async-handler");

const addExpense = asyncHandler(async (req, res) => {
  const { event_id, name, qty, price_per_unit } = req.body;
  const expense = await Expense.create({
    event_id,
    user_id: req.user._id,
    name,
    qty,
    price_per_unit,
    total_price: qty * price_per_unit,
  });
  if (!expense) {
    res.status(500);
    throw new Error("Internal issue");
  }
  res.status(200);
  res.send(expense);
});

const getExpensesByEvent = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const expenses = await Expense.find({ event_id: id });
  if (!expenses) {
    res.status(404);
    throw new Error("No expenses found");
  }
  res.status(200);
  res.send(expenses);
});

const getMyExpenses = asyncHandler(async (req, res) => {
  const expenses = await Expense.find({ user_id: req.user._id });
  if (!expenses) {
    res.status(404);
    throw new Error("No expenses found");
  }
  res.status(200);
  res.send(expenses);
});

const deleteSingleExpense = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const expense = await Expense.findById(id);
  if (!expense) {
    res.status(404);
    throw new Error("No matching expense found");
  }
  await expense.remove();
  res.status(200);
  res.send("Deleted successfully");
});

module.exports = {
  addExpense,
  getExpensesByEvent,
  getMyExpenses,
  deleteSingleExpense,
};
