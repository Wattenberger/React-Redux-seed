import React, {Component} from "react"
import PropTypes from "prop-types"

require('./Home.less')

class Home extends Component {
  static propTypes = {
  }

  getClassName() {
    return classNames("Home")
  }

  render() {
      return (
          <div className="Home">
            <h1>asfsafjjkj</h1>
          </div>
      )
  }
}

export default Home
