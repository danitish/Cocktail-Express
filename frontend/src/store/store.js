import { configureStore } from "@reduxjs/toolkit";
import { userLoginReducer } from "./reducers/userReducers";
import {
  myItemsReducer,
  addItemReducer,
  removeItemReducer,
} from "./reducers/itemReducers";
import {
  addMenuReducer,
  myMenusReducer,
  menuDetailsReducer,
  updateRatioReducer,
  updatePricePerPersonReducer,
  deleteMenuReducer,
} from "./reducers/menuReducers";
import {
  addMenuItemReducer,
  menuItemsReducer,
} from "./reducers/menuItemReducers";
import { myEventsReducer } from "./reducers/eventReducers";

const reducer = {
  userLogin: userLoginReducer,
  addItem: addItemReducer,
  myItems: myItemsReducer,
  removeItem: removeItemReducer,
  addMenu: addMenuReducer,
  deleteMenu: deleteMenuReducer,
  myMenus: myMenusReducer,
  menuDetails: menuDetailsReducer,
  updateRatio: updateRatioReducer,
  updatePricePerPerson: updatePricePerPersonReducer,
  addMenuItem: addMenuItemReducer,
  menuItems: menuItemsReducer,
  myEvents: myEventsReducer,
};

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const preloadedState = {
  userLogin: { userInfo: userInfoFromStorage },
};

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  devTools: true,
  preloadedState,
});
