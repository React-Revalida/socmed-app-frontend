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
};

export const updateProfileSuccess = (profile) => {
  return {
    type: "UPDATE_PROFILE_SUCCESS",
    payload: profile,
  };
};

export const updateProfileFailure = (error) => {
  return {
    type: "UPDATE_PROFILE_FAILURE",
    payload: error,
  };
};

export const updateAddressRequest = () => {
  return {
    type: "UPDATE_ADDRESS_REQUEST",
  };
};

export const updateAddressSuccess = (profile) => {
  return {
    type: "UPDATE_ADDRESS_SUCCESS",
    payload: profile,
  };
};

export const updateAddressFailure = (error) => {
  return {
    type: "UPDATE_ADDRESS_FAILURE",
    payload: error,
  };
};

export const resetSuccess = () => {
  return {
    type: "RESET_SUCCESS",
  };
};
export const fetchAuthRequest = () => {
  return {
    type: "FETCH_AUTH_REQUEST",
  };
};

export const fetchLoginSuccess = (accessToken) => {
  return {
    type: "LOGIN_SUCCESS",
    payload: accessToken,
  };
};

export const fetchLoginFailure = (error) => {
  return {
    type: "LOGIN_FAILURE",
    payload: error,
  };
};

export const unexpectedError = (error) => {
  return {
    type: "UNEXPECTED_ERROR",
    payload: error,
  };
}