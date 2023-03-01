const initialState = {
  loading: false,
  messages: [],
  error: null,
};

export const chatReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_MESSAGES_REQUEST":
      return {
        ...state,
        loading: true,
      };
    case "FETCH_MESSAGES_SUCCESS":
      return {
        ...state,
        loading: false,
        messages: action.payload,
        error: null,
      };
    case "FETCH_MESSAGES_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
