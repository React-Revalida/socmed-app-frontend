import * as type from "../types";
import * as authService from "../../services/auth";

export const loginUser = (usernameOrEmail, password) => {
  return async (dispatch) => {
    dispatch(type.fetchAuthRequest());
    await authService
      .login(usernameOrEmail, password)
      .then((response) => {
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

export const signUpUser = (userDetailsDTO, pictureUpload) => {
  if (pictureUpload === null) {
    pictureUpload = "";
  }

  const userDetails = JSON.stringify(userDetailsDTO);
  const userDetailsBlob = new Blob([userDetails], {
    type: "application/json",
  });

  const profileImageName = pictureUpload ? pictureUpload.name : null;
  const profileImage = new File([pictureUpload], profileImageName, {
    type: "image/*",
  });

  let formData = new FormData();
  formData.append("user", userDetailsBlob);
  formData.append("profile", profileImage);

  return async (dispatch) => {
    dispatch(type.fetchAuthRequest());
    await authService
      .register(formData)
      .then(async (response) => {
        const isRegistered = response.data;
        await dispatch(type.fetchSignUpSuccess(isRegistered));
      })
      .catch(async (error) => {
        const errors = error.response.data.fieldErrors;
        await dispatch(type.fetchSignUpFailure(errors));
      });
  };
};

export const generateResetPasswordToken = (email) => {
  return async (dispatch) => {
    dispatch(type.fetchResetTokenRequest());
    await authService
      .getResetPasswordToken(email)
      .then((response) => {
        const token = response.data.accessToken;
        localStorage.setItem("resetToken", token);
        dispatch(type.fetchResetTokenSuccess(token));
      })
      .catch((error) => {
        const errorMsg = error.response.data.message;
        dispatch(type.fetchResetTokenFailure(errorMsg));
      });
  };
};

export const resetPassword = (resetToken, password) => {
  return async (dispatch) => {
    dispatch(type.fetchResetPasswordRequest());
    await authService
      .resetPassword(resetToken, password)
      .then((response) => {
        const isReset = response.data;
        localStorage.removeItem("resetToken");
        dispatch(type.fetchResetPasswordSuccess(isReset));
      })
      .catch((error) => {
        const errorMsg = error.response.status;
        console.log(error);
        dispatch(type.fetchResetPasswordFailure(errorMsg));
      });
  };
};
