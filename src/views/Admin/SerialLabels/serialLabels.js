import React, {useState, useEffect} from 'react'
import {Box, Grid, Typography} from '@mui/material'
import {useDispatch, useSelector} from 'react-redux'
import {AlertMessage, CustomButton, CustomTextBox, Loader} from '../../../components'
import {
  getSerialLabelAction, getAppraiserTrueAction, postSerialLabelAction, deleteSerialLabelAction,
} from '../../../redux/admin/AdminActions'
import {adminListActions} from '../../../redux/admin/admin'
import {SerialLabelsTable} from './components'
import MyDiv from './serialLabels.style'

export default function SerialLabels(props) {

  const dispatch = useDispatch()
  const [addValue, setAddValue] = useState('')
  const [searchValue, setSearchValue] = useState('')
  const [serialLabelList, setSerialLabelList] = useState()
  const [filteredSerialLabelList, setFilteredSerialLabelList] = useState([])
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState('')

  const adminState = useSelector((state) => state.admin)

  useEffect(() => {
    dispatch(getSerialLabelAction())
    dispatch(getAppraiserTrueAction())
  }, [dispatch])

  useEffect(() => {
    setSerialLabelList(adminState?.serialLabelList?.serialLabelList)
    setFilteredSerialLabelList(adminState?.serialLabelList?.serialLabelList)
  }, [adminState?.serialLabelList?.serialLabelList])

  useEffect(() => {
    if (adminState?.messageData.status === 'success') {
      setMessage(adminState?.messageData?.message)
      setStatus('success')
      setAddValue('')
    }
    if (adminState?.messageData.status === 'failed') {
      setMessage(adminState?.messageData?.message)
      setStatus('warning')
    }
  }, [adminState?.messageData])

  const handleSearchName = () => {
    if (searchValue !== '') {
      const result = serialLabelList.filter((item) => {
        return item?.name?.toLowerCase().includes(searchValue.toLowerCase())
      })
      setFilteredSerialLabelList(result)
    } else {
      setFilteredSerialLabelList(serialLabelList)
    }
  }

  const handleChange = (e) => {
    setSearchValue(e.target.value)
  }

  const handleReset = () => {
    setSearchValue('')
    dispatch(getSerialLabelAction())
  }

  const handleChangeAdd = (e) => {
    setAddValue(e.target.value)
  }

  const handleAdd = () => {
    if (!addValue) {
      setMessage('Please Enter Serial Label')
      setStatus('warning')
      return
    }
    let addObj = {
      created_by: 173,
      modified_by: 173,
      name: addValue,
    }
    dispatch(postSerialLabelAction(addObj))
  }

  const handleDelete = () => {
    if (adminState.selectedItems.length > 0) {
      let obj = {
        action: 'deleteList',
        serial_label_id: adminState.selectedItems.join('^'),
      }
      dispatch(deleteSerialLabelAction(obj))
      dispatch(adminListActions.clearSelectedItems())
    } else if (adminState.selectedItems.length === 0) {
      setMessage('Please select at least one Serial Label.')
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
      {(adminState?.serialLabelList?.loading || adminState?.deleteSerialLabel?.loading) &&
      <div>
        <Loader />
      </div>
      }
      <Box className="page_heading">
        <Typography>Manage Serial Number Labels</Typography>
      </Box>
      <Box className="admin_card">
        <Grid container className="main_container">
          <Grid item md={4} className="d-flex">
            <Box className="input_box">
              <Typography>Serial Label</Typography>
              <CustomTextBox name="serial_add" value={addValue} onChange={handleChangeAdd} />
            </Box>
            <CustomButton title="Add" className="btn_theme" variant="contained" onClick={handleAdd} />
          </Grid>
          <Grid item md={4} />
          <Grid item md={4} className="d-flex">
            <Box className="input_box">
              <Typography>Search String</Typography>
              <CustomTextBox name="search_serial" value={searchValue} onChange={handleChange} />
            </Box>
            <Box className="d-flex">
              <CustomButton title="Search" className="btn_theme" variant="contained" onClick={handleSearchName} />
              <CustomButton title="Reset" className="btn_reset" variant="contained" onClick={handleReset} />
            </Box>
          </Grid>
        </Grid>
      </Box>
      <SerialLabelsTable serialLabelList={filteredSerialLabelList} />
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
