export const fetchProfileRequest = () => {
  return {
    type: "FETCH_PROFILE_REQUEST",
  };
};

export const fetchOtherProfileRequest = (username) => {
  return {
    type: "FETCH_OTHER_PROFILE_REQUEST",
    payload: username,
  };
};

export const fetchProfileSuccess = (profile) => {
  return {
    type: "FETCH_PROFILE_SUCCESS",
    payload: profile,
  };
};

export const fetchProfileFailure = (error) => {
  return {
    type: "FETCH_PROFILE_FAILURE",
    payload: error,
  };
};
