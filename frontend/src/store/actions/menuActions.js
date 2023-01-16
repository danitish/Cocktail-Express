import { httpService } from "../../services/httpService";
import {
  ADD_MENU_REQUEST,
  ADD_MENU_SUCCESS,
  ADD_MENU_FAIL,
  MY_MENUS_FAIL,
  MY_MENUS_REQUEST,
  MY_MENUS_SUCCESS,
  MENU_DETAIL_FAIL,
  MENU_DETAIL_REQUEST,
  MENU_DETAIL_SUCCESS,
  UPDATE_RATIO_REQUEST,
  UPDATE_RATIO_SUCCESS,
  UPDATE_RATIO_FAIL,
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

export const getMenuDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: MENU_DETAIL_REQUEST });
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

    const { data } = await httpService.get(`/api/menus/${id}`, config);
    dispatch({ type: MENU_DETAIL_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: MENU_DETAIL_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const updateMenuRatio = (id, ratio) => async (dispatch, getState) => {
  try {
    dispatch({ type: UPDATE_RATIO_REQUEST });
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

    await httpService.put("/api/menus/updateRatio", { id, ratio }, config);
    dispatch({ type: UPDATE_RATIO_SUCCESS });
  } catch (error) {
    dispatch({
      type: UPDATE_RATIO_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
