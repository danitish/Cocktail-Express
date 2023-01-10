import {
  ADD_MENU_FAIL,
  ADD_MENU_REQUEST,
  ADD_MENU_SUCCESS,
  MY_MENUS_FAIL,
  MY_MENUS_REQUEST,
  MY_MENUS_SUCCESS,
} from "../constants/menuConstants";

export const addMenuReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_MENU_REQUEST:
      return { loading: true };
    case ADD_MENU_SUCCESS:
      return { loading: false, success: true };
    case ADD_MENU_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const myMenusReducer = (state = {}, action) => {
  switch (action.type) {
    case MY_MENUS_REQUEST:
      return { loading: true };
    case MY_MENUS_SUCCESS:
      return { loading: false, menus: action.payload };
    case MY_MENUS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
