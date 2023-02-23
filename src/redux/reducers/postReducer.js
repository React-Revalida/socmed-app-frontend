const initialState = {
  posts: {
    user: {},
  },
  loading: false,
  error: null,
  success: false,
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case "FETCH_POSTS_REQUEST":
      return {
        ...state,
        loading: true,
        error: null,
      };
    case "FETCH_POSTS_SUCCESS":
      return {
        ...state,
        loading: false,
        posts: [...action.payload],
      };
    case "FETCH_POSTS_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.payload,
        posts: {},
      };
    default:
      return state;
  }
}
