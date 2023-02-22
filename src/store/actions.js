import {
  fetchOtherProfileRequest,
  fetchProfileFailure,
  fetchProfileRequest,
  fetchProfileSuccess,
} from "./types";
import * as profileService from "../services/profile";

export const fetchProfile = () => {
  return (dispatch) => {
    dispatch(fetchProfileRequest());
    profileService
      .getProfile()
      .then((response) => {
        console.log(response);
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
}