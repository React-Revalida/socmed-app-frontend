const initialState = {
  loading: false,
  error: null,
  success: false,
  accessToken: null,
  isRegistered: false,
  resetToken: null,
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case "FETCH_AUTH_REQUEST":
      return {
        ...state,
        loading: true,
        error: null,
        isRegistered: false,
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
    case "SIGNUP_SUCCESS":
      return {
        ...state,
        loading: false,
        isRegistered: true,
        error: null,
      };
    case "SIGNUP_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.payload,
        isRegistered: false,
      };
    case "RESET_TOKEN_REQUEST":
      return {
        ...state,
        loading: true,
        error: null,
      };
    case "RESET_TOKEN_SUCCESS":
      return {
        ...state,
        loading: false,
        resetToken: action.payload,
      };
    case "RESET_TOKEN_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.payload,
        resetToken: null,
      };
    default:
      return state;
  }
}
