const initialState = {
  profile: {
    address: {},
  },
  otherProfile: {
    address: {},
  },
  loading: false,
  error: null,
  success: false,
  allUsers: [],
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case "FETCH_PROFILE_REQUEST":
      return {
        ...state,
        loading: true,
        error: null,
      };
    case "FETCH_PROFILE_SUCCESS":
      return {
        ...state,
        loading: false,
        profile: action.payload,
      };
    case "FETCH_PROFILE_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.payload,
        profile: {},
      };
    case "FETCH_OTHER_PROFILE_REQUEST":
      return {
        ...state,
        loading: true,
        error: null,
      };
    case "FETCH_OTHER_PROFILE_SUCCESS":
      return {
        ...state,
        loading: false,
        otherProfile: action.payload,
      };
    case "FETCH_OTHER_PROFILE_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.payload,
        otherProfile: {},
      };
    case "UPDATE_PROFILE_REQUEST":
      return {
        ...state,
        error: null,
      };
    case "UPDATE_PROFILE_SUCCESS":
      return {
        ...state,
        profile: action.payload,
        success: true,
      };
    case "UPDATE_PROFILE_FAILURE":
      return {
        ...state,
        error: action.payload,
        success: false,
      };
    case "UPDATE_ADDRESS_REQUEST":
      return {
        ...state,
        error: null,
      };
    case "UPDATE_ADDRESS_SUCCESS":
      return {
        ...state,
        profile: action.payload,
        success: true,
      };
    case "UPDATE_ADDRESS_FAILURE":
      return {
        ...state,
        error: action.payload,
        success: false,
      };
    case "RESET_SUCCESS":
      return {
        ...state,
        success: false,
        loading: true,
      };
    case "FETCH_ALL_USERS_REQUEST":
      return {
        ...state,
        loading: true,
        error: null,
      };
    case "FETCH_ALL_USERS_SUCCESS":
      return {
        ...state,
        loading: false,
        allUsers: action.payload,
      };
    case "FETCH_ALL_USERS_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.payload,
        allUsers: [],
      };
    default:
      return state;
  }
}
