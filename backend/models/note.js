const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Types.ObjectId,
      ref: "user",
      required: true,
    },
    event_id: {
      type: mongoose.Types.ObjectId,
      ref: "event",
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Note = mongoose.model("note", schema);

module.exports = Note;
