import React, {useState, useEffect} from 'react'
import {
  Box,
  Grid,
  Typography,
  MenuItem,
  FormControl,
  Select,
  IconButton,
} from '@mui/material'
import {Add} from '@mui/icons-material'
import styled from 'styled-components'
import {useDispatch, useSelector} from 'react-redux'
// import {FixedSizeList as WindowList} from 'react-window'
import {
  AlertMessage,
  CustomAutoComplete,
  CustomButton,
  CustomTextArea,
  CustomTextBox,
  Loader,
} from '../../../components'
import AddAssetDialog from '../../AddAssetDialog'
import {getLocationsDataAction} from '../../../redux/home/HomeActions'
import {getAssetDetailsAction, addAssetTypeAction, getMakeCapacityAction, postLineDetailAction} from '../../../redux/lines/LineActions'
import {adminListActions} from '../../../redux/admin/admin'
import MyDiv from './addLine.style'

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

// const StyledMenuAsset = styled(MenuItem)(() => ({
//   '&.MuiMenuItem-root': {
//     borderBottom: '1px solid #ccc',
//     color: '#000000',
//     fontWeight: '400',
//     fontSize: '14px',
//     fontFamily: 'Poppins,sans-serif',
//   },
//   '&.MuiMenuItem-root:first-child': {
//     marginTop: '0px',
//   },
//   '&.MuiMenuItem-root:last-child': {
//     marginBottom: '-8px',
//   },
// }))

const ITEM_HEIGHT = 60
const Menu = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5,
    },
  },
}

const autoCompleteStyle = {
  height: '35px',
  border: '1px solid #aaa',
  borderRadius: '4px',
  backgroundColor: 'white',
  boxShadow: 'none',
  hoverBackgroundColor: '#eee',
  color: '#212121',
  fontSize: '14px',
  fontFamily: 'Poppins',
  iconColor: 'grey',
  lineColor: 'rgb(232, 234, 237)',
  placeholderColor: 'grey',
  clearIconMargin: '3px 14px 0 0',
  zIndex: 1,
  searchIconMargin: '0 0 0 16px',
}

const condition = [
  {
    id: 1,
    name: 'New',
  },
  {
    id: 2,
    name: 'Excellent',
  },
  {
    id: 3,
    name: 'Very Good',
  },
  {
    id: 4,
    name: 'Good',
  },
  {
    id: 5,
    name: 'Fair',
  },
  {
    id: 6,
    name: 'Poor',
  },
  {
    id: 7,
    name: 'NA',
  },
  {
    id: 8,
    name: 'Scrap',
  },
  {
    id: 9,
    name: 'Salvage',
  },
]

