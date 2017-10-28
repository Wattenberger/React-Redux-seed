import "babel-core/register"
import "babel-polyfill"
import React from "react"
import ReactDOM from "react-dom"
import {AppContainer} from 'react-hot-loader'
import {Provider} from "react-redux"
import Routes from "./routes"
import createStore from "./store"

// if (__DEV__) window.Perf = require('react-addons-perf')

const store = createStore()
const appRoot = document.getElementById('app')

const render = Component => {
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <Component />
      </Provider>
    </AppContainer>,
    appRoot,
  )
}

render(Routes)

// Webpack Hot Module Replacement API
if (module.hot) module.hot.accept()
