const initialState = {
  loading: false,
  error: null,
  success: false,
  followers: [],
  following: [],
  userFollowed: false,
  loggedInUserFollowing: [],
  whoToFollow: [],
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
    case "FETCH_WHO_TO_FOLLOW_REQUEST":
      return {
        ...state,
        loading: true,
        error: null,
      };
    case "FETCH_WHO_TO_FOLLOW_SUCCESS":
      return {
        ...state,
        loading: false,
        whoToFollow: action.payload,
      };
    case "FETCH_WHO_TO_FOLLOW_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.payload,
        whoToFollow: [],
      };
    case "FETCH_LOGGED_IN_USER_FOLLOWING_SUCCESS":
      return {
        ...state,
        loading: false,
        loggedInUserFollowing: action.payload,
      };
    case "FETCH_LOGGED_IN_USER_FOLLOWING_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.payload,
        loggedInUserFollowing: [],
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
    case "UNFOLLOW_USER_REQUEST":
      return {
        ...state,
        error: null,
      };
    case "UNFOLLOW_USER_SUCCESS":
      return {
        ...state,
        userFollowed: false,
        success: true,
      };
    case "UNFOLLOW_USER_FAILURE":
      return {
        ...state,
        error: action.payload,
        success: false,
      };
    default:
      return state;
  }
}