export default function AddLine() {

  const dispatch = useDispatch()
  const [inputValues, setInputValues] = useState({})
  const [lineValues, setLineValues] = useState({})
  const [openDialog, setOpenDialog] = useState(false)
  const [locationData, setLocationData] = useState()
  const [assetData, setAssetData] = useState([])
  const [locationId, setLocationId] = useState()
  const [searchName, setSearchName] = useState('')
  const [assetTypes, setAssetTypes] = useState([])
  const [makesList, setMakesList] = useState([])
  const [addValue, setAddValue] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState('')

  const homeState = useSelector((state) => state.home)
  const lineState = useSelector((state) => state.line)

  const locationsDataFull = locationData?.locationsDataFull
  const appraiserList = assetData?.appraiserList

  let makeCapacityData = {
    type: 'getMakeCapacityList',
    project_id_crm: 'ed69ffa3-7089-da7c-2bbb-5661f3c0d433',
  }

  useEffect(() => {
    dispatch(getLocationsDataAction())
    dispatch(getMakeCapacityAction(makeCapacityData))
  }, [dispatch])

  useEffect(() => {
    setLocationData(homeState?.locationsList?.locationsList?.data)
    let assetData = {
      location_id: locationsDataFull?.[0]?.location_id?.toString(),
      type: 'line',
      project_id_crm: 'ed69ffa3-7089-da7c-2bbb-5661f3c0d433',
    }
    if (locationsDataFull?.[0]?.location_id !== undefined) {
      setLocationId(locationsDataFull?.[0]?.location_id)
      dispatch(getAssetDetailsAction(assetData))
    }
  }, [homeState?.locationsList?.locationsList, locationsDataFull?.[0]?.location_id])

  useEffect(() => {
    setAssetData(lineState?.assetDetails?.assetDetails?.data)
  }, [lineState?.assetDetails?.assetDetails])

  useEffect(() => {
    setMakesList(lineState?.makeCapacityList?.makeCapacityList?.data?.makeList)
  }, [lineState?.makeCapacityList?.makeCapacityList?.data])

  useEffect(() => {
    setAssetTypes(assetData?.assetTypeList)
  }, [assetData?.assetTypeList])

  useEffect(() => {
    if (lineState?.messageData.status === 'success') {
      setMessage(lineState?.messageData?.message)
      setStatus('success')
      setAddValue('')
      setOpenDialog(false)
      setInputValues({})
      setLineValues({})
    }
    if (lineState?.messageData.status === 'failed') {
      setMessage(lineState?.messageData?.message)
      setStatus('warning')
    }
  }, [lineState?.messageData])

  const handleChange = (e) => {
    setInputValues({...inputValues, [e?.target?.name]: e?.target?.value})
  }

  const handleChangeValues = (e, type) => {
    if (type === 'location') {
      setLocationId(e.target.value)
      let assetData = {
        location_id: e.target.value.toString(),
        type: 'line',
        project_id_crm: 'ed69ffa3-7089-da7c-2bbb-5661f3c0d433',
      }
      dispatch(getAssetDetailsAction(assetData))
    }
    setLineValues({...lineValues, [e.target.name]: e.target.value})
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
    dispatch(addAssetTypeAction(addObj))
  }

  const handleSearch = (e) => {
    const searchValue = e.target.value
    setSearchName(searchValue)
    if (searchValue !== '') {
      const result = assetData?.assetTypeList?.filter((item) => {
        return item.asset_type.toLowerCase().startsWith(searchValue.toLowerCase())
      })
      setAssetTypes(result)
    } else {
      setAssetTypes(assetData?.assetTypeList)
    }
  }

  const handleDialog = () => {
    setOpenDialog(!openDialog)
    setAddValue('')
  }

  const handleOnSelect = (item) => {
    setInputValues({...inputValues, make_id: item.make_id})
  }

  const formatResult = (item) => {
    return (
      <>
        <span style={{display: 'block', textAlign: 'left'}}>{item.make}</span>
      </>
    )
  }

  const handleSubmit = () => {
    if (!inputValues?.appraiser) {
      setMessage('Please Select Appraiser')
      setStatus('warning')
      return
    }
    if (!(inputValues?.make_id && inputValues?.line_name && inputValues?.asset_type_id)) {
      setMessage('Please enter atleast one field from Make, Text1 and Asset Type.')
      setStatus('warning')
      return
    }
    if (inputValues?.appraiser && inputValues?.make_id && inputValues?.line_name && inputValues?.asset_type_id) {
      let priceVal = {
        'Forced Liquidation Value': lineValues.flvs,
        'Orderly Liquidation Value': lineValues.olvs,
      }
      dispatch(postLineDetailAction({...inputValues, location_id: locationId, type: 'line', project_id: locationsDataFull?.[0]?.project_id,
        modified_by: 173, formAction: 'saveUpdate', created_by: 173, priceVal,
      }))
    }
  }

  const handleSnackBarClose = () => {
    setMessage('')
    setStatus('')
    dispatch(adminListActions.clearMessageData())
  }

  return (
    <MyDiv>
      {(homeState?.locationsList?.loading || lineState?.assetDetails?.loading || lineState?.postLineDetail?.loading) &&
      <div>
        <Loader />
      </div>
      }
      <Box className="page_heading">
        <Typography>Add Line</Typography>
      </Box>
      <Box className="wrapper_box">
        <Grid container columnSpacing={{sm: 4, md: 4}}>
          <Grid item md={3} className="project_name d-flex">
            <Typography variant="h6">Project :-</Typography>
            <Typography>{locationsDataFull?.[0]?.project_name}</Typography>
          </Grid>
          <Grid item md={3}>
            <Box className="input_box">
              <Typography>Select Location</Typography>
              <FormControl size="small" fullWidth>
                <Select
                  id="select_input"
                  className="select_value"
                  value={lineValues.location || locationId !== undefined ? locationId : null}
                  onChange={(e) => handleChangeValues(e, 'location')}
                  name="location"
                  MenuProps={{...Menu}}
                >
                  {locationsDataFull?.map((item) => {
                    return (
                      <StyledMenuItem key={item.location_id} value={item.location_id}>
                        {item.name} [{item.street} {item.city} {item.country}]
                      </StyledMenuItem>
                    )
                  })}
                </Select>
              </FormControl>
            </Box>
          </Grid>
          <Grid item md={3}>
            <Box className="input_box">
              <Typography>Appraiser</Typography>
              <FormControl size="small" fullWidth>
                <Select
                  id="select_input"
                  className="select_value"
                  value={inputValues?.appraiser ?? ''}
                  onChange={handleChange}
                  name="appraiser"
                  MenuProps={{...Menu}}
                >
                  {/* {locationId !== undefined && locationAppraisers && Object.keys(locationAppraisers[locationId])?.map((elem, index) => {
                    return (
                      <StyledMenuItem key={index} value={elem}>
                        {locationAppraisers[locationId][elem]}
                      </StyledMenuItem>
                    )
                  })} */}
                  {appraiserList?.map((item) => {
                    return (
                      <StyledMenuItem key={item.user_id} value={item.user_id}>
                        {item.last_name}{' '}{item.name}
                      </StyledMenuItem>
                    )
                  })}
                </Select>
              </FormControl>
            </Box>
          </Grid>
          <Grid item md={3}>
            <Box className="input_box">
              <Typography>Asset #</Typography>
              <CustomTextBox
                value={inputValues?.asset_no ?? ''}
                onChange={handleChange}
                name="asset_no"
              />
            </Box>
          </Grid>
          <Grid item md={3}>
            <Box className="input_box">
              <Typography>Make</Typography>
              <CustomAutoComplete
                items={makesList}
                resultStringKeyName="make"
                handleOnSelect={handleOnSelect}
                formatResult={formatResult}
                placeholder="Search Make"
                showIcon={false}
                fuseOptions={{keys: ['make']}}
                styling={autoCompleteStyle}
              />
            </Box>
          </Grid>
          <Grid item md={3}>
            <Box className="input_box">
              <Typography>Text 1</Typography>
              <CustomTextBox
                value={inputValues?.line_name ?? ''}
                onChange={handleChange}
                name="line_name"
              />
            </Box>
          </Grid>
          <Grid item md={3}>
            <Box className="input_box">
              <Typography>Text 2</Typography>
              <CustomTextBox
                value={inputValues?.line_text2 ?? ''}
                onChange={handleChange}
                name="line_text2"
              />
            </Box>
          </Grid>
          <Grid item md={3}>
            <Box className="input_box">
              <Typography>Year</Typography>
              <CustomTextBox
                value={inputValues?.year ?? ''}
                onChange={handleChange}
                name="year"
              />
            </Box>
          </Grid>
          <Grid item md={3}>
            <Box className="input_box">
              <Box className="d-flex add_btn">
                <Typography>Asset Type</Typography>
                <IconButton onClick={handleDialog}><Add /></IconButton>
              </Box>
              <FormControl size="small" fullWidth>
                <Select
                  id="select_input"
                  className="select_value"
                  value={inputValues?.asset_type_id ?? ''}
                  onChange={handleChange}
                  name="asset_type_id"
                  MenuProps={{autoFocus: false, ...Menu}}
                >
                  <CustomTextBox
                    onKeyDown={(e) => {
                      e.stopPropagation()
                    }}
                    autoFocus
                    value={searchName}
                    onChange={handleSearch}
                    className="search_box"
                    fieldLabel="Search"
                  />
                  {assetTypes?.map((item) => {
                    return (
                      <StyledMenuItem key={item.asset_type_id} value={item.asset_type_id}>
                        {item.asset_type}
                      </StyledMenuItem>
                    )
                  })}
                  {/* <WindowList height={300} itemCount={assetTypes?.length} itemSize={35} width="100%">
                    {({index, style}) => (<StyledMenuAsset style={style} key={assetTypes[index]?.asset_type_id} value={assetTypes[index]?.asset_type_id}>
                      {assetTypes[index]?.asset_type}
                    </StyledMenuAsset>)}
                  </WindowList> */}
                </Select>
              </FormControl>
            </Box>
          </Grid>
          <Grid item md={3}>
            <Box className="input_box">
              <Typography>Asset Class</Typography>
              <FormControl size="small" fullWidth>
                <Select
                  id="select_input"
                  className="select_value"
                  value={inputValues.asset_class_id ?? ''}
                  onChange={handleChange}
                  name="asset_class_id"
                  MenuProps={{...Menu}}
                >
                  {assetData?.assetClassList?.map((item) => {
                    return (
                      <StyledMenuItem key={item.asset_class_id} value={item.asset_class_id}>
                        {item.name}
                      </StyledMenuItem>
                    )
                  })}
                </Select>
              </FormControl>
            </Box>
          </Grid>
          <Grid item md={3}>
            <Box className="input_box">
              <Typography>Condition</Typography>
              <FormControl size="small" fullWidth>
                <Select
                  id="select_input"
                  className="select_value"
                  value={inputValues.condition ?? ''}
                  onChange={handleChange}
                  name="condition"
                  MenuProps={{...Menu}}
                >
                  {condition?.map((item) => {
                    return (
                      <StyledMenuItem key={item.id} value={item.name}>
                        {item.name}
                      </StyledMenuItem>
                    )
                  })}
                </Select>
              </FormControl>
            </Box>
          </Grid>
          <Grid item md={3}>
            <Box className="input_box">
              <Typography>Cost</Typography>
              <CustomTextBox
                value={inputValues?.cost ?? ''}
                onChange={handleChange}
                name="cost"
              />
            </Box>
          </Grid>
          <Grid item md={3}>
            <Box className="input_box">
              <Typography>Appraiser Notes</Typography>
              <CustomTextArea minRows={3} value={inputValues.appraiser_note ?? ''} name="appraiser_note" onChange={handleChange} />
            </Box>
          </Grid>
          <Grid item md={3}>
            <Box className="input_box">
              <Typography>FLVs</Typography>
              <CustomTextBox
                value={lineValues.flvs ?? ''}
                onChange={handleChangeValues}
                name="flvs"
              />
            </Box>
          </Grid>
          <Grid item md={3}>
            <Box className="input_box">
              <Typography>OLVs</Typography>
              <CustomTextBox
                value={lineValues.olvs ?? ''}
                onChange={handleChangeValues}
                name="olvs"
              />
            </Box>
          </Grid>
        </Grid>
        <Box className="d-flex btn-flex mb-20 mt-10">
          <CustomButton
            title="Save & Back"
            variant="contained"
            className="btn_theme"
            onClick={handleSubmit}
          />
          <CustomButton
            title="Cancel"
            variant="contained"
            className="btn_theme"
          />
        </Box>
      </Box>
      <AddAssetDialog handleDialog={handleDialog} openDialog={openDialog} addValue={addValue} handleChangeAdd={handleChangeAdd} handleAdd={handleAdd} />
      <AlertMessage
        message={message}
        severity={status}
        open={message?.length > 0}
        close={handleSnackBarClose}
      />
    </MyDiv>
  )
}
