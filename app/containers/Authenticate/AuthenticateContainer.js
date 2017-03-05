// Authentication page

import React, { PropTypes } from 'react'
import { Authenticate } from 'components'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { checkToken } from 'helpers/utils'
import * as userActionCreators from 'reduxModules/modules/users'

const AuthenticateContainer = React.createClass({
  propTypes: {
    // users
    loginWithCredentials: PropTypes.func.isRequired,
    getActiveUser: React.PropTypes.func.isRequired,
    error: PropTypes.string.isRequired,

    // routing.locationBeforeTransitions.state.nextPathname
    nextPathname: PropTypes.string.isRequired,
  },

  contextTypes: {
    router: PropTypes.object.isRequired,
  },

  getInitialState () {
    return {
      canSubmit: false,
    }
  },

  handleAuth (user, password) {
    if (checkToken()) {
      // logging in with token
      this.props.getActiveUser()
      .then(() => this.context.router.push(this.props.nextPathname))
    } else {
     // logging in with credentials
      this.props.loginWithCredentials(user, password)
      .then(() => this.context.router.push(this.props.nextPathname))
    }
  },

  enableButton () {
    this.setState({ canSubmit: true })
  },

  disableButton () {
    this.setState({ canSubmit: false })
  },

  handleSubmit (data) {
    const userId = data.userId
    const password = data.password
    this.handleAuth(userId, password)
  },

  styles: {
    paperStyle: {
      width: 300,
      margin: 'auto',
      padding: 20,
    },
    switchStyle: {
      marginBottom: 16,
    },
    submitStyle: {
      marginTop: 32,
    },
  },
  notifyFormError (data) {
    console.error('Form error:', data)
  },
  render () {
    return (
      <Authenticate
        error={this.props.error}
        handleSubmit={this.handleSubmit}
        canSubmit={this.state.canSubmit}
        enableButton={this.enableButton}
        disableButton={this.disableButton}
        styles={this.styles}
        notifyFormError={this.notifyFormError}/>
    )
  },
})

function mapStateToProps (state) {
  const rstate = state.routing.locationBeforeTransitions.state
  return {
    error: state.users.error,
    nextPathname: rstate != null ? rstate.nextPathname : '/',
  }
}

export default connect(
  ({users}) => mapStateToProps,
  (dispatch) => bindActionCreators(userActionCreators, dispatch)
  )(AuthenticateContainer)
