import {
  ADD_EXPENSE_FAIL,
  ADD_EXPENSE_REQUEST,
  ADD_EXPENSE_RESET,
  ADD_EXPENSE_SUCCESS,
  DELETE_EXPENSE_FAIL,
  DELETE_EXPENSE_REQUEST,
  DELETE_EXPENSE_RESET,
  DELETE_EXPENSE_SUCCESS,
  EXPENSES_BY_EVENT_FAIL,
  EXPENSES_BY_EVENT_REQUEST,
  EXPENSES_BY_EVENT_SUCCESS,
} from "../constants/expenseConstants";

export const addExpenseReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_EXPENSE_REQUEST:
      return { loading: true };
    case ADD_EXPENSE_SUCCESS:
      return { loading: false, success: true };
    case ADD_EXPENSE_FAIL:
      return { loading: false, error: action.payload };
    case ADD_EXPENSE_RESET:
      return {};
    default:
      return state;
  }
};

export const getExpensesByEventReducer = (state = {}, action) => {
  switch (action.type) {
    case EXPENSES_BY_EVENT_REQUEST:
      return { loading: true };
    case EXPENSES_BY_EVENT_SUCCESS:
      return { loading: false, expenses: action.payload };
    case EXPENSES_BY_EVENT_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const deleteExpenseReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_EXPENSE_REQUEST:
      return { loading: true };
    case DELETE_EXPENSE_SUCCESS:
      return { loading: false, success: true };
    case DELETE_EXPENSE_FAIL:
      return { loading: false, error: action.payload };
    case DELETE_EXPENSE_RESET:
      return {};
    default:
      return state;
  }
};
