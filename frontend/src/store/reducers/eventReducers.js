import {
  ADD_EVENT_FAIL,
  ADD_EVENT_REQUEST,
  ADD_EVENT_SUCCESS,
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
