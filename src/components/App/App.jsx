import React, {Component} from "react"
import {Route} from 'react-router-dom'
import {connect} from "react-redux"
import classNames from "classnames"

import Home from "components/Home/Home"

// require('styles/app.less')
require('./App.less')

@connect(state => ({}))
class App extends Component {
  getClassName() {
    return classNames("App")
  }

  render() {
    return (
      <div className={this.getClassName()}>
        <Route exact path={this.props.match.path} component={Home} />
      </div>
    )
  }
}

export default App
