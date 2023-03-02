import {
  ADD_EXPENSE_FAIL,
  ADD_EXPENSE_REQUEST,
  ADD_EXPENSE_SUCCESS,
  DELETE_EXPENSE_FAIL,
  DELETE_EXPENSE_REQUEST,
  DELETE_EXPENSE_SUCCESS,
  EXPENSES_BY_EVENT_FAIL,
  EXPENSES_BY_EVENT_REQUEST,
  EXPENSES_BY_EVENT_SUCCESS,
} from "../constants/expenseConstants";
import httpService from "../../services/httpService";

export const addExpense = (event_id, info) => async (dispatch, getState) => {
  try {
    dispatch({ type: ADD_EXPENSE_REQUEST });
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

    await httpService.post("/api/expenses", { event_id, ...info }, config);
    dispatch({ type: ADD_EXPENSE_SUCCESS });
  } catch (error) {
    dispatch({
      type: ADD_EXPENSE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const getExpensesByEventId =
  (event_id) => async (dispatch, getState) => {
    try {
      dispatch({ type: EXPENSES_BY_EVENT_REQUEST });
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
        `/api/expenses/${event_id}`,
        config
      );
      dispatch({ type: EXPENSES_BY_EVENT_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: EXPENSES_BY_EVENT_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
export const deleteExpense = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: DELETE_EXPENSE_REQUEST });
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

    await httpService.delete(`/api/expenses/${id}`, config);
    dispatch({ type: DELETE_EXPENSE_SUCCESS });
  } catch (error) {
    dispatch({
      type: DELETE_EXPENSE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
