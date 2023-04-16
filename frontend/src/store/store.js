import { configureStore } from "@reduxjs/toolkit";
import {
  userLoginReducer,
  userProfileReducer,
  userUpdateReducer,
} from "./reducers/userReducers";
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
  removeMenuItemReducer,
} from "./reducers/menuItemReducers";
import {
  myEventsReducer,
  addEventReducer,
  getSingleEventReducer,
  deleteEventReducer,
  updateEventProfitReducer,
  updateEventMenuItemQtyReducer,
  editEventReducer,
} from "./reducers/eventReducers";
import {
  addExpenseReducer,
  getExpensesByEventReducer,
  deleteExpenseReducer,
} from "./reducers/expenseReducers";
import {
  addNoteReducer,
  getNotesByEventReducer,
  deleteNoteReducer,
} from "./reducers/noteReducers";

const reducer = {
  userLogin: userLoginReducer,
  userProfile: userProfileReducer,
  userUpdate: userUpdateReducer,
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
  removeMenuItem: removeMenuItemReducer,
  myEvents: myEventsReducer,
  addEvent: addEventReducer,
  editEvent: editEventReducer,
  getSingleEvent: getSingleEventReducer,
  deleteEvent: deleteEventReducer,
  updateEventProfit: updateEventProfitReducer,
  updateEventMenuItemQty: updateEventMenuItemQtyReducer,
  addExpense: addExpenseReducer,
  getExpensesByEvent: getExpensesByEventReducer,
  deleteExpense: deleteExpenseReducer,
  addNote: addNoteReducer,
  getNotesByEvent: getNotesByEventReducer,
  deleteNote: deleteNoteReducer,
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
