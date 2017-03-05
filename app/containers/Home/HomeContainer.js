import React, { PropTypes } from 'react'
import { Home } from 'components'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as userActionCreators from 'reduxModules/modules/users'
import * as postsActionCreators from 'reduxModules/modules/posts'

const HomeContainer = React.createClass({
  propTypes: {
    // users
    error: PropTypes.string.isRequired,
    getUser: React.PropTypes.func.isRequired,
    getPost: React.PropTypes.func.isRequired,
  },
  contextTypes: {
    router: PropTypes.object.isRequired,
  },

  // fecth smth on load here
  componentDidMount () {

  },

  styles: {
    buttonStyle: {
      marginBottom: 20,
    },
  },

  fetchUser () {
    this.props.getUser('123')
  },

  fetchPost() {
    this.props.getPost('123')
  },

  render () {
    return (
      <Home
        isFetching={false}
        getUser={this.fetchUser}
        getPost={this.fetchPost}
        error={this.props.error}
        styles={this.styles}/>
    )
  },
})

function mapStateToProps ({users}, props) {
  const { error } = users
  return {
    error,
  }
}

export default connect(
  mapStateToProps,
  (dispatch) => bindActionCreators(
    {
      ...userActionCreators,
      ...postsActionCreators,
    },
     dispatch
  )
)(HomeContainer)
