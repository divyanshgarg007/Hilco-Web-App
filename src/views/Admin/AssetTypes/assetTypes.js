import React, {useState, useEffect} from 'react'
import {Box, Grid, Typography} from '@mui/material'
import {useDispatch, useSelector} from 'react-redux'
import {AlertMessage, CustomButton, CustomTextBox, Loader} from '../../../components'
import {
  getAssetTypeAction, getAppraiserTrueAction, postAssetTypeAction, deleteAssetTypeAction,
} from '../../../redux/admin/AdminActions'
import {adminListActions} from '../../../redux/admin/admin'
import {AssetTypesTable} from './components'
import MyDiv from './assetTypes.style'

export default function AssetTypes() {

  const dispatch = useDispatch()
  const [addValue, setAddValue] = useState('')
  const [searchValue, setSearchValue] = useState('')
  const [assetTypesList, setAssetTypesList] = useState()
  const [filteredAssetTypesList, setFilteredAssetTypesList] = useState([])
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState('')

  const adminState = useSelector((state) => state.admin)

  useEffect(() => {
    dispatch(getAssetTypeAction())
    dispatch(getAppraiserTrueAction())
  }, [dispatch])

  useEffect(() => {
    setAssetTypesList(adminState?.assetTypeList?.assetTypeList)
    setFilteredAssetTypesList(adminState?.assetTypeList?.assetTypeList)
  }, [adminState?.assetTypeList?.assetTypeList])

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
      const result = assetTypesList.filter((item) => {
        return item?.type?.toLowerCase().includes(searchValue.toLowerCase()) || item?.type_plural?.toLowerCase().includes(searchValue.toLowerCase())
      })
      setFilteredAssetTypesList(result)
    } else {
      setFilteredAssetTypesList(assetTypesList)
    }
  }

  const handleChange = (e) => {
    setSearchValue(e.target.value)
  }

  const handleReset = () => {
    setSearchValue('')
    dispatch(getAssetTypeAction())
  }

  const handleChangeAdd = (e) => {
    setAddValue(e.target.value)
  }

  const handleAdd = () => {
    if (!addValue) {
      setMessage('Please Enter Asset Type')
      setStatus('warning')
      return
    }
    let addObj = {
      created_by: 173,
      modified_by: 173,
      type: addValue,
    }
    dispatch(postAssetTypeAction(addObj))
  }

  const handleDelete = () => {
    if (adminState.selectedItems.length > 0) {
      let obj = {
        action: 'deleteList',
        asset_type_id: adminState.selectedItems.join('^'),
      }
      dispatch(deleteAssetTypeAction(obj))
      dispatch(adminListActions.clearSelectedItems())
    } else if (adminState.selectedItems.length === 0) {
      setMessage('Please select at least one Asset Type.')
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
      {(adminState?.assetTypeList?.loading || adminState?.deleteAssetType?.loading) &&
      <div>
        <Loader />
      </div>
      }
      <Box className="page_heading">
        <Typography>Manage Asset Types</Typography>
      </Box>
      <Box className="admin_card">
        <Grid container className="main_container">
          <Grid item md={4} className="d-flex">
            <Box className="input_box">
              <Typography>Asset Type</Typography>
              <CustomTextBox name="type_add" value={addValue} onChange={handleChangeAdd} />
            </Box>
            <CustomButton title="Add" className="btn_theme" variant="contained" onClick={handleAdd} />
          </Grid>
          <Grid item md={4} />
          <Grid item md={4} className="d-flex">
            <Box className="input_box">
              <Typography>Search String</Typography>
              <CustomTextBox name="search_type" value={searchValue} onChange={handleChange} />
            </Box>
            <Box className="d-flex">
              <CustomButton title="Search" className="btn_theme" variant="contained" onClick={handleSearchName} />
              <CustomButton title="Reset" className="btn_reset" variant="contained" onClick={handleReset} />
            </Box>
          </Grid>
        </Grid>
      </Box>
      <AssetTypesTable assetTypesList={filteredAssetTypesList} />
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
