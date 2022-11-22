const Menu_Item = require("../models/menu_item");
const asyncHandler = require("express-async-handler");

const createMenuItem = asyncHandler(async (req, res) => {
  const { menu_id, item_id, qty_per_person } = req.body;
  const menu_item = await Menu_Item.create({
    menu_id,
    item_id,
    qty_per_person,
  });
  if (!menu_item) {
    res.status(500);
    throw new Error("Internal issue");
  }
  res.status(200);
  res.send(menu_item);
});

module.exports = { createMenuItem };
