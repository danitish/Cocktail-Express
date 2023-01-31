const Event = require("../models/event");
const asyncHandler = require("express-async-handler");

const createEvent = asyncHandler(async (req, res) => {
  const { event_name, event_date, estimated_income, menu_id } = req.body;
  const event = await Event.create({
    event_name,
    event_date,
    estimated_income,
    menu_id,
    user_id: req.user._id,
  });
  if (!event) {
    res.status(500);
    throw new Error("Internal issue");
  }
  res.status(200);
  res.send(event);
});

const myEvents = asyncHandler(async (req, res) => {
  const events = await Event.find({ user: req.user._id }).select("-__v");
  if (!events) {
    res.status(404);
    throw new Error("No events found");
  }
  res.status(200);
  res.send(events);
});

module.exports = { createEvent, myEvents };
