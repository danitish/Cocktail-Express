import {
  GET_MY_ITEMS_FAIL,
  GET_MY_ITEMS_REQUEST,
  GET_MY_ITEMS_SUCCESS,
  ADD_ITEM_FAIL,
  ADD_ITEM_REQUEST,
  ADD_ITEM_SUCCESS,
  REMOVE_ITEM_FAIL,
  REMOVE_ITEM_REQUEST,
  REMOVE_ITEM_SUCCESS,
} from "../constants/itemConstants";

export const addItemReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_ITEM_REQUEST:
      return { loading: true, success: false };
    case ADD_ITEM_SUCCESS:
      return { loading: false, success: true };
    case ADD_ITEM_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const myItemsReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_MY_ITEMS_REQUEST:
      return { loading: true };
    case GET_MY_ITEMS_SUCCESS:
      return { loading: false, items: action.payload };
    case GET_MY_ITEMS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const removeItemReducer = (state = {}, action) => {
  switch (action.type) {
    case REMOVE_ITEM_REQUEST:
      return { loading: true };
    case REMOVE_ITEM_SUCCESS:
      return { loading: false, success: true };
    case REMOVE_ITEM_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
