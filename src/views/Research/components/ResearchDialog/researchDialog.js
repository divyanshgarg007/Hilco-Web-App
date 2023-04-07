import * as React from 'react'
import Dialog from '@mui/material/Dialog'
import Slide from '@mui/material/Slide'
import {Box, DialogActions, DialogContent, DialogTitle, Divider, Grid, IconButton, Typography} from '@mui/material'
import {Close, KeyboardArrowLeft as KeyboardArrowLeftIcon, KeyboardArrowRight as KeyboardArrowRightIcon} from '@mui/icons-material'
import MyDiv from './researchDialogstyle'

const Transition = React.forwardRef((props, ref) => {
  return <Slide direction="up" ref={ref} {...props} />
})

export default function ResearchDialog({showDataPopup, handlePopup, modalData, handleNext, handlePrevious}) {

  const popup = (popupbox) => (
    <MyDiv>
      <Box className="dialog_box">
        <Box className="dialog_header">
          <DialogTitle className="dialog_title">Assets List </DialogTitle>
          <IconButton className="icon" onClick={handlePopup}><Close /></IconButton>
        </Box>
        <Divider />
        <DialogContent className="dialog_content">
          <Typography className="heading">234 (Appraisal)</Typography>
          <Grid container mt={1.5} rowSpacing={1} columnSpacing={{md: 4, sm: 4}}>
            <Grid item md={6}>
              <Box className="d-flex">
                <Typography className="label">Appraisal</Typography>
                <Typography className="label_data">{modalData?.name} </Typography>
              </Box>
            </Grid>
            <Grid item md={6}>
              <Box className="d-flex">
                <Typography className="label">Date Appraised</Typography>
                <Typography className="label_data">2022-08-11 00:00:00</Typography>
              </Box>
            </Grid>
            <Grid item md={6}>
              <Box className="d-flex">
                <Typography className="label">Project Name</Typography>
                <Typography className="label_data">GNS America INV/M&amp;E Y22 M07 M_E</Typography>
              </Box>
            </Grid>
            <Grid item md={6}>
              <Box className="d-flex">
                <Typography className="label">Serial</Typography>
                <Typography className="label_data">P2-150-18017</Typography>
              </Box>
            </Grid>
            <Grid item md={12}>
              <Box className="d-flex">
                <Typography className="label">Facility</Typography>
                <Typography className="label_data">GNS America, 13341 Quincy Street, Holland, MI-49424, US </Typography>
              </Box>
            </Grid>
            <Grid item md={6}>
              <Box className="d-flex">
                <Typography className="label">Quantity</Typography>
                <Typography className="label_data">1</Typography>
              </Box>
            </Grid>
            <Grid item md={6}>
              <Box className="d-flex">
                <Typography className="label">Make</Typography>
                <Typography className="label_data">Minster</Typography>
              </Box>
            </Grid>
            <Grid item md={6}>
              <Box className="d-flex">
                <Typography className="label">Model</Typography>
                <Typography className="label_data">P2-150</Typography>
              </Box>
            </Grid>
            <Grid item md={6}>
              <Box className="d-flex">
                <Typography className="label">Capacity</Typography>
                <Typography className="label_data">150-Ton Straight Side Double Crank</Typography>
              </Box>
            </Grid>
            <Grid item md={6}>
              <Box className="d-flex">
                <Typography className="label">Asset Type</Typography>
                <Typography className="label_data">Press</Typography>
              </Box>
            </Grid>
            <Grid item md={6}>
              <Box className="d-flex">
                <Typography className="label">Year</Typography>
                <Typography className="label_data">1968</Typography>
              </Box>
            </Grid>
            <Grid item md={3}>
              <Typography className="label_cost">Cost</Typography>
              <Typography className="label_data">FLV $20,000 </Typography>
              <Typography className="label_data">FMV $55,000</Typography>
            </Grid>
            <Grid item md={3}>
              <Typography className="label_cost">Cost 1</Typography>
              <Typography className="label_data">FLV $20,000 </Typography>
              <Typography className="label_data">FMV $55,000</Typography>
            </Grid>
            <Grid item md={3}>
              <Typography className="label_cost">Cost 2</Typography>
              <Typography className="label_data">FLV $20,000 </Typography>
              <Typography className="label_data">FMV $55,000</Typography>
            </Grid>
            <Grid item md={3}>
              <Typography className="label_cost">Cost 3</Typography>
              <Typography className="label_data">FLV $20,000 </Typography>
              <Typography className="label_data">FMV $55,000</Typography>
            </Grid>
            <Grid item md={12}>
              <Box className="d-flex">
                <Typography className="label">Description</Typography>
                <Typography className="label_data">with 48" x 40" Bed Area, 3" Stroke, 4" Slide Adjustment, 25" Shut Height, 0-120 SPM, 20" Windows, Air Clutch &
                  Brake, Chip Conveyor, Air Counterbalance, Die Pro Sensor Interface, Safety Light Curtains, Durant Model FP18 22"W Servo Feeder, S/N 52899, with Electrical
                  Panel Control, Durant 5,000-Lb. Pallet Type Horizontal Uncoiler, S/N 0506, with Variable Speed Control </Typography>
              </Box>
            </Grid>
            <Grid item md={12}>
              <Box className="d-flex">
                <Typography className="label">Notes</Typography>
                <Typography className="label_data" />
              </Box>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <IconButton className="icon" onClick={handlePrevious}>
            <KeyboardArrowLeftIcon />
          </IconButton>
          <IconButton className="icon" onClick={handleNext}>
            <KeyboardArrowRightIcon />
          </IconButton>
        </DialogActions>
      </Box>
    </MyDiv>
  )
  return (
    <Dialog
      popupbox="openDialog"
      open={showDataPopup}
      TransitionComponent={Transition}
      onClose={handlePopup}
      maxWidth="md"
      fullWidth
    >
      {popup('openDialog')}
    </Dialog>
  )
}
