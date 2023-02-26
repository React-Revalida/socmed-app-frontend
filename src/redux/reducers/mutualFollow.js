const initialState = {
  mutuals: [],
  loading: false,
  success: false,
  error: null,
};

export default function mutualFollowReducer(state = initialState, action) {
  switch (action.type) {
    case "FETCH_MUTUALS_REQUEST":
      return {
        ...state,
        loading: true,
        error: null,
      };
    case "FETCH_MUTUALS_SUCCESS":
      return {
        ...state,
        loading: false,
        mutuals: action.payload,
      };
    case "FETCH_MUTUALS_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.payload,
        mutuals: [],
      };
    default:
      return state;
  }
}
