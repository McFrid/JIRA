import { createStore, applyMiddleware } from 'redux'
import rootReducer from '../reducers/index'
import thunk from 'redux-thunk'
import logger from 'redux-logger'

export class Store {
  static configureStore () {
    let initialState

    // if only one or mote arguments passed then assume that this is partial init store object
    if (arguments.length > 0) {
      initialState = Object.assign({}, ...arguments)
    }

    if (process.env.NODE_ENV === 'development') {
      return createStore(rootReducer, initialState, applyMiddleware(thunk, logger))
    }

    return createStore(rootReducer, initialState, applyMiddleware(thunk))
  }
}

export default Store
