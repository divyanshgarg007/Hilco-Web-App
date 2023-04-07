import React, {useRef} from 'react'
import {Box, Checkbox, FormControlLabel, Typography} from '@mui/material'
import {Upload} from '@mui/icons-material'
import {CustomButton, CustomTextBox} from '../../../components'
import MyDiv from './importAssets.style'

export default function ImportAssets() {
  const imageRef = useRef()

  const showOpenFileDialog = () => {
    imageRef.current.click()
  }

  return (
    <MyDiv>
      <Box className="page_heading">
        <Typography>Import Assets</Typography>
      </Box>
      <Box className="wrapper_box">
        <FormControlLabel
          className="checked_label"
          control={<Checkbox />}
          label="Append"
        />
        <Box className="input_box" mt={1}>
          <Typography>Skip Rows</Typography>
          <CustomTextBox name="page" className="page_input" />
          <Typography className="note">
            Note: Please enter comma separated row numbers.
          </Typography>
        </Box>
        <Box className="input_box upload_btn" mt={2}>
          <Typography>Import File</Typography>
          <>
            <CustomButton
              onClick={showOpenFileDialog}
              title="Import"
              className="btn_theme"
              startIcon={<Upload />}
            />
            <input
              ref={imageRef}
              type="file"
              style={{display: 'none'}}
              accept=".xls, .xlsx, .csv"
            />
          </>
        </Box>
        <Box className="back_btn">
          <CustomButton
            title="Back"
            variant="contained"
            className="btn_theme"
          />
        </Box>
      </Box>
    </MyDiv>
  )
}
