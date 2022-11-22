const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    menu_id: {
      type: mongoose.Types.ObjectId,
      ref: "menu",
      required: true,
    },
    item_id: {
      type: mongoose.Types.ObjectId,
      ref: "item",
      required: true,
    },
    qty_per_person: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const Menu_item = mongoose.model("menu_item", schema);

module.exports = Menu_item;
