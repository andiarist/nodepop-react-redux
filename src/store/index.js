import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import * as reducers from './reducers';

import * as api from '../api';

const reducer = combineReducers(reducers);

export function configureStore(preloadedState) {
  const middlewares = [thunk.withExtraArgument({ api })];
  const store = createStore(
    reducer,
    preloadedState,
    composeWithDevTools(applyMiddleware(...middlewares)),
  );
  return store;
}
