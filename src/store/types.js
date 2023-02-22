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

export const updateProfileRequest = () => {
  return {
    type: "UPDATE_PROFILE_REQUEST",
  };
}

export const updateProfileSuccess = (profile) => {
  return {
    type: "UPDATE_PROFILE_SUCCESS",
    payload: profile,
  };
}

export const updateProfileFailure = (error) => {
  return {
    type: "UPDATE_PROFILE_FAILURE",
    payload: error,
  };
}