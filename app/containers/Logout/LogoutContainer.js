import React, { PropTypes } from 'react'
import { Logout } from 'components'
import { logoutAndUnauth } from 'reduxModules/modules/users'
import { connect } from 'react-redux'

const LogoutContainer = React.createClass({
  propTypes: {
    dispatch: PropTypes.func.isRequired,
  },
  // logout and unauth
  componentDidMount () {
    this.props.dispatch(logoutAndUnauth())
  },
  render () {
    return (
      <Logout />
    )
  },
})
export default connect()(LogoutContainer)
