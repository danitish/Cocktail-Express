import { httpService } from "../../services/httpService";
import {
  ADD_MENU_REQUEST,
  ADD_MENU_SUCCESS,
  ADD_MENU_FAIL,
  MY_MENUS_FAIL,
  MY_MENUS_REQUEST,
  MY_MENUS_SUCCESS,
} from "../constants/menuConstants";

export const addMenu = (info) => async (dispatch, getState) => {
  try {
    dispatch({ type: ADD_MENU_REQUEST });
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

    const { data } = await httpService.post("/api/menus", info, config);
    dispatch({ type: ADD_MENU_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ADD_MENU_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const getMyMenus = () => async (dispatch, getState) => {
  try {
    dispatch({ type: MY_MENUS_REQUEST });
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

    const { data } = await httpService.get("/api/menus", config);
    dispatch({ type: MY_MENUS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: MY_MENUS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
