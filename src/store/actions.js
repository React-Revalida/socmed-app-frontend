import {
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
