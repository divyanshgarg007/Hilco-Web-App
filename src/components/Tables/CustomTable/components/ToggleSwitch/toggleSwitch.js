import React, {useState} from 'react'
import {Switch} from '@mui/material'
import MyDiv from './toggleSwitch.style'

export default function ToggleSwitch() {
  const [checked, setChecked] = useState(false)

  const handleChange = (event) => {
    setChecked(event.target.checked)
  }

  return (
    <MyDiv>
      <Switch
        checked={checked}
        className="toggle_btn"
        onChange={handleChange}
        inputProps={{'aria-label': 'controlled'}}
      />
    </MyDiv>
  )
}
