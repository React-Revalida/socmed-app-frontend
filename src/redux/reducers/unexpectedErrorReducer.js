const initialState = {
  error: null,
};

export default function unexpectedErrorReducer(state = initialState, action) {
    switch (action.type) {
        case "UNEXPECTED_ERROR":
            return {
                ...state,
                error: action.payload,
            };
        default:
            return state;
    }
}
