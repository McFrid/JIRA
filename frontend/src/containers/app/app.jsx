import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import App from '../../components/app/app'
import * as appActions from '../../actions/app/app'

class AppContainer extends Component {
  render () {
    return (
      <App />
    )
  }
}

const mapStateToProps = state => ({
  app: state.app
})

const mapDispatchToProps = dispatch => ({
  appActions: bindActionCreators(appActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AppContainer))

