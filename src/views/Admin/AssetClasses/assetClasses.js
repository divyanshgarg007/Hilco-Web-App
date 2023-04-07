import React, {useState, useEffect} from 'react'
import {Box, Grid, IconButton, Typography} from '@mui/material'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import {useDispatch, useSelector} from 'react-redux'
import {
  AlertMessage,
  CustomButton,
  CustomTextArea,
  CustomTextBox,
  Loader,
} from '../../../components'
import {
  getAssetClassesListAction, getAppraiserTrueAction, deleteAssetClassesAction, postAssetClassesAction, getAssetClassDetailAction, getAssetTypesClassesAction,
  deleteAssetTypeClassAction,
} from '../../../redux/admin/AdminActions'
import {adminListActions} from '../../../redux/admin/admin'
import {
  AssetClassesList,
  AssetClassTable,
  AssociatedAsset,
} from './components'
import MyDiv from './assetClasses.style'

export default function AssetClasses() {

  const dispatch = useDispatch()
  const [editList, setEditList] = useState(false)
  const [assetClassesList, setAssetClassesList] = useState([])
  const [filterAssetClassesList, setFilterAssetClassesList] = useState([])
  const [assetTypesList, setAssetTypesList] = useState([])
  const [filterAssetTypesList, setFilterAssetTypesList] = useState([])
  const [addAssetClass, setAddAssetClass] = useState({})
  const [ids, setIds] = useState({})
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState('')
  const [selectedIndex, setSelectedIndex] = useState([])
  const [expanded, setExpanded] = useState(false)

  const adminState = useSelector((state) => state.admin)

  useEffect(() => {
    return () => {
      dispatch(adminListActions.clearAssetClassDetail())
    }
  }, [])

  useEffect(() => {
    dispatch(getAssetClassesListAction())
    dispatch(getAppraiserTrueAction())
    dispatch(getAssetTypesClassesAction({action: 'FetchAssetType'}))
  }, [dispatch])

  useEffect(() => {
    setAssetClassesList(adminState?.assetClassesList?.assetClassesList)
  }, [adminState?.assetClassesList?.assetClassesList])

  useEffect(() => {
    setAssetTypesList(adminState?.assetTypesClasses?.assetTypesClasses)
  }, [adminState?.assetTypesClasses?.assetTypesClasses])

  useEffect(() => {
    setAddAssetClass(adminState?.assetClassDetail?.assetClassDetail)
  }, [adminState?.assetClassDetail?.assetClassDetail])

  useEffect(() => {
    if (adminState?.messageData.status === 'success') {
      setMessage(adminState?.messageData?.message)
      setStatus('success')
      if (editList) return
      setAddAssetClass({})
    }
    if (adminState?.messageData.status === 'failed') {
      setMessage(adminState?.messageData?.message)
      setStatus('warning')
    }
  }, [adminState?.messageData])

  const handleListItemClick = (index) => {
    let appraiserIndex = selectedIndex.find((item) => item === index)

    if (!appraiserIndex) {
      setSelectedIndex([...selectedIndex, index])
    } else if (appraiserIndex) {
      setSelectedIndex(selectedIndex?.filter((item) => item !== index))
    }
    setIds({...ids, assetTypeId: index})
  }

  const handleChangeAccordion = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false)
  }

  const handleEdit = (id) => () => {
    setEditList(!editList)
    dispatch(getAssetClassDetailAction(id))
    setFilterAssetTypesList(assetTypesList.filter((data) => data.class_id === id))
    setFilterAssetClassesList(assetClassesList.filter((data) => data.asset_class_id !== id))
    setIds({...ids, classId: id})
  }

  const handleClose = () => {
    setEditList(!editList)
    setAddAssetClass({})
  }

  const handleDelete = (id) => () => {
    let obj = {
      action: 'delete',
      asset_class_id: id,
      modified_by: 173,
    }
    dispatch(deleteAssetClassesAction(obj))
  }

  const handleDisassociate = (id) => {
    let obj = {
      action: 'disassociate',
      asset_type_id: id,
      modified_by: 173,
      classListAction: 'FetchAssetType', // this is for another request that is initiated from within the below request
    }
    dispatch(deleteAssetTypeClassAction(obj))
  }

  const handleAssociate = () => {
    let obj = {
      action: 'associate',
      asset_type_id: ids.assetTypeId.toString(),
      class_id: ids?.classId.toString(),
      modified_by: 173,
      classListAction: 'FetchAssetType', // this is for another request that is initiated from within the below request
    }
    dispatch(deleteAssetTypeClassAction(obj))
  }

  const handleChange = (e) => {
    setAddAssetClass({...addAssetClass, [e.target.name]: e.target.value})
  }

  const checkDuplicacy = (type, value) => {
    return !!assetClassesList.find((elem) => elem[type] === value)
  }

  const handleSubmit = () => {
    if (!addAssetClass?.name) {
      setMessage('Please Enter Asset Class')
      setStatus('warning')
      return
    }
    if (!addAssetClass?.code) {
      setMessage('Please Enter Asset Class Code')
      setStatus('warning')
      return
    }
    if (addAssetClass?.code?.length > 2) {
      setMessage('Asset Class Code cannot be more than 2 characters.')
      setStatus('warning')
      return
    }
    if (addAssetClass?.name && checkDuplicacy('name', addAssetClass?.name) && !editList) {
      setMessage('Asset Class Already Exist.')
      setStatus('warning')
      return
    }
    if (addAssetClass?.code && checkDuplicacy('code', addAssetClass?.code) && !editList) {
      setMessage('Asset Class Code Already Exist.')
      setStatus('warning')
      return
    }
    if (addAssetClass?.name && addAssetClass?.code) {
      dispatch(postAssetClassesAction({...addAssetClass, action: editList ? 'edit' : 'add', modified_by: 173, created_by: 173}))
    }
  }

  const handleCancel = () => {
    setAddAssetClass({})
  }

  const handleSnackBarClose = () => {
    setMessage('')
    setStatus('')
    dispatch(adminListActions.clearMessageData())
  }

  return (
    <MyDiv>
      {(adminState?.assetClassesList?.loading || adminState?.deleteAssetClasses?.loading || adminState?.postAssetClasses?.loading || adminState?.assetClassDetail?.loading) &&
      <div>
        <Loader />
      </div>
      }
      <Box className="page_heading">
        <Grid container>
          <Grid item md={6}>
            <Typography>
              {editList ? 'Associated Asset Types' : 'Manage Asset Classes'}
            </Typography>
          </Grid>
          {editList && (
            <Grid item md={6}>
              <Typography>Other Asset Classes</Typography>
            </Grid>
          )}
        </Grid>
      </Box>
      <Box className="admin_card">
        {editList &&
        <IconButton className="back_icon" onClick={handleClose}>
          <ArrowBackIosNewIcon />
        </IconButton>
        }
        <Grid container className="action_grid" columnSpacing={{md: 4}}>
          <Grid item md={4}>
            <Box className="input_box">
              <Typography>Asset Class Name</Typography>
              <CustomTextBox
                value={addAssetClass?.name ?? ''}
                name="name"
                fieldLabel="Asset Class Name"
                onChange={handleChange}
              />
            </Box>
          </Grid>
          <Grid item md={4}>
            <Box className="input_box">
              <Typography>Asset Class Code</Typography>
              <CustomTextBox
                value={addAssetClass?.code ?? ''}
                name="code"
                fieldLabel="Asset Class Code"
                onChange={handleChange}
              />
            </Box>
          </Grid>
          <Grid item md={4}>
            <Box className="input_box">
              <Typography>Description</Typography>
              <CustomTextBox
                value={addAssetClass?.description ?? ''}
                name="description"
                fieldLabel="Description"
                onChange={handleChange}
              />
            </Box>
          </Grid>
          <Grid item md={4}>
            <Box className="input_box">
              <Typography>Examples</Typography>
              <CustomTextArea minRows={4} value={addAssetClass?.examples ?? ''} name="examples" fieldLabel="Examples" onChange={handleChange} />
            </Box>
          </Grid>
          <Grid item md={4}>
            <Box className="input_box">
              <Typography>Comments</Typography>
              <CustomTextArea minRows={4} value={addAssetClass?.comments ?? ''} name="comments" fieldLabel="Comments" onChange={handleChange} />
            </Box>
          </Grid>
        </Grid>
        <Box className="d-flex btn_row">
          <CustomButton
            title={editList ? 'Edit' : 'Save'}
            variant="contained"
            className="btn_theme"
            onClick={handleSubmit}
          />
          <CustomButton
            title="Cancel"
            variant="contained"
            className="btn_theme"
            onClick={handleCancel}
          />
        </Box>
      </Box>
      {editList ? (
        <Box className="admin_card" mt={3}>
          <Grid container className="content_grid" columnSpacing={{md: 4}}>
            <Grid item md={6}>
              <AssociatedAsset filterAssetTypesList={filterAssetTypesList} handleDisassociate={handleDisassociate} />
            </Grid>
            <Grid item md={6}>
              <AssetClassesList filterAssetClassesList={filterAssetClassesList} assetTypesList={assetTypesList} handleAssociate={handleAssociate}
                handleListItemClick={handleListItemClick} selectedIndex={selectedIndex} handleChangeAccordion={handleChangeAccordion} expanded={expanded}
              />
            </Grid>
          </Grid>
        </Box>
      ) : (
        <Box mt={3}>
          <AssetClassTable assetClassesList={assetClassesList} handleEdit={handleEdit} handleDelete={handleDelete} />
        </Box>
      )}
      <AlertMessage
        message={message}
        severity={status}
        open={message?.length > 0}
        close={handleSnackBarClose}
      />
    </MyDiv>
  )
}
