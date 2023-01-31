import {
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
