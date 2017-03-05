import React, { PropTypes } from 'react'
import { text } from './styles.css'

Logout.propTypes = {
 // : PropTypes.string.isRequired,
}

export default function Logout (props) {
  return (
    <div className={text}>{'You are now logged out'}</div>
  )
}
