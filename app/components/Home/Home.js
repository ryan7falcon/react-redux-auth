import React, { PropTypes} from 'react'
import {container, title, slogan} from './styles.css'
import RaisedButton from 'material-ui/RaisedButton'
import CircularProgress from 'material-ui/CircularProgress'

Home.propTypes = {
  // container
  styles: PropTypes.object.isRequired,

  // users
  error: PropTypes.string.isRequired,

  isFetching: PropTypes.bool.isRequired,
}

export default function Home ({isFetching, error, styles}) {
  let { buttonStyle } = styles
  return isFetching ? <CircularProgress /> : (
      <div className={container}>
        <p className={title}> {'Hello'} </p>
        <p className={slogan}> {'Cool slogan here'} </p>
        <p> {error} </p>

      </div>
  )
}
