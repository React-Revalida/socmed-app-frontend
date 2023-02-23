const initialState = {
  comments: [],
  loading: false,
  error: null,
  success: false,
};

export default function commentReducer(state = initialState, action) {
  switch (action.type) {
    case "FETCH_COMMENTS_REQUEST":
      return {
        ...state,
        loading: true,
        error: null,
      };
    case "FETCH_COMMENTS_SUCCESS":
      return {
        ...state,
        loading: false,
        comments: action.payload,
      };
    case "FETCH_COMMENTS_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.payload,
        comments: null,
      };
    case "COMMENT_POST_REQUEST":
      return {
        ...state,
        error: null,
      };
    case "COMMENT_POST_SUCCESS":
      return {
        ...state,
        success: action.payload,
      };
    case "COMMENT_POST_FAILURE":
      return {
        ...state,
        error: action.payload,
      };
    case "UNCOMMENT_POST_REQUEST":
      return {
        ...state,
        error: null,
      };
    case "UNCOMMENT_POST_SUCCESS":
      return {
        ...state,
        success: action.payload,
      };
    case "UNCOMMENT_POST_FAILURE":
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
}
