import React from 'react'
import {Snackbar} from '@mui/material'
import Alert from '@mui/material/Alert'
import {ErrorTimeOut} from '../../constants/constant'
import MyDiv from './alertMessage.style'

export default function AlertMessage(props) {
  const {message, severity, open} = props
  const handleClose = () => {
    props.close()
  }
  return (
    <MyDiv>
      <Snackbar open={open}
        autoHideDuration={ErrorTimeOut}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        className="custom_snack"
      >
        <Alert severity={severity} className="text-font custom_snack_alert">
          {message}
        </Alert>
      </Snackbar>
    </MyDiv>
  )
}


