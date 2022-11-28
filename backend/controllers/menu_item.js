const Menu_Item = require("../models/menu_item");
const Menu = require("../models/menu");
const Item = require("../models/item");
const asyncHandler = require("express-async-handler");

const createMenuItem = asyncHandler(async (req, res) => {
  const { menu_id, item_id, item_quantity } = req.body;
  if (!menu_id && item_id && item_quantity) {
    res.status(400);
    throw new Error("Insufficient values provided");
  }
  const menu = await Menu.findById(menu_id);
  const item = await Item.findById(item_id);
  if (!menu) {
    res.status(400);
    throw new Error("No matching menu found");
  }
  if (!item) {
    res.status(400);
    throw new Error("No matching item found");
  }
  const menu_item = await Menu_Item.create({
    menu_id,
    item_id,
    item_quantity,
    item_per_person: item_quantity / menu.ratio,
    price_per_person: (item_quantity / menu.ratio) * item.price,
  });
  if (!menu_item) {
    res.status(500);
    throw new Error("Internal error");
  }
  res.status(200);
  res.send(menu_item);
});

module.exports = { createMenuItem };
