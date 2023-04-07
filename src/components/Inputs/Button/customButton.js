import React from 'react'
import {Button} from '@mui/material'
import MyDiv from './customButton.style'
export default function CustomButton(props) {
  return (
    <MyDiv>
      <Button
        onClick={props.onClick}
        {...props}
        size="medium"
        disableElevation
        className={props.className}
        variant={props.variant}
      >
        {props.title}
      </Button>
    </MyDiv>
  )
}

