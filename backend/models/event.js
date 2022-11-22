const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Types.ObjectId,
      ref: "user",
      required: true,
    },
    event_name: {
      type: String,
      required: true,
    },
    event_date: {
      type: String,
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
