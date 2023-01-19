const Menu = require("../models/menu");
const Menu_Item = require("../models/menu_item");
const Item = require("../models/item");
const asyncHandler = require("express-async-handler");

const createMenu = asyncHandler(async (req, res) => {
  const { name, description } = req.body;
  if (!name || !description) {
    res.status(400);
    throw new Error("Insufficient values provided");
  }

  const menu = await Menu.create({ name, description, user_id: req.user._id });
  if (!menu) {
    res.status(500);
    throw new Error("Internal error");
  }
  res.status(200);
  res.send(menu);
});

const getMenuById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!id) {
    res.status(400);
    throw new Error("Invalid inputs received");
  }
  const menu = await Menu.findById(id);
  if (!menu) {
    res.status(404);
    throw new Error("No menu found");
  }
  res.status(200);
  res.send(menu);
});

const updateRatio = asyncHandler(async (req, res) => {
  const { ratio, id } = req.body;
  if (!ratio || !id) {
    res.status(400);
    throw new Error("Insufficient values provided");
  }
  const menu = await Menu.findById(id);

  if (!menu) {
    res.status(400);
    throw new Error("Unable to find the menu");
  }
  menu.ratio = ratio;

  const menu_items = await Menu_Item.find({ menu_id: id });

  if (menu_items && menu_items.length) {
    for (let menu_item of menu_items) {
      const item = await Item.findById(menu_item.item_id);
      menu_item.item_per_person = menu_item.item_quantity / menu.ratio;
      menu_item.price_per_person =
        (menu_item.item_quantity / menu.ratio) * item.price;
      menu_item.save();
    }
  }
  await menu.save();

  res.status(200);
  res.send("Ratio was updated successfully");
});

const updatePricePerPerson = asyncHandler(async (req, res) => {
  const { id } = req.body;
  if (!id) {
    res.status(400);
    throw new Error("Insufficient values provided");
  }
  const menu_items = await Menu_Item.find({ menu_id: id });
  const menu = await Menu.findById(id);

  if (!menu) {
    res.status(400);
    throw new Error("Unable to find the menu");
  }

  menu.price_per_person = menu_items.reduce(
    (acc, item) => acc + item.price_per_person,
    0
  );
  await menu.save();
  res.status(200);
  res.send("Updated");
});

const getMyMenus = asyncHandler(async (req, res) => {
  const menus = await Menu.find({ user_id: req.user._id });
  if (!menus) {
    res.status(404);
    throw new Error("No menus found");
  }
  res.status(200);
  res.send(menus);
});

const deleteMenu = asyncHandler(async (req, res) => {
  const { id } = req.body;
  const menu = await Menu.findById(id);
  if (!menu) {
    res.status(404);
    throw new Error("No matching menu found");
  }
  await menu.delete();
  res.send(200);
  res.send("Menu deleted successfully");
});

module.exports = {
  createMenu,
  getMyMenus,
  deleteMenu,
  updateRatio,
  updatePricePerPerson,
  getMenuById,
};
