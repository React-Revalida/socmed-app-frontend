const initialState = {
  likes: {},
  loading: false,
  error: null,
  success: false,
};

export default function likeReducer(state = initialState, action) {
  switch (action.type) {
    case "FETCH_LIKES_REQUEST":
      return {
        ...state,
        loading: true,
        error: null,
      };
    case "FETCH_LIKES_SUCCESS":
      return {
        ...state,
        loading: false,
        likes: action.payload,
      };
    case "FETCH_LIKES_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.payload,
        likes: null,
      };
    case "LIKES_POST_REQUEST":
      return {
        ...state,
        error: null,
      };
    case "LIKES_POST_SUCCESS":
      return {
        ...state,
        success: action.payload,
      };
    case "LIKES_POST_FAILURE":
      return {
        ...state,
        error: action.payload,
      };
    case "UNLIKES_POST_REQUEST":
      return {
        ...state,
        error: null,
      };
    case "UNLIKES_POST_SUCCESS":
      return {
        ...state,
        success: action.payload,
      };
    case "UNLIKES_POST_FAILURE":
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
}
