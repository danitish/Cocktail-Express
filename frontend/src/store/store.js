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
} from "./reducers/menuReducers";

const reducer = {
  userLogin: userLoginReducer,
  addItem: addItemReducer,
  myItems: myItemsReducer,
  removeItem: removeItemReducer,
  addMenu: addMenuReducer,
  myMenus: myMenusReducer,
  menuDetails: menuDetailsReducer,
  updateRatio: updateRatioReducer,
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
