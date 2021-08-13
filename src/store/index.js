import { createStore } from 'redux';
import { applyMiddleware } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import reducer from '../reducers';

export function configureStore() {
  const store = createStore(reducer, applyMiddleware(thunk, logger));
  return store;
}
