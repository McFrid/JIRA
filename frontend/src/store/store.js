import { createStore, applyMiddleware, compose } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

import rootReducer from '../reducers/index';

export class Store {
  static configureStore(...args) {
    let initialState;

    // if only one or mote arguments passed then assume that this is partial init store object
    if (args.length > 0) {
      initialState = Object.assign({}, ...args);
    }

    const composeEnhancers = composeWithDevTools || compose;

    if (process.env.NODE_ENV === 'development') {
      return createStore(
        rootReducer, initialState,
        composeEnhancers(applyMiddleware(thunk, logger)),
      );
    }

    return createStore(rootReducer, initialState, applyMiddleware(thunk));
  }
}

export default Store;
