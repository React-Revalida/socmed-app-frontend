import {
  fetchAuthRequest,
  fetchLoginFailure,
  fetchProfileFailure,
  fetchProfileRequest,
  fetchLoginSuccess,
  fetchProfileSuccess,
} from "../types";
import * as profileService from "../../services/profile";
import * as authService from "../../services/auth";

export const fetchProfile = () => {
  return async (dispatch) => {
    dispatch(fetchProfileRequest());
    profileService
      .getProfile()
      .then((response) => {
        console.log(response.data);
        const profile = response.data;
        dispatch(fetchProfileSuccess(profile));
      })
      .catch((error) => {
        const errorMsg = error.message;
        dispatch(fetchProfileFailure(errorMsg));
      });
  };
};

export const loginUser = (usernameOrEmail, password) => {
  return async (dispatch) => {
    dispatch(fetchAuthRequest());
    authService
      .login(usernameOrEmail, password)
      .then((response) => {
        //console.log(response);
        localStorage.setItem("accessToken", response.data.accessToken);
        const accessToken = response.data.accessToken;
        dispatch(fetchLoginSuccess(accessToken));
      })
      .catch((error) => {
        const errorMsg = error.message;
        dispatch(fetchLoginFailure(errorMsg));
      });
  };
};

export const logoutUser = () => {
  return async (dispatch) => {
    dispatch(fetchAuthRequest());
    authService
      .logout()
      .then((response) => {
        console.log(response);
        dispatch(fetchLoginSuccess(null));
      })
      .catch((error) => {
        const errorMsg = error.message;
        dispatch(fetchLoginFailure(errorMsg));
      });
  };
};
