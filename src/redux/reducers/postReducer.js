const initialState = {
  posts: {
    user: {},
  },
  post: {
    user: {},
  },
  userPosts: {
    user: {},
  },
  loading: true,
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
        posts: action.payload,
      };
    case "FETCH_POSTS_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.payload,
        posts: {},
      };
    case "ADD_POST_REQUEST":
      return {
        ...state,
        error: null,
      };
    case "ADD_POST_SUCCESS":
      return {
        ...state,
        posts: action.payload,
        success: true,
      };
    case "ADD_POST_FAILURE":
      return {
        ...state,
        error: action.payload,
        success: false,
      };
    case "RESET_POST_SUCCESS":
      return {
        ...state,
        success: false,
        loading: false,
      };

    case "FETCH_POST_BY_ID_REQUEST":
      return {
        ...state,
        loading: true,
        error: null,
      };

    case "FETCH_POST_BY_ID_SUCCESS":
      return {
        ...state,
        loading: false,
        post: action.payload,
      };
    case "FETCH_POST_BY_ID_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.payload,
        post: {},
      };

    case "FETCH_USER_POSTS_REQUEST":
      return {
        ...state,
        loading: true,
        error: null,
      };

    case "FETCH_USER_POSTS_SUCCESS":
      return {
        ...state,
        loading: false,
        userPosts: action.payload,
      };
    case "FETCH_USER_POSTS_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.payload,
        userPosts: {},
      };

    case "RESET_LOADING":
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
}
