import {
  ADD_NOTE_FAIL,
  ADD_NOTE_REQUEST,
  ADD_NOTE_SUCCESS,
  DELETE_NOTE_FAIL,
  DELETE_NOTE_REQUEST,
  DELETE_NOTE_SUCCESS,
  GET_EVENT_NOTES_FAIL,
  GET_EVENT_NOTES_REQUEST,
  GET_EVENT_NOTES_SUCCESS,
} from "../constants/noteConstants";
import httpService from "../../services/httpService";

export const addNote = (data) => async (dispatch, getState) => {
  try {
    dispatch({ type: ADD_NOTE_REQUEST });
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

    await httpService.post("/api/notes", data, config);
    dispatch({ type: ADD_NOTE_SUCCESS });
  } catch (error) {
    dispatch({
      type: ADD_NOTE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getMyNotesByEventId = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_EVENT_NOTES_REQUEST });
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

    const { data } = await httpService.get(`/api/notes/${id}`, config);
    dispatch({ type: GET_EVENT_NOTES_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_EVENT_NOTES_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteNote = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: DELETE_NOTE_REQUEST });
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

    await httpService.delete(`/api/notes/${id}`, config);
    dispatch({ type: DELETE_NOTE_SUCCESS });
  } catch (error) {
    dispatch({
      type: DELETE_NOTE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
