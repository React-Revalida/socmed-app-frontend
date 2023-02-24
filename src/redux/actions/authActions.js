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

export const signUpUser = (userDetailsDTO, pictureUpload) => {
  if (pictureUpload === null) {
    pictureUpload = "";
  }

  const userDetails = JSON.stringify(userDetailsDTO);
  const userDetailsBlob = new Blob([userDetails], {
    type: "application/json",
  });

  console.log(userDetails);

  const profileImage = new File([pictureUpload], "profile", {
    type: "image/*",
  });

  let formData = new FormData();
  formData.append("user", userDetailsBlob);
  formData.append("profile", profileImage);

  return (dispatch) => {
    dispatch(type.fetchAuthRequest());
    authService
      .register(formData)
      .then(async (response) => {
        const isRegistered = response.data;
        await dispatch(type.fetchSignUpSuccess(isRegistered));
      })
      .catch(async (error) => {
        const errorMsg = error.message;
        await dispatch(type.fetchSignUpFailure(errorMsg));
      });
  };
};
