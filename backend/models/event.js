const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Types.ObjectId,
      ref: "user",
      required: true,
    },
    menu_id: {
      type: mongoose.Types.ObjectId || null,
      ref: "menu",
      required: false,
      default: null,
    },
    menu_details: {
      menu_name: { type: String, required: false, default: "" },
      menu_price_per_person: {
        type: Number,
        required: false,
        default: 0,
      },
      menu_items: [
        {
          item_id: {
            type: mongoose.Types.ObjectId || null,
            required: false,
            default: null,
          },
          price_per_person: {
            type: Number,
            required: false,
            default: 0,
          },
          qty: {
            type: Number,
            required: false,
            default: 0,
          },
        },
      ],
    },
    event_name: {
      type: String,
      required: true,
    },
    event_date: {
      type: Date,
      required: true,
    },
    event_location: {
      address: { type: String, required: true },
      lat: { type: String, required: true },
      lng: { type: String, required: true },
    },
    estimated_income: {
      type: Number,
      required: true,
    },
    attendance: {
      type: Number,
      required: true,
    },
    profit: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Event = mongoose.model("event", schema);

module.exports = Event;
