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
import { httpService } from "../../services/httpService";

export const addItem = (item) => async (dispatch, getState) => {
  try {
    dispatch({ type: ADD_ITEM_REQUEST });
    const {
      userLogin: {
        userInfo: { token },
      },
    } = getState();

    const config = {
      headers: {
        authorization: `Bearer ${token}`,
      },
    };

    const { data } = await httpService.post("/api/items", item, config);
    dispatch({ type: ADD_ITEM_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ADD_ITEM_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getMyItems = () => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_MY_ITEMS_REQUEST });
    const {
      userLogin: {
        userInfo: { token },
      },
    } = getState();

    const config = {
      headers: {
        authorization: `Bearer ${token}`,
      },
    };

    const { data } = await httpService.get("/api/items", config);
    dispatch({ type: GET_MY_ITEMS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_MY_ITEMS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const removeItem = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: REMOVE_ITEM_REQUEST });
    const {
      userLogin: {
        userInfo: { token },
      },
    } = getState();

    const config = {
      headers: {
        authorization: `Bearer ${token}`,
      },
    };

    await httpService.delete(`/api/items/${id}`, config);
    dispatch({ type: REMOVE_ITEM_SUCCESS });
  } catch (error) {
    dispatch({
      type: REMOVE_ITEM_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
