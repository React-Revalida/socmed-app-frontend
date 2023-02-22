export const fetchProfileRequest = () => {
  return {
    type: "FETCH_PROFILE_REQUEST",
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
