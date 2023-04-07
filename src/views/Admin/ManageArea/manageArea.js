/* eslint-disable no-debugger */
/* eslint-disable no-unused-vars */
import React, {useState, useEffect} from 'react'
import {
  Box,
  FormControl,
  Grid,
  Select,
  Typography,
  MenuItem,
} from '@mui/material'
import styled from 'styled-components'
import {useDispatch, useSelector} from 'react-redux'
import {
  getLocationAction, getAppraiserTrueAction, getAreaListAction, deleteAreaAction,
} from '../../../redux/admin/AdminActions'
import {adminListActions} from '../../../redux/admin/admin'
import {AlertMessage, CustomButton, Loader} from '../../../components'
import {ManageTable} from './components'
import MyDiv from './manageArea.style'

const StyledMenuItem = styled(MenuItem)(() => ({
  '&.MuiMenuItem-root': {
    borderBottom: '1px solid #ccc',
    color: '#000000',
    fontWeight: '400',
    fontSize: '14px',
    fontFamily: 'Poppins,sans-serif',
  },
  '&.MuiMenuItem-root:first-child': {
    marginTop: '-8px',
  },
  '&.MuiMenuItem-root:last-child': {
    marginBottom: '-8px',
  },
}))

export default function ManageArea() {

  const dispatch = useDispatch()
  const [locationValue, setLocationValue] = useState('0')
  const [locationData, setLocationData] = useState()
  const [areaList, setAreaList] = useState([])
  const [locationId, setLocationId] = useState()
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState('')

  const adminState = useSelector((state) => state.admin)
  const locationsList = locationData?.locationsDataFull

  useEffect(() => {
    dispatch(getLocationAction())
    dispatch(getAppraiserTrueAction())
  }, [dispatch])

  useEffect(() => {
    setLocationData(adminState?.locationList?.locationList?.data)
  }, [adminState?.locationList?.locationList])

  useEffect(() => {
    setAreaList(adminState?.areaList?.areaList)
  }, [adminState?.areaList?.areaList])

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

  const handleChange = (event) => {
    setLocationValue(event.target.value)
    if (event.target.value === '0') {
      dispatch(adminListActions.clearAreaList())
    }
  }

  const handleClick = (id) => {
    setLocationId(id)
    let obj = {
      location_id: id.toString(),
    }
    dispatch(getAreaListAction(obj))
  }

  const handleDelete = () => {
    if (adminState.selectedItems.length > 0) {
      let obj = {
        action: 'deleteList',
        area: adminState.selectedItems.join('^'),
        location_id: locationId,
      }
      dispatch(deleteAreaAction(obj))
      dispatch(adminListActions.clearSelectedItems())
    } else if (adminState.selectedItems.length === 0) {
      setMessage('Please select at least one Area.')
      setStatus('warning')
    }
  }

  const handleCancel = () => {
    dispatch(adminListActions.clearSelectedItems())
  }

  const handleSnackBarClose = () => {
    setMessage('')
    setStatus('')
    dispatch(adminListActions.clearMessageData())
  }

  return (
    <MyDiv>
      {(adminState?.locationList?.loading || adminState?.areaList?.loading || adminState?.deleteArea?.loading) &&
      <div>
        <Loader />
      </div>
      }
      <Box className="page_heading">
        <Typography>Manage Area</Typography>
      </Box>
      <Box className="admin_card">
        <Grid container className="main_container">
          <Grid item md={3}>
            <Box className="input_box">
              <Typography>Select Areas By Location</Typography>
              <FormControl size="small" className="select_area">
                <Select
                  id="select_input"
                  className="select_value"
                  value={locationValue}
                  fullWidth
                  onChange={handleChange}
                >
                  <StyledMenuItem value="0">Please Select</StyledMenuItem>
                  {locationsList?.map((item) => {
                    return (
                      <StyledMenuItem key={item.location_id} value={item.location_id} onClick={() => handleClick(item.location_id)}>
                        {item.name} {item.location_id}
                      </StyledMenuItem>
                    )
                  })}
                </Select>
              </FormControl>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <ManageTable areaList={areaList} />
      <Box className="d-flex bottom_actions">
        <CustomButton title="Delete" className="btn_theme" variant="contained" onClick={handleDelete} />
        <CustomButton title="Cancel" className="btn_reset" variant="contained" onClick={handleCancel} />
      </Box>
      <AlertMessage
        message={message}
        severity={status}
        open={message?.length > 0}
        close={handleSnackBarClose}
      />
    </MyDiv>
  )
}
