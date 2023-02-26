import * as type from "../types";
import * as profileService from "../../services/profile";

export const fetchProfile = () => {
  return async (dispatch) => {
    dispatch(type.fetchProfileRequest());
    await profileService
      .getProfile()
      .then(async (response) => {
        console.log(response.data);
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
  return async (dispatch) => {
    dispatch(type.fetchOtherProfileRequest(username));
    await profileService
      .getOtherProfile(username)
      .then((response) => {
        const profile = response.data;
        dispatch(type.fetchOtherProfileSuccess(profile));
      })
      .catch((error) => {
        dispatch(type.fetchOtherProfileFailure(error));
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
        await dispatch(fetchProfile());
      })
      .catch(async (error) => {
        await dispatch(
          type.updateProfileFailure(error.response.data.fieldErrors)
        );
      });
  };
};

export const updateAddress = (addressDTO) => {
  return (dispatch) => {
    dispatch(type.updateAddressRequest());
    profileService
      .updateAddress(addressDTO)
      .then(async (response) => {
        const profile = response.data;
        await dispatch(type.updateAddressSuccess(profile));
        await dispatch(fetchProfile());
      })
      .catch(async (error) => {
        await dispatch(
          type.updateAddressFailure(error.response.data.fieldErrors)
        );
      });
  };
};

export const resetSuccess = () => {
  return (dispatch) => {
    dispatch(type.resetSuccess());
  };
};
