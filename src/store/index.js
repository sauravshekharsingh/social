import { createStore } from "redux";
import { applyMiddleware } from "redux";
import thunk from "redux-thunk";
import reducer from "../reducers";

export function configureStore() {
  const store = createStore(reducer, applyMiddleware(thunk));
  return store;
}
