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
  const { event_id } = req.params;
  const expenses = await Expense.find({ event_id });
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

module.exports = { addExpense, getExpensesByEvent, getMyExpenses };
