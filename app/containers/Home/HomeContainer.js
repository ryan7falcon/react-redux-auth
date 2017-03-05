import React, { PropTypes } from 'react'
import { Home } from 'components'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as userActionCreators from 'reduxModules/modules/users'

const HomeContainer = React.createClass({
  propTypes: {
    // users
    error: PropTypes.string.isRequired,
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

  render () {
    return (
      <Home
        isFetching={false}
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
    },
     dispatch
  )
)(HomeContainer)
