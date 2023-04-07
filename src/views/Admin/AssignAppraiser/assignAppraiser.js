import React, {useEffect, useState} from 'react'
import {Box, Grid, Typography} from '@mui/material'
import {useDispatch, useSelector} from 'react-redux'
import {AlertMessage, CustomButton, CustomTextBox, Loader} from '../../../components'
import {
  getAppraiserAction,
  getLocationAction,
  postAssignAppraiserAction,
  deleteAssignAppraiserAction,
  postAssignAppraiserAllAction,
  getResetAssignAppraiserAction,
  getAppraiserLocationsAction,
} from '../../../redux/admin/AdminActions'
import {adminListActions} from '../../../redux/admin/admin'
import {AppraiserDialog, AppraisersList, LocationsList} from './components'
import MyDiv from './assignAppraiser.style'

export default function AssignAppraiser() {

  const dispatch = useDispatch()
  const [openDialog, setOpenDialog] = useState(false)
  const [filteredFlag, setFilteredFlag] = useState(false)
  const [appraiserData, setAppraisersData] = useState([])
  const [heading, setHeading] = useState()
  const [appraisersLocations, setAppraisersLocations] = useState()
  const [filteredAppraiserData, setFilteredAppraisersData] = useState([])
  const [filteredLocationData, setFilteredLocationData] = useState([])
  const [locationData, setLocationData] = useState()
  const [selectedIndex, setSelectedIndex] = useState([])
  const [locationId, setLocationId] = useState()
  const [userId, setUserId] = useState([])
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState('')

  const adminState = useSelector((state) => state.admin)

  useEffect(() => {
    dispatch(getAppraiserAction())
    dispatch(getLocationAction())
    dispatch(getAppraiserLocationsAction())
  }, [dispatch])

  useEffect(() => {
    setAppraisersData(adminState?.appraiserList?.appraiserList)
    setFilteredAppraisersData(adminState?.appraiserList?.appraiserList)
    setAppraisersLocations(adminState?.appraiserLocationsList?.appraiserLocationsList?.data?.assignedLocations)
  }, [adminState])

  useEffect(() => {
    setLocationData(adminState?.locationList?.locationList?.data)
    // setFilteredLocationData(adminState?.locationList?.locationList?.data)
  }, [adminState?.locationList?.locationList])

  useEffect(() => {
    if (adminState?.messageData.status === 'success') {
      setMessage(adminState?.messageData?.message)
      setStatus('success')
    }
    if (adminState?.messageData.status === 'failed') {
      setMessage(adminState?.messageData?.message)
      setStatus('warning')
    }
  }, [adminState?.messageData])

  const handlePopup = (id, type) => {
    setOpenDialog(!openDialog)
    switch (type) {
      case 'appraiserLocation':
        dispatch(getAppraiserLocationsAction(id.toString()))
        setHeading('Assigned Locations')
        break
      case 'allLocationAppraisers':
        setHeading('Appraisers on all locations')
        break
      default:
        break
    }
  }

  const handleAccordionClick = (item) => {
    setLocationId(item.toString())
  }

  const handleListItemClick = (index) => {
    let listData = appraiserData.filter((item) => item.user_id === index)
    let id = listData[0]?.user_id
    setUserId([...userId, id])

    let appraiserIndex = selectedIndex.find((item) => item === index)
    if (!appraiserIndex) {
      setSelectedIndex([...selectedIndex, index])
    } else if (appraiserIndex) {
      setSelectedIndex(selectedIndex?.filter((item) => item !== index))
      setUserId(selectedIndex?.filter((item) => item !== index))
    }
  }

  const handleMoveAppraiserList = () => {
    let obj = {
      users: userId.toString(),
      location_id: locationId,
    }
    dispatch(postAssignAppraiserAction(obj))
  }

  const handleMoveAppraiserAllList = () => {
    let obj = {
      users: userId.toString(),
      location_id: 0,
    }
    dispatch(postAssignAppraiserAllAction(obj))
  }

  const handleSearchName = (e) => {
    const {value} = e.target
    if (value !== '') {
      const result = appraiserData.filter((item) => {
        return item?.first_name?.toLowerCase().includes(value.toLowerCase()) || item?.last_name?.toLowerCase().includes(value.toLowerCase())
      })
      setFilteredAppraisersData(result)
    } else {
      setFilteredAppraisersData(appraiserData)
    }
  }

  const handleSearchLocation = (e) => {
    const {value} = e.target
    if (value !== '') {
      const result = locationData?.locationsDataFull.filter((item) => {
        return item?.street?.toLowerCase().includes(value.toLowerCase())
      })
      setFilteredLocationData(result)
      setFilteredFlag(true)
    } else {
      setFilteredLocationData(locationData?.locationsDataFull)
    }
  }

  const handleDelete = (userId, locationId) => {
    let obj = {
      userId: userId.toString(),
      locationId: locationId.toString(),
    }
    dispatch(deleteAssignAppraiserAction(obj))
  }

  const handleResetAppraisers = () => {
    dispatch(getResetAssignAppraiserAction())
  }

  const handleSnackBarClose = () => {
    setMessage('')
    setStatus('')
    dispatch(adminListActions.clearMessageData())
  }


  return (
    <MyDiv>
      {(adminState?.appraiserList?.loading || adminState?.locationList?.loading || adminState?.postAssignAppraiser?.loading || adminState?.postAssignAppraiserAll?.loading ||
      adminState?.deleteAssignAppraiser?.loading || adminState?.getResetAssignAppraiser?.loading || adminState?.appraiserLocationsList?.loading) &&
      <div>
        <Loader />
      </div>
      }
      <Box className="page_heading">
        <Typography>Assign Appraisers</Typography>
      </Box>
      <Box className="admin_card">
        <Grid container className="action_grid">
          <Grid item md={6}>
            <Grid container columnSpacing={{md: 4}}>
              <Grid item md={4}>
                <Box className="input_box">
                  <Typography>Appraiser</Typography>
                  <CustomTextBox
                    onChange={handleSearchName}
                    name="appraiser"
                    fieldLabel="Search Appraiser"
                  />
                </Box>
              </Grid>
              <Grid item md={4}>
                <Box className="input_box">
                  <Typography>Location</Typography>
                  <CustomTextBox
                    onChange={handleSearchLocation}
                    name="location"
                    fieldLabel="Search Location"
                  />
                </Box>
              </Grid>
            </Grid>
          </Grid>
          <Grid item md={6}>
            <Box className="d-flex">
              <CustomButton
                onClick={handleMoveAppraiserAllList}
                title="Assign to All Locations"
                variant="contained"
                className="btn_theme"
              />
              <CustomButton
                title="Appraisers on All Locations"
                variant="contained"
                className="btn_theme"
                onClick={(e) => handlePopup(e, 'allLocationAppraisers')}
                openDialog={openDialog}
              />
              <CustomButton
                onClick={handleResetAppraisers}
                title="Reset"
                variant="contained"
                className="btn_theme"
              />
            </Box>
          </Grid>
        </Grid>
        <Grid container className="content_grid" columnSpacing={{md: 4}}>
          <Grid item md={6}>
            <AppraisersList
              selectedIndex={selectedIndex}
              handleListItemClick={handleListItemClick}
              handleMoveAppraiserList={handleMoveAppraiserList}
              filteredAppraiserData={filteredAppraiserData}
              handlePopup={handlePopup}
              openDialog={openDialog}
            />
          </Grid>
          <Grid item md={6}>
            <LocationsList
              handleDelete={handleDelete}
              handleAccordionClick={handleAccordionClick}
              locationData={locationData}
              filteredLocationData={filteredLocationData}
              filteredFlag={filteredFlag}
            />
          </Grid>
        </Grid>
      </Box>
      <AppraiserDialog
        heading={heading}
        appraisersLocations={appraisersLocations}
        locationData={locationData}
        handlePopup={handlePopup}
        openDialog={openDialog}
      />
      <AlertMessage
        message={message}
        severity={status}
        open={message?.length > 0}
        close={handleSnackBarClose}
      />
    </MyDiv>
  )
}
