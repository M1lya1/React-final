import { createStore, applyMiddleware, combineReducers } from "redux";
import { promiseReducer, authReducer } from "../reducers/reducers";
import thunk from "redux-thunk";

const combinedReducers = combineReducers({
  promise: promiseReducer,
  auth: authReducer,
});

const store = createStore(combinedReducers, applyMiddleware(thunk));

export default store;
