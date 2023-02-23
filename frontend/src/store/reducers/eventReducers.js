import {
  ADD_EVENT_FAIL,
  ADD_EVENT_REQUEST,
  ADD_EVENT_SUCCESS,
  DELETE_EVENT_FAIL,
  DELETE_EVENT_REQUEST,
  DELETE_EVENT_SUCCESS,
  GET_EVENT_FAIL,
  GET_EVENT_REQUEST,
  GET_EVENT_RESET,
  GET_EVENT_SUCCESS,
  MY_EVENTS_FAIL,
  MY_EVENTS_REQUEST,
  MY_EVENTS_SUCCESS,
} from "../constants/eventConstants";

export const myEventsReducer = (state = {}, action) => {
  switch (action.type) {
    case MY_EVENTS_REQUEST:
      return { loading: true };
    case MY_EVENTS_SUCCESS:
      return { loading: false, events: action.payload };
    case MY_EVENTS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const addEventReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_EVENT_REQUEST:
      return { loading: true };
    case ADD_EVENT_SUCCESS:
      return { loading: false, success: true };
    case ADD_EVENT_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const getSingleEventReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_EVENT_REQUEST:
      return { loading: true };
    case GET_EVENT_SUCCESS:
      return { loading: false, event: action.payload };
    case GET_EVENT_FAIL:
      return { loading: false, error: action.payload };
    case GET_EVENT_RESET:
      return {};
    default:
      return state;
  }
};

export const deleteEventReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_EVENT_REQUEST:
      return { loading: true };
    case DELETE_EVENT_SUCCESS:
      return { loading: false, success: true };
    case DELETE_EVENT_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
