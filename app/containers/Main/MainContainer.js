import React, { PropTypes } from 'react'
import { Navigation } from 'components'
import { mainContainer, innerContainer } from './styles.css'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as userActionCreators from 'reduxModules/modules/users'
import { checkToken } from 'helpers/utils'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'

const MainContainer = React.createClass({
  propTypes: {

    // users
    isAuthed: PropTypes.bool.isRequired,
    isFetching: PropTypes.bool.isRequired,
    getActiveUser: React.PropTypes.func.isRequired,
    removeFetchingUser: PropTypes.func.isRequired,
  },
  contextTypes: {
    router: PropTypes.object.isRequired,
  },
  componentWillMount () {
    // check if authed and if not, login with token if possible
    if (this.props.isAuthed) {
      this.props.removeFetchingUser()
    } else {
      // if not authed but there is a token
      if (checkToken()) {
        // logging in with token
        this.props.getActiveUser()
      } else {
        // not authed, no token present
        this.props.removeFetchingUser()
        this.context.router.push('/auth')
      }
    }
  },
  // exit active nomination and go to home screen
  goHome () {
    this.context.router.push('/')
  },

  // logout completely
  handleLogout () {
    this.context.router.push('/logout')
  },

  render () {
    return this.props.isFetching === true
    ? null
    : <MuiThemeProvider muiTheme={getMuiTheme()}>
        <div className={mainContainer}>
          <Navigation
            goHome={this.goHome}
            logout={this.handleLogout}/>
          <div className={innerContainer}>
              {this.props.children}
          </div>
        </div>
      </MuiThemeProvider>
  },
})

export default connect(
  ({users}) => ({
    isAuthed: users.isAuthed,
    isFetching: users.isFetching,
  }),
  (dispatch) => bindActionCreators({
    ...userActionCreators,
  }, dispatch)
   )(MainContainer)
