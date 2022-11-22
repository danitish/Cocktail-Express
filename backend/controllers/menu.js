const Menu = require("../models/menu");
const asyncHandler = require("express-async-handler");

const createMenu = asyncHandler(async (req, res) => {
  const { name } = req.body;
  if (!name) {
    res.status(400);
    throw new Error("Insufficient values provided");
  }

  const menu = await Menu.create({ name, user_id: req.user._id });
  if (!menu) {
    res.status(500);
    throw new Error("Internal error");
  }
  res.status(200);
  res.send(menu);
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

module.exports = { createMenu, getMyMenus, deleteMenu };
