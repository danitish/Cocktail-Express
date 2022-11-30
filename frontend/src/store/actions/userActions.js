import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
} from "../constants/userConstants";
import httpService from "../../services/httpService";

export const login =
  ({ email, password }) =>
  async (dispatch) => {
    try {
      dispatch({ type: USER_LOGIN_REQUEST });

      const { data } = await httpService.post("/api/users/login", {
        email,
        password,
      });
      dispatch({ type: USER_LOGIN_SUCCESS, payload: data });

      localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
      dispatch({
        type: USER_LOGIN_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const logout = () => (dispatch) => {
  dispatch({ type: USER_LOGOUT });
  localStorage.removeItem("userInfo");
};
