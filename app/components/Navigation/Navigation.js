import React, { PropTypes } from 'react'
import { container, navContainer } from './styles.css'
import FlatButton from 'material-ui/FlatButton'

Navigation.propTypes = {
  goHome: PropTypes.func.isRequired,

  // parent: MainContainer.js
  logout: PropTypes.func.isRequired,
}

export default function Navigation ({goHome, logout}) {
  return (
    <div className={container}>
      <nav className={navContainer}>
        <FlatButton
          label='Back to Home'
          primary={true}
          onTouchTap={goHome}/>
        <FlatButton
          label='Logout'
          primary={true}
          onTouchTap={logout}/>
      </nav>
    </div>
  )
}
