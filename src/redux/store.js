import { createStore, combineReducers, applyMiddleware } from 'redux';

import appReducer from './ducks/app';
import counterReducer, { counterMiddleware } from './ducks/counter';

const mainReducer = combineReducers({
  app: appReducer,
  counter: counterReducer,
});

export default createStore(
  mainReducer,
  applyMiddleware(counterMiddleware),
);
