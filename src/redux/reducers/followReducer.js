const initialState = {
  loading: false,
  error: null,
  success: false,
  followers: [],
  following: [],
  userFollowed: false,
};

export default function followReducer(state = initialState, action) {
  switch (action.type) {
    case "FETCH_FOLLOWS_REQUEST":
      return {
        ...state,
        loading: true,
        error: null,
      };
    case "FETCH_FOLLOWS_SUCCESS":
      return {
        ...state,
        loading: false,
        followers: action.payload,
      };
    case "FETCH_FOLLOWS_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.payload,
        followers: [],
      };
    case "FETCH_FOLLOWING_SUCCESS":
      return {
        ...state,
        loading: false,
        following: action.payload,
      };
    case "FETCH_FOLLOWING_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.payload,
        following: [],
      };
    case "FOLLOW_USER_REQUEST":
      return {
        ...state,
        error: null,
      };
    case "FOLLOW_USER_SUCCESS":
      return {
        ...state,
        userFollowed: true,
        success: true,
      };
    case "FOLLOW_USER_FAILURE":
      return {
        ...state,
        error: action.payload,
        success: false,
      };
    default:
      return state;
  }
}
