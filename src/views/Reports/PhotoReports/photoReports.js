import React from 'react'
import {Box, Checkbox, FormControlLabel, Typography} from '@mui/material'
import {CustomButton, CustomTextBox} from '../../../components'
import MyDiv from './photoReports.style'

export default function PhotoReports() {
  return (
    <MyDiv>
      <Box className="page_heading">
        <Typography>Photo Reports</Typography>
      </Box>
      <Box className="wrapper_box">
        <FormControlLabel
          className="checked_label"
          control={<Checkbox />}
          label="Display Reference No."
        />
        <Box className="input_box">
          <Typography>Starting Page</Typography>
          <CustomTextBox name="page" className="page_input" />
        </Box>
        <Box>
          <CustomButton
            title="Generate Photo PDF"
            variant="contained"
            className="btn_theme"
          />
        </Box>
      </Box>
    </MyDiv>
  )
}
