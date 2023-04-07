/* eslint-disable no-undef */
import React, {useState, useEffect} from 'react'
import {Box, Grid, Typography} from '@mui/material'
import {useDispatch, useSelector} from 'react-redux'
import {AlertMessage, CustomButton, CustomTextBox, Loader} from '../../../components'
import {
  getModelListAction, getAppraiserTrueAction, postModelAction, deleteModelAction,
} from '../../../redux/admin/AdminActions'
import {adminListActions} from '../../../redux/admin/admin'
import {ManageModelTable} from './components'
import MyDiv from './manageModel.style'

export default function ManageModel() {

  const dispatch = useDispatch()
  const [addValue, setAddValue] = useState('')
  const [searchValue, setSearchValue] = useState('')
  const [modelList, setModelList] = useState()
  const [filteredModelList, setFilteredModelList] = useState([])
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState('')

  const adminState = useSelector((state) => state.admin)

  useEffect(() => {
    dispatch(getModelListAction())
    dispatch(getAppraiserTrueAction())
  }, [dispatch])

  useEffect(() => {
    setModelList(adminState?.modelList?.modelList)
    setFilteredModelList(adminState?.modelList?.modelList)
  }, [adminState?.modelList?.modelList])

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
      const result = modelList.filter((item) => {
        return item?.name?.toLowerCase().includes(searchValue.toLowerCase())
      })
      setFilteredModelList(result)
    } else {
      setFilteredModelList(modelList)
    }
  }

  const handleChange = (e) => {
    setSearchValue(e.target.value)
  }

  const handleReset = () => {
    setSearchValue('')
    dispatch(getModelListAction())
  }

  const handleChangeAdd = (e) => {
    setAddValue(e.target.value)
  }

  const handleAdd = () => {
    if (!addValue) {
      setMessage('Please Enter Model Label')
      setStatus('warning')
      return
    }
    let addObj = {
      created_by: 173,
      modified_by: 173,
      name: addValue,
    }
    dispatch(postModelAction(addObj))
  }

  const handleDelete = () => {
    if (adminState.selectedItems.length > 0) {
      let obj = {
        action: 'deleteList',
        model_label_id: adminState.selectedItems.join('^'),
      }
      dispatch(deleteModelAction(obj))
      dispatch(adminListActions.clearSelectedItems())
    } else if (adminState.selectedItems.length === 0) {
      setMessage('Please select at least one Model Label.')
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
      {(adminState?.modelList?.loading || adminState?.deleteModel?.loading) &&
      <div>
        <Loader />
      </div>
      }
      <Box className="page_heading">
        <Typography>Manage Model Labels</Typography>
      </Box>
      <Box className="admin_card">
        <Grid container className="main_container">
          <Grid item md={4} className="d-flex">
            <Box className="input_box">
              <Typography>Model Label</Typography>
              <CustomTextBox name="label_add" value={addValue} onChange={handleChangeAdd} />
            </Box>
            <CustomButton title="Add" className="btn_theme" variant="contained" onClick={handleAdd} />
          </Grid>
          <Grid item md={4} />
          <Grid item md={4} className="d-flex">
            <Box className="input_box">
              <Typography>Search String</Typography>
              <CustomTextBox name="search_model" value={searchValue} onChange={handleChange} />
            </Box>
            <Box className="d-flex">
              <CustomButton title="Search" className="btn_theme" variant="contained" onClick={handleSearchName} />
              <CustomButton title="Reset" className="btn_reset" variant="contained" onClick={handleReset} />
            </Box>
          </Grid>
        </Grid>
      </Box>
      <ManageModelTable filteredModelList={filteredModelList} />
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
