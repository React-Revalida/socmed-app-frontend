import profileReducer from "./reducers/profileReducer";
import authReducer from "./reducers/authReducer";
import likeReducer from "./reducers/likeReducer";
import commentReducer from "./reducers/commentReducer";
import postReducer from "./reducers/postReducer";

import { createStore, applyMiddleware, combineReducers, compose } from "redux";

import thunk from "redux-thunk";
import unexpectedErrorReducer from "./reducers/unexpectedErrorReducer";

const initialState = {};

const middleware = [thunk];

const reducers = combineReducers({
  user: profileReducer,
  post: postReducer,
  unexpectedError: unexpectedErrorReducer,
  auth: authReducer,
  like: likeReducer,
  comment: commentReducer,
  post: postReducer,
});

const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const enhancer = composeEnhancers(applyMiddleware(...middleware));
const store = createStore(reducers, initialState, enhancer);

export default store;
