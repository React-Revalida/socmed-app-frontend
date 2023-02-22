import * as type from "./types";
import * as profileService from "../services/profile";

export const fetchProfile = () => {
  return (dispatch) => {
    dispatch(type.fetchProfileRequest());
    profileService
      .getProfile()
      .then((response) => {
        const profile = response.data;
        dispatch(type.fetchProfileSuccess(profile));
      })
      .catch((error) => {
        const errorMsg = error.message;
        dispatch(type.fetchProfileFailure(errorMsg));
      });
  };
};

export const fetchOtherProfile = (username) => {
  return (dispatch) => {
    dispatch(type.fetchOtherProfileRequest(username));
    profileService
      .getOtherProfile(username)
      .then((response) => {
        const profile = response.data;
        dispatch(type.fetchProfileSuccess(profile));
      })
      .catch((error) => {
        const errorMsg = error.message;
        dispatch(type.fetchProfileFailure(errorMsg));
      });
  };
};

export const updateProfile = (profileDTO, profilePic) => {
  if (profilePic === null) {
    profilePic = "";
  }
  const profile = JSON.stringify(profileDTO);
  const profileBlob = new Blob([profile], {
    type: "application/json",
  });
  const profileImage = new File([profilePic], "profile", {
    type: "image/*",
  });
  let formData = new FormData();
  formData.append("user", profileBlob);
  formData.append("profile", profileImage);
  return (dispatch) => {
    dispatch(type.updateProfileRequest());
    profileService
      .updateProfile(formData)
      .then(async (response) => {
        const profile = response.data;
        await dispatch(type.updateProfileSuccess(profile));
      })
      .catch(async (error) => {
        await dispatch(
          type.updateProfileFailure(error.response.data.fieldErrors)
        );
      });
  };
};

export const resetSuccess = () => {
  return (dispatch) => {
    dispatch(type.resetSuccess());
  };
};
