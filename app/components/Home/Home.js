import React, { PropTypes} from 'react'
import {container, title, slogan} from './styles.css'
import RaisedButton from 'material-ui/RaisedButton'
import CircularProgress from 'material-ui/CircularProgress'

Home.propTypes = {
  // container
  styles: PropTypes.object.isRequired,
  getUser: React.PropTypes.func.isRequired,
  getPost: React.PropTypes.func.isRequired,
  // users
  error: PropTypes.string.isRequired,

  isFetching: PropTypes.bool.isRequired,
}

export default function Home ({isFetching, error, styles, getUser, getPost}) {
  let { buttonStyle } = styles
  return isFetching ? <CircularProgress /> : (
      <div className={container}>
        <p className={title}> {'Hello'} </p>
        <p className={slogan}> {'Cool slogan here'} </p>
        <p> {error} </p>
        <p>{'Buttons only populate redux store, check dev tools'}</p>
        <RaisedButton onTouchTap={getUser} label='Get user'/>
        <RaisedButton onTouchTap={getPost} label='Get posts'/>
      </div>
  )
}
