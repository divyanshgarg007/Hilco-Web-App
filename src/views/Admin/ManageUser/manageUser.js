import React, {useState, useEffect} from 'react'
import {Box, Grid, Typography} from '@mui/material'
import {useDispatch, useSelector} from 'react-redux'
import {
  getAppraiserAction,
  postAssignAppraiserUserAction,
  getAppraiserTrueAction,
} from '../../../redux/admin/AdminActions'
import {AlertMessage, CustomButton, CustomTextBox, Loader} from '../../../components'
import {adminListActions} from '../../../redux/admin/admin'
import {ManageUserTable} from './components'
import MyDiv from './manageUser.style'

export default function ManageUser() {

  const dispatch = useDispatch()
  const [searchValue, setSearchValue] = useState('')
  const [appraiserData, setAppraisersData] = useState([])
  const [filteredAppraiserData, setFilteredAppraisersData] = useState([])
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState('')

  const adminState = useSelector((state) => state.admin)

  useEffect(() => {
    dispatch(getAppraiserAction())
    dispatch(getAppraiserTrueAction())
  }, [dispatch])

  useEffect(() => {
    setAppraisersData(adminState?.appraiserList?.appraiserList)
    setFilteredAppraisersData(adminState?.appraiserList?.appraiserList)
  }, [adminState?.appraiserList?.appraiserList])

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

  const handleSearchName = () => {
    if (searchValue !== '') {
      const result = appraiserData.filter((item) => {
        return item?.first_name?.toLowerCase().includes(searchValue.toLowerCase()) || item?.name?.toLowerCase().includes(searchValue.toLowerCase()) ||
        item?.username?.toLowerCase().includes(searchValue.toLowerCase()) || (item?.user_id)?.toString()?.toLowerCase().includes(searchValue.toLowerCase())
      })
      setFilteredAppraisersData(result)
    } else {
      setFilteredAppraisersData(appraiserData)
    }
  }

  const handleChange = (e) => {
    setSearchValue(e.target.value)
  }

  const handleReset = () => {
    setSearchValue('')
    dispatch(getAppraiserAction())
  }

  const activeInactiveUser = (status) => () => {
    let userData = {
      by_mne_admin: 1,
      status,
      user_id: adminState.selectedItems.join('^'),
    }
    dispatch(postAssignAppraiserUserAction(userData))
  }

  const handleSnackBarClose = () => {
    setMessage('')
    setStatus('')
    dispatch(adminListActions.clearMessageData())
  }

  return (
    <MyDiv>
      {(adminState?.appraiserList?.loading) &&
      <div>
        <Loader />
      </div>
      }
      <Box className="page_heading">
        <Typography>Manage User</Typography>
      </Box>
      <Box className="admin_card">
        <Grid container className="main_container">
          <Grid item md={4} className="d-flex">
            <Box className="input_box">
              <Typography>Search String</Typography>
              <CustomTextBox name="appraiser" value={searchValue} onChange={handleChange} />
            </Box>
            <Box className="d-flex">
              <CustomButton title="Search" className="btn_theme" variant="contained" onClick={handleSearchName} />
              <CustomButton title="Reset" className="btn_reset" variant="contained" onClick={handleReset} />
            </Box>
          </Grid>
        </Grid>
      </Box>
      <ManageUserTable filteredAppraiserData={filteredAppraiserData} />
      <Box className="d-flex bottom_actions">
        <CustomButton title="Active" className="btn_theme" variant="contained" onClick={activeInactiveUser(1)} />
        <CustomButton title="InActive" className="btn_theme" variant="contained" onClick={activeInactiveUser(0)} />
        <CustomButton title="Cancel" className="btn_reset" variant="contained" />
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
