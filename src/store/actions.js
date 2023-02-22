import {
  fetchOtherProfileRequest,
  fetchProfileFailure,
  fetchProfileRequest,
  fetchProfileSuccess,
  updateProfileRequest,
  updateProfileSuccess,
  updateProfileFailure,
} from "./types";
import * as profileService from "../services/profile";

export const fetchProfile = () => {
  return (dispatch) => {
    dispatch(fetchProfileRequest());
    profileService
      .getProfile()
      .then((response) => {
        const profile = response.data;
        dispatch(fetchProfileSuccess(profile));
      })
      .catch((error) => {
        const errorMsg = error.message;
        dispatch(fetchProfileFailure(errorMsg));
      });
  };
};

export const fetchOtherProfile = (username) => {
  return (dispatch) => {
    dispatch(fetchOtherProfileRequest(username));
    profileService
      .getOtherProfile(username)
      .then((response) => {
        const profile = response.data;
        dispatch(fetchProfileSuccess(profile));
      })
      .catch((error) => {
        const errorMsg = error.message;
        dispatch(fetchProfileFailure(errorMsg));
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
  return async (dispatch) => {
    dispatch(updateProfileRequest());
    await profileService
      .updateProfile(formData)
      .then((response) => {
        const profile = response.data;
        dispatch(updateProfileSuccess(profile));
        console.log(profile);
      })
      .catch((error) => {
        dispatch(updateProfileFailure(error.response.data.fieldErrors));
      });
  };
};
