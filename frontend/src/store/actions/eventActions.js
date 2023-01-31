import {
  ADD_EVENT_FAIL,
  ADD_EVENT_REQUEST,
  ADD_EVENT_SUCCESS,
  MY_EVENTS_FAIL,
  MY_EVENTS_REQUEST,
  MY_EVENTS_SUCCESS,
} from "../constants/eventConstants";

import httpService from "../../services/httpService";

export const myEvents = () => async (dispatch, getState) => {
  try {
    dispatch({ type: MY_EVENTS_REQUEST });
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

    const { data } = await httpService.get("/api/events", config);
    dispatch({ type: MY_EVENTS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: MY_EVENTS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const addEvent = (info) => async (dispatch, getState) => {
  try {
    dispatch({ type: ADD_EVENT_REQUEST });
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

    await httpService.post("/api/events", info, config);
    dispatch({ type: ADD_EVENT_SUCCESS });
  } catch (error) {
    dispatch({
      type: ADD_EVENT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
