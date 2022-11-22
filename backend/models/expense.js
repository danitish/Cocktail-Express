const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    event_id: {
      type: mongoose.Types.ObjectId,
      ref: "event",
      required: true,
    },
    user_id: {
      type: mongoose.Types.ObjectId,
      ref: "user",
      required: true,
    },
    expense_name: {
      type: String,
      required: true,
    },
    qty: {
      type: Number,
      required: true,
    },
    price_per_unit: {
      type: Number,
      required: true,
    },
    total_price: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Expense = mongoose.model("expense", schema);

module.exports = Expense;
