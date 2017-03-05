import React, { PropTypes } from 'react'
import { centeredContainer, largeHeader, errorMsg } from 'sharedStyles/styles.css'
import Formsy from 'formsy-react'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import Paper from 'material-ui/Paper'
import RaisedButton from 'material-ui/RaisedButton'
import { FormsyText } from 'formsy-material-ui/lib'

Authenticate.propTypes = {
  // users
  error: PropTypes.string.isRequired,

  // parent: AutenticateContainer.js
  handleSubmit: PropTypes.func.isRequired,
  canSubmit: PropTypes.bool.isRequired,
  enableButton: PropTypes.func.isRequired,
  disableButton: PropTypes.func.isRequired,
  notifyFormError: PropTypes.func.isRequired,
  styles: PropTypes.object.isRequired,
}

export default function Authenticate ({error, handleSubmit, canSubmit, enableButton, disableButton, notifyFormError, styles}) {
  let { paperStyle, submitStyle } = styles
  return (
    <div className={centeredContainer}>
      <h1 className={largeHeader}>{'Authenticate'}</h1>
        <MuiThemeProvider muiTheme={getMuiTheme()}>
        <Paper style={paperStyle}>
          <Formsy.Form
            onValid={enableButton}
            onInvalid={disableButton}
            onValidSubmit={handleSubmit}
            onInvalidSubmit={notifyFormError}>
            <FormsyText
                name='userId'
                hintText='Your RBC Id'
                floatingLabelText='User Id'
                required/>
            <FormsyText
                name='password'
                type='password'
                required
                hintText='Your RBC password'
                floatingLabelText='Password'/>
            <RaisedButton
              style={submitStyle}
              type='submit'
              label='Submit'
              disabled={!canSubmit}/>
          </Formsy.Form>
        </Paper>
      </MuiThemeProvider>
      {error ? <p className={errorMsg}>{error}</p> : null}
    </div>
  )
}
