/* eslint-disable no-unused-vars */
import * as React from 'react'
import Dialog from '@mui/material/Dialog'
import Slide from '@mui/material/Slide'
import {Box, DialogContent, DialogTitle, Divider, Grid, IconButton, Typography} from '@mui/material'
import {Close} from '@mui/icons-material'
import MyDiv from './appraiserDialog.style'

const Transition = React.forwardRef((props, ref) => {
  return <Slide direction="up" ref={ref} {...props} />
})

export default function AppraiserDialog(props) {

  const popup = (popupbox) => (
    <MyDiv>
      <Box className="dialog_box">
        <Box className="dialog_header">
          <DialogTitle className="dialog_title">{props.heading}</DialogTitle>
          <IconButton className="icon" onClick={props.handlePopup}><Close /></IconButton>
        </Box>
        <Divider />
        {props.heading === 'Assigned Locations' && <DialogContent className="dialog_content">
          <Grid container rowSpacing={1} columnSpacing={{md: 4, sm: 4}}>
            {props.appraisersLocations?.map((val, index) => {
              return (
                <Grid item md={6} key={index}>
                  {props.locationData?.locationsDataFull?.filter((item) => item.location_id === val.location_id).map((item) => {
                    return (
                      <Box className="label_box" key={val?.location_id}>
                        <Typography className="label">{item.name}</Typography>
                        <Typography className="label_data">{item.street}</Typography>
                      </Box>
                    )
                  })}
                </Grid>
              )
            })}
          </Grid>
        </DialogContent>}
        {props.heading === 'Appraisers on all locations' && <DialogContent className="dialog_content">
          <Grid container rowSpacing={1} columnSpacing={{md: 4, sm: 4}}>
            <Grid item md={6}>
              <Box className="label_box">
                <Typography className="label">user name</Typography>
              </Box>
            </Grid>
          </Grid>
        </DialogContent>}
      </Box>
    </MyDiv>
  )
  return (
    <Dialog
      popupbox="openDialog"
      open={props.openDialog}
      TransitionComponent={Transition}
      onClose={props.handlePopup}
      maxWidth="md"
      fullWidth
    >
      {popup('openDialog')}
    </Dialog>
  )
}
