import {
  ADD_MENUITEM_FAIL,
  ADD_MENUITEM_REQUEST,
  ADD_MENUITEM_SUCCESS,
  GET_MENUITEMS_FAIL,
  GET_MENUITEMS_REQUEST,
  GET_MENUITEMS_SUCCESS,
  REMOVE_MENUITEM_FAIL,
  REMOVE_MENUITEM_REQUEST,
  REMOVE_MENUITEM_SUCCESS,
} from "../constants/menuItemConstants";

export const addMenuItemReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_MENUITEM_REQUEST:
      return { loading: true };
    case ADD_MENUITEM_SUCCESS:
      return { loading: false, success: true };
    case ADD_MENUITEM_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const menuItemsReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_MENUITEMS_REQUEST:
      return { loading: true };
    case GET_MENUITEMS_SUCCESS:
      return { loading: false, menuItems: action.payload };
    case GET_MENUITEMS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const removeMenuItemReducer = (state = {}, action) => {
  switch (action.type) {
    case REMOVE_MENUITEM_REQUEST:
      return { loading: true };
    case REMOVE_MENUITEM_SUCCESS:
      return { loading: false, success: true };
    case REMOVE_MENUITEM_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
