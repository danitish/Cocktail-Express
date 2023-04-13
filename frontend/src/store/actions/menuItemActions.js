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

import httpService from "../../services/httpService";

export const addMenuItem =
  (menu_id, item_id, item_quantity) => async (dispatch, getState) => {
    try {
      dispatch({ type: ADD_MENUITEM_REQUEST });
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

      await httpService.post(
        "/api/menu_items",
        { menu_id, item_id, item_quantity },
        config
      );
      dispatch({ type: ADD_MENUITEM_SUCCESS });
    } catch (error) {
      dispatch({
        type: ADD_MENUITEM_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const getMenuItems = (menu_id) => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_MENUITEMS_REQUEST });
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

    const { data } = await httpService.get(
      `/api/menu_items/${menu_id}`,
      config
    );
    dispatch({ type: GET_MENUITEMS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_MENUITEMS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const removeMenuItem = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: REMOVE_MENUITEM_REQUEST });
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
    await httpService.delete(`/api/menu_items/${id}`, config);
    dispatch({ type: REMOVE_MENUITEM_SUCCESS });
  } catch (error) {
    dispatch({
      type: REMOVE_MENUITEM_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
