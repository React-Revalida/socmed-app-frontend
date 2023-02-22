const initialState = {
  profile: {},
  loading: false,
  error: null,
};
export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_PROFILE_REQUEST":
      return {
        ...state,
        loading: true,
        error: null,
      };
    case "FETCH_OTHER_PROFILE_REQUEST":
      return {
        ...state,
        loading: true,
        error: null,
      };
    case "FETCH_PROFILE_SUCCESS":
      return {
        ...state,
        loading: false,
        profile: action.payload,
      };
    case "FETCH_PROFILE_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.payload,
        profile: null,
      };
    default:
      return state;
  }
};
