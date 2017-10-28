import {createStore, applyMiddleware, combineReducers} from 'redux'
// import {combineReducers} from 'redux-immutablejs'
import {mapValues} from 'lodash'
import thunkMiddleware from 'redux-thunk'
import {createLogger} from 'redux-logger'
import promiseMiddleware from 'redux-promise'

import {default as app} from "reducers/appReducer"

const functionsToJs = val => val && typeof val.toJS === "function"
  ? val.toJS()
  : val
const loggerMiddleware = createLogger({
  stateTransformer: state => mapValues(state, functionsToJs),
  predicate: (getState, action) => __DEV__,
  collapsed: true,
  duration: true,
  timestamp: false,
  diff: true,
})

const createStoreWithMiddleware = applyMiddleware(
  promiseMiddleware,
  thunkMiddleware,
  loggerMiddleware
)(createStore)

const rootReducer = combineReducers({
  app
})

// create a Redux instance using the dispatcher function
export default function(initialState) {
  let store = createStoreWithMiddleware(rootReducer, initialState)

  // Enable Webpack hot module replacement for reducers
  if (module.hot) {
    module.hot.accept('reducers/appReducer', () => {
      const nextApp = require("reducers/appReducer")
      store.replaceReducer(nextApp);
    })
  }

  return store
}
