const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    status: {
      type: Boolean,
      required: true,
      default: true,
    },
    ratio: {
      type: Number,
      required: true,
      default: 100,
    },
    price_per_person: {
      type: Number,
      required: true,
      default: 0,
    },
    user_id: {
      type: mongoose.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  { timestamps: true }
);

const Menu = mongoose.model("menu", schema);

module.exports = Menu;
