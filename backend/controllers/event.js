const Event = require("../models/event");
const Menu = require("../models/menu");
const Menu_Item = require("../models/menu_item");
const Expense = require("../models/expense");
const asyncHandler = require("express-async-handler");

const createEvent = asyncHandler(async (req, res) => {
  const {
    event_name,
    event_date,
    estimated_income,
    menu_id,
    attendance,
    event_address,
    lat,
    lng,
  } = req.body;

  let menu_details = {};
  let profit = 0;

  if (menu_id) {
    const menu = await Menu.findById(menu_id);
    if (menu) {
      menu_details.menu_price_per_person = menu.price_per_person;
      menu_details.menu_name = menu.name;
    }
    const menu_items_by_menu_id = await Menu_Item.find({ menu_id }).select(
      "item_id price_per_person -_id"
    );
    const menu_items_by_menu_id_with_qty = menu_items_by_menu_id.map((item) => {
      return { ...item, qty: 0 };
    });
    if (menu_items_by_menu_id_with_qty) {
      menu_details.menu_items = menu_items_by_menu_id_with_qty;
    }
  }

  if (menu_details.menu_price_per_person) {
    profit = estimated_income - menu_details.menu_price_per_person * attendance;
  } else {
    profit = estimated_income;
  }

  const event_location = { address: event_address, lat, lng };

  const event = await Event.create({
    event_name,
    event_date,
    event_location,
    estimated_income,
    menu_id,
    menu_details,
    attendance,
    user_id: req.user._id,
    profit,
  });

  if (!event) {
    res.status(500);
    throw new Error("Internal issue");
  }
  res.status(200);
  res.send(event);
});

const myEvents = asyncHandler(async (req, res) => {
  const events = await Event.find({ user_id: req.user._id }).select("-__v");

  if (!events) {
    res.status(404);
    throw new Error("No events found");
  }

  res.status(200);
  res.send(events.reverse());
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

const updateProfit = asyncHandler(async (req, res) => {
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

  const expenses = await Expense.find({ event_id: id });

  const expenses_total_sum = expenses.reduce(
    (acc, expense) => acc + expense.total_price,
    0
  );

  const menu_total_sum = event.menu_details.menu_price_per_person
    ? event.menu_details.menu_price_per_person * event.attendance
    : 0;

  event.profit = event.estimated_income - expenses_total_sum - menu_total_sum;

  await event.save();

  res.status(200);
  res.send("Profit was successfully edited");
});

const updateMenuItemQty = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { qty, item_id } = req.body;

  if (!id | isNaN(qty) || !item_id) {
    res.status(400);
    throw new Error("Insufficient values provided");
  }
  const event = await Event.findById(id);
  if (!event) {
    res.status(404);
    throw new Error("No matching event found");
  }

  const targetedItem = event.menu_details.menu_items.find(
    (item) => item._id == item_id
  );

  if (!targetedItem) {
    res.status(404);
    throw new Error("No matching menu item found");
  }
  targetedItem.qty = qty;
  await event.save();
  res.status(200);
  res.send("Updated successfully");
});

const editEvent = asyncHandler(async (req, res) => {
  const {
    event_name,
    event_date,
    estimated_income,
    menu_id,
    attendance,
    event_address,
    lat,
    lng,
  } = req.body;
  const { id } = req.params;
  let menu_details = {};

  if (!id) {
    res.status(400);
    throw new Error("Insufficient values provided");
  }

  const event = await Event.findById(id);
  if (!event) {
    res.status(404);
    throw new Error("No matching event found");
  }

  if (menu_id) {
    const menu = await Menu.findById(menu_id);
    if (menu) {
      menu_details.menu_price_per_person = menu.price_per_person;
      menu_details.menu_name = menu.name;
    }
    const menu_items_by_menu_id = await Menu_Item.find({ menu_id }).select(
      "item_id price_per_person -_id"
    );
    const menu_items_by_menu_id_with_qty = menu_items_by_menu_id.map((item) => {
      return { ...item, qty: 0 };
    });
    if (menu_items_by_menu_id_with_qty) {
      menu_details.menu_items = menu_items_by_menu_id_with_qty;
    }
  }

  event.event_name = event_name ? event_name : event.event_name;
  event.event_date = event_date ? event_date : event.event_date;
  event.estimated_income = estimated_income
    ? estimated_income
    : event.estimated_income;
  event.attendance = attendance ? attendance : event.attendance;
  if (event_address && lat && lng) {
    event.event_location.address = event_address;
    event.event_location.lat = lat;
    event.event_location.lng = lng;
  }
  if (menu_id === null || menu_id) {
    event.menu_id = menu_id;
    event.menu_details = menu_details;
  }

  await event.save();
  res.status(200);
  res.send("Updated successfully");
});

module.exports = {
  createEvent,
  myEvents,
  getEventById,
  deleteEvent,
  updateProfit,
  updateMenuItemQty,
  editEvent,
};
