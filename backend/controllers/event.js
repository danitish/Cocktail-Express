const Event = require("../models/event");
const Menu = require("../models/menu");
const Menu_Item = require("../models/menu_item");
const asyncHandler = require("express-async-handler");

const createEvent = asyncHandler(async (req, res) => {
  const { event_name, event_date, estimated_income, menu_id, attendance } =
    req.body;

  let menu_details = {};

  if (menu_id) {
    const menu = await Menu.findById(menu_id);
    if (menu) {
      menu_details.menu_price_per_person = menu.price_per_person;
      menu_details.menu_name = menu.name;
    }
    const menu_items_by_menu_id = await Menu_Item.find({ menu_id }).select(
      "item_id price_per_person -_id"
    );
    if (menu_items_by_menu_id) {
      menu_details.menu_items = menu_items_by_menu_id;
    }
  }

  const event = await Event.create({
    event_name,
    event_date,
    estimated_income,
    menu_id,
    menu_details,
    attendance,
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

const getEventById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!id) {
    res.status(400);
    throw new Error("Insufficient values provided");
  }
  const event = await Event.findById(id).select("-__v");
  if (!event) {
    throw new Error("No matching event found");
  }
  res.status(200);
  res.send(event);
});

const deleteEvent = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!id) {
    res.status(400);
    throw new Error("Insufficient values provided");
  }
  const event = await Event.findById(id);
  if (!event) {
    res.status(404);
    throw new Error("No matching event found");
  }
  await event.remove();
  res.status(200);
  res.send("Event was removed successfully");
});

module.exports = { createEvent, myEvents, getEventById, deleteEvent };
