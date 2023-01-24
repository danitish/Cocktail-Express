import {
  ADD_MENU_FAIL,
  ADD_MENU_REQUEST,
  ADD_MENU_SUCCESS,
  MY_MENUS_FAIL,
  MY_MENUS_REQUEST,
  MY_MENUS_SUCCESS,
  MENU_DETAIL_FAIL,
  MENU_DETAIL_REQUEST,
  MENU_DETAIL_SUCCESS,
  UPDATE_RATIO_REQUEST,
  UPDATE_RATIO_SUCCESS,
  UPDATE_RATIO_FAIL,
  UPDATE_PRICEPERPERSON_REQUEST,
  UPDATE_PRICEPERPERSON_SUCCESS,
  UPDATE_PRICEPERPERSON_FAIL,
  DELETE_MENU_REQUEST,
  DELETE_MENU_SUCCESS,
  DELETE_MENU_FAIL,
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

export const menuDetailsReducer = (state = {}, action) => {
  switch (action.type) {
    case MENU_DETAIL_REQUEST:
      return { loading: true };
    case MENU_DETAIL_SUCCESS:
      return { loading: false, menu: action.payload };
    case MENU_DETAIL_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const updateRatioReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_RATIO_REQUEST:
      return { loading: true };
    case UPDATE_RATIO_SUCCESS:
      return { loading: false, success: true };
    case UPDATE_RATIO_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const updatePricePerPersonReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_PRICEPERPERSON_REQUEST:
      return { loading: true };
    case UPDATE_PRICEPERPERSON_SUCCESS:
      return { loading: false, success: true };
    case UPDATE_PRICEPERPERSON_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const deleteMenuReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_MENU_REQUEST:
      return { loading: true };
    case DELETE_MENU_SUCCESS:
      return { loading: false, success: true };
    case DELETE_MENU_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
