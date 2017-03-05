import React, { PropTypes } from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import { centeredContainer, largeHeader, subHeader } from 'sharedStyles/styles.css'

ThankYou.propTypes = {
  // parent: ThankYouContainer
  handleSubmit: PropTypes.func.isRequired,
}

export default function ThankYou ({handleSubmit}) {
  return (
    <div className={centeredContainer}>
      <p className={largeHeader}> {'RBC Nominate'} </p>
      <p className={subHeader}> {'Thank you for your submission!'} </p>
         <RaisedButton
              label='Go to Home Page'
              primary={true}
              keyboardFocused={false}
              onTouchTap={handleSubmit}/>
    </div>
  )
}
