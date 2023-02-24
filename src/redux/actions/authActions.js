import * as type from "../types";
import * as authService from "../../services/auth";

export const loginUser = (usernameOrEmail, password) => {
  return async (dispatch) => {
    dispatch(type.fetchAuthRequest());
    await authService
      .login(usernameOrEmail, password)
      .then((response) => {
        //console.log(response);
        localStorage.setItem("accessToken", response.data.accessToken);
        const accessToken = response.data.accessToken;
        dispatch(type.fetchLoginSuccess(accessToken));
      })
      .catch((error) => {
        const errorMsg = error.message;
        dispatch(type.fetchLoginFailure(errorMsg));
      });
  };
};

export const logoutUser = () => {
  return async (dispatch) => {
    dispatch(type.fetchAuthRequest());
    authService.logout();
    dispatch(type.fetchLoginSuccess(null));
  };
};
