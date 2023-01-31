const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Types.ObjectId,
      ref: "user",
      required: true,
    },
    menu_id: {
      type: mongoose.Types.ObjectId,
      ref: "menu",
      required: true,
      default: null,
    },
    event_name: {
      type: String,
      required: true,
    },
    event_date: {
      type: Date,
      required: true,
    },
    estimated_income: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Event = mongoose.model("event", schema);

module.exports = Event;
