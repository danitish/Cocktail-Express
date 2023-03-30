import {
  ADD_NOTE_FAIL,
  ADD_NOTE_REQUEST,
  ADD_NOTE_RESET,
  ADD_NOTE_SUCCESS,
  DELETE_NOTE_FAIL,
  DELETE_NOTE_REQUEST,
  DELETE_NOTE_SUCCESS,
  GET_EVENT_NOTES_FAIL,
  GET_EVENT_NOTES_REQUEST,
  GET_EVENT_NOTES_SUCCESS,
} from "../constants/noteConstants";

export const addNoteReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_NOTE_REQUEST:
      return { loading: true };
    case ADD_NOTE_SUCCESS:
      return { loading: false, success: true };
    case ADD_NOTE_FAIL:
      return { loading: false, error: action.payload };
    case ADD_NOTE_RESET:
      return {};
    default:
      return state;
  }
};

export const getNotesByEventReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_EVENT_NOTES_REQUEST:
      return { loading: true };
    case GET_EVENT_NOTES_SUCCESS:
      return { loading: false, notes: action.payload };
    case GET_EVENT_NOTES_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const deleteNoteReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_NOTE_REQUEST:
      return { loading: true };
    case DELETE_NOTE_SUCCESS:
      return { loading: false, success: true };
    case DELETE_NOTE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
