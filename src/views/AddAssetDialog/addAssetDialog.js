import * as React from 'react'
import Dialog from '@mui/material/Dialog'
import Slide from '@mui/material/Slide'
import {Box, DialogActions, DialogContent, DialogTitle, Divider, IconButton, Typography} from '@mui/material'
import {Close} from '@mui/icons-material'
import {CustomButton, CustomTextBox} from '../../components'
import MyDiv from './addAssetDialog.style'

const Transition = React.forwardRef((props, ref) => {
  return <Slide direction="up" ref={ref} {...props} />
})

export default function AddAssetDialog(props) {

  const popup = (popupbox) => (
    <MyDiv>
      <Box className="dialog_box">
        <Box className="dialog_header">
          <DialogTitle className="dialog_title">Add New Asset Type</DialogTitle>
          <IconButton className="icon" onClick={props.handleDialog}><Close /></IconButton>
        </Box>
        <Divider />
        <DialogContent className="dialog_content">
          <Typography className="label">Asset Type</Typography>
          <CustomTextBox value={props.addValue} onChange={props.handleChangeAdd} name="type_add" />
        </DialogContent>
        <DialogActions>
          <Box className="d-flex btn-flex mb-20 mt-10">
            <CustomButton
              title="Save"
              variant="contained"
              className="btn_theme"
              onClick={props.handleAdd}
            />
            <CustomButton
              title="Cancel"
              variant="contained"
              className="btn_theme"
              onClick={props.handleDialog}
            />
          </Box>
        </DialogActions>
      </Box>
    </MyDiv>
  )
  return (
    <Dialog
      popupbox="openDialog"
      open={props.openDialog}
      TransitionComponent={Transition}
      onClose={props.handleDialog}
      fullWidth
    >
      {popup('openDialog')}
    </Dialog>
  )
}
