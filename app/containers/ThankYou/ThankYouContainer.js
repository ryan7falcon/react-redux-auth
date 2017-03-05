import React, { PropTypes } from 'react'
import { ThankYou } from 'components'

const ThankYouContainer = React.createClass({
  propTypes: {
    // : PropTypes.func.isRequired,
  },

  contextTypes: {
    router: PropTypes.object.isRequired,
  },

  // go to home page
  handleSubmit () {
    this.context.router.push('/')
  },

  render () {
    return (
      <ThankYou
        handleSubmit={this.handleSubmit}/>
    )
  },
})
export default ThankYouContainer
