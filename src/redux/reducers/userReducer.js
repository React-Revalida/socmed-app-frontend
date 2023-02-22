const initialState = {
  profile: {
    address: {},
  },
  loading: false,
  error: {},
  success: false,
  accessToken: null,
};

export default function userReducer (state = initialState, action) {
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
    case "UPDATE_ADDRESS_REQUEST":
      return {
        ...state,
        error: {},
      };
    case "UPDATE_ADDRESS_SUCCESS":
      return {
        ...state,
        profile: action.payload,
        success: true,
      };
    case "UPDATE_ADDRESS_FAILURE":
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
    case "FETCH_AUTH_REQUEST":
      return {
        ...state,
        loading: true,
        error: null,
      };
    case "LOGIN_SUCCESS":
      return {
        ...state,
        loading: false,
        accessToken: action.payload,
      };
    case "LOGIN_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.payload,
        accessToken: null,
      };
    default:
      return state;
  }
}
