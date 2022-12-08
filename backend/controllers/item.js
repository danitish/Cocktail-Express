const Item = require("../models/item");
const Menu_Item = require("../models/menu_item");
const asyncHandler = require("express-async-handler");

const createItem = asyncHandler(async (req, res) => {
  const { name, price } = req.body;
  if (!name || !price) {
    res.status(400);
    throw new Error("Insufficient values provided");
  }
  const item = await Item.create({ name, price, user_id: req.user._id });
  if (!item) {
    res.status(500);
    throw new Error("Internal issue");
  }
  res.status(200);
  res.send(item);
});

const getMyItems = asyncHandler(async (req, res) => {
  const items = await Item.find({ user_id: req.user._id });
  if (!items) {
    res.status(404);
    throw new Error("No items found");
  }
  res.status(200);
  res.send(items);
});

const deleteItem = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const item = await Item.findById(id);
  if (!item) {
    res.status(404);
    throw new Error("No matching item found");
  }
  await item.remove();
  await Menu_Item.deleteMany({ item_id: id });

  res.status(200);
  res.send("Item was successfully removed");
});

module.exports = { createItem, getMyItems, deleteItem };
