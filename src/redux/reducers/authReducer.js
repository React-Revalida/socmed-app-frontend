const initialState = {
  loading: false,
  error: null,
  success: false,
  accessToken: null,
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
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
