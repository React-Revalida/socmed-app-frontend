const initialState = {
  profile: {},
  loading: false,
  error: {},
  success: false,
};
export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_PROFILE_REQUEST":
      return {
        ...state,
        loading: true,
        error: {},
      };
    case "FETCH_OTHER_PROFILE_REQUEST":
      return {
        ...state,
        loading: true,
        error: {},
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
        profile: {},
      };
    case "UPDATE_PROFILE_REQUEST":
      return {
        ...state,
        error: {},
      };
    case "UPDATE_PROFILE_SUCCESS":
      return {
        ...state,
        profile: action.payload,
        success: true,
      };
    case "UPDATE_PROFILE_FAILURE":
      return {
        ...state,
        error: action.payload,
        success: false,
      };
    case "RESET_SUCCESS":
      return {
        ...state,
        success: false,
      };
    default:
      return state;
  }
};
