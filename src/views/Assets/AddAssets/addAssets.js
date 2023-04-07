/* eslint-disable no-unused-vars */
import React, {useState, useEffect} from 'react'
import {
  Box,
  FormControl,
  Grid,
  IconButton,
  Select,
  Typography,
  MenuItem,
  FormControlLabel,
  Checkbox,
  RadioGroup,
  Radio,
} from '@mui/material'
import styled from 'styled-components'
import {
  KeyboardArrowLeft as KeyboardArrowLeftIcon,
  KeyboardArrowRight as KeyboardArrowRightIcon,
  Add,
} from '@mui/icons-material'
import {useHistory} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {
  AlertMessage,
  CustomAutoComplete,
  CustomButton,
  CustomTextArea,
  CustomTextBox,
  Loader,
} from '../../../components'
import * as routesNames from '../../../constants/routes'
import AddAssetDialog from '../../AddAssetDialog'
import {getLocationsDataAction} from '../../../redux/home/HomeActions'
import {addAssetTypeAction, getAssetDetailsAction, getMakeCapacityAction, postLineDetailAction, getLineByAreaListAction} from '../../../redux/lines/LineActions'
import {assetsListActions} from '../../../redux/assets/assets'
import {getAreaListAction} from '../../../redux/admin/AdminActions'
import {postAddAssetAction} from '../../../redux/assets/AssetsActions'
import MyDiv from './addAssets.style'

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

const mileage = [
  {
    id: 1,
    name: 'Mileage',
  },
  {
    id: 2,
    name: 'Hours',
  },
]

const specialNote = [
  {
    id: 1,
    name: 'Leased',
  },
  {
    id: 2,
    name: 'Not Valued',
  },
  {
    id: 3,
    name: 'Valued for Salvageable Components Only',
  },
  {
    id: 4,
    name: 'Disassembled at Time of Inspection',
  },
  {
    id: 5,
    name: 'Not Inspected by Appraiser',
  },
  {
    id: 6,
    name: 'Not Inspected by Appraiser. Information Provided by Company.',
  },
  {
    id: 7,
    name: 'Out of Service at Time of Inspection',
  },
  {
    id: 8,
    name: 'Disconnected and Out of Service at Time of Inspection.',
  },
  {
    id: 9,
    name: 'Not in Use at Time of Inspection',
  },
  {
    id: 10,
    name: 'Not Yet Installed at Time of Inspection',
  },
  {
    id: 11,
    name: 'Appraised Utilizing Cost Approach',
  },
  {
    id: 12,
    name: 'Located Outside',
  },
  {
    id: 13,
    name: 'Create a New Note',
  },
]

const quantity = [
  {
    id: 1,
    name: 'Lot',
    type: 'lot',
  },
  {
    id: 2,
    name: 'Quantity',
    type: 'number',
  },
]

export default function AddAssets() {

  const history = useHistory()
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
  const [areaList, setAreaList] = useState([])
  const [lineList, setLineList] = useState([])
  const [addValue, setAddValue] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState('')
  const [types, setTypes] = useState('')
  const [checkValue, setCheckValue] = useState('')
  const [flagged, setFlagged] = useState(false)

  const homeState = useSelector((state) => state.home)
  const lineState = useSelector((state) => state.line)
  const adminState = useSelector((state) => state.admin)
  const assetState = useSelector((state) => state.assets)

  const locationsDataFull = locationData?.locationsDataFull
  const appraiserList = assetData?.appraiserList

  let locationGetLastAsset = {
    location_id: locationsDataFull?.[0]?.location_id?.toString(),
    getLastAsset: true,
  }

  let makeCapacityData = {
    type: 'getMakeCapacityList',
    project_id_crm: 'ed69ffa3-7089-da7c-2bbb-5661f3c0d433',
  }

  useEffect(() => {
    dispatch(getLocationsDataAction(locationGetLastAsset))
    dispatch(getMakeCapacityAction(makeCapacityData))
  }, [dispatch])

  useEffect(() => {
    setLocationData(homeState?.locationsList?.locationsList?.data)
    let assetData = {
      location_id: locationsDataFull?.[0]?.location_id?.toString(),
      project_id_crm: 'ed69ffa3-7089-da7c-2bbb-5661f3c0d433',
    }
    let areaData = {
      location_id: locationsDataFull?.[0]?.location_id?.toString(),
    }
    if (locationsDataFull?.[0]?.location_id !== undefined) {
      setLocationId(locationsDataFull?.[0]?.location_id)
      dispatch(getAssetDetailsAction(assetData))
      dispatch(getAreaListAction(areaData))
    }
  }, [homeState?.locationsList?.locationsList, locationsDataFull?.[0]?.location_id])

  useEffect(() => {
    setAssetData(lineState?.assetDetails?.assetDetails?.data)
  }, [lineState?.assetDetails?.assetDetails])

  useEffect(() => {
    setMakesList(lineState?.makeCapacityList?.makeCapacityList?.data)
  }, [lineState?.makeCapacityList?.makeCapacityList?.data])

  useEffect(() => {
    setAssetTypes(assetData?.assetTypeList)
  }, [assetData?.assetTypeList])

  useEffect(() => {
    setAreaList(adminState?.areaList?.areaList)
  }, [adminState?.areaList?.areaList])

  useEffect(() => {
    setLineList(lineState?.lineByAreaList?.lineByAreaList)
  }, [lineState?.lineByAreaList?.lineByAreaList])

  useEffect(() => {
    let obj = {
      location_id: locationId,
      area: inputValues?.area,
    }
    if (types === 'areaData') {
      dispatch(getLineByAreaListAction(obj))
    }
  }, [types, inputValues?.area])

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

  useEffect(() => {
    if (assetState?.messageData.status === 'success') {
      setMessage(assetState?.messageData?.message)
      setStatus('success')
    }
  }, [assetState?.messageData])

  const handleChange = (e) => {
    setInputValues({...inputValues, [e?.target?.name]: e?.target?.value})
  }

  const handleChangeValues = (e, type) => {
    if (type === 'location') {
      setLocationId(e.target.value)
      let assetData = {
        location_id: e.target.value.toString(),
        project_id_crm: 'ed69ffa3-7089-da7c-2bbb-5661f3c0d433',
      }
      let areaData = {
        location_id: e.target.value.toString(),
      }
      dispatch(getAssetDetailsAction(assetData))
      dispatch(getAreaListAction(areaData))
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

  const handleOnSelect = (item, type) => {
    setTypes(type)
    switch (type) {
      case 'capacityData':
        return setInputValues({...inputValues, capacity: item?.capacity})
      case 'makeData':
        return setInputValues({...inputValues, make: item?.make, make_id: item?.make_id})
      case 'areaData':
        return setInputValues({...inputValues, area: item?.area})
      case 'lineData':
        return setInputValues({...inputValues, line_name: item.line_name, type_id: item.type_id})
      default:
        break
    }
  }

  const formatResult = (item, type) => {
    switch (type) {
      case 'capacityData':
        return <span style={{display: 'block', textAlign: 'left'}}>{item.capacity}</span>
      case 'makeData':
        return <span style={{display: 'block', textAlign: 'left'}}>{item.make}</span>
      case 'areaData':
        return <span style={{display: 'block', textAlign: 'left'}}>{item.area}</span>
      case 'lineData':
        return <span style={{display: 'block', textAlign: 'left'}}>{item.line_name}</span>
      default:
        break
    }
  }

  const handleCheckbox = (e) => {
    setCheckValue(e.target.value)
  }

  const handleFlagged = (e) => {
    setFlagged(e.target.checked)
  }

  const handleSubmit = () => {
    let obj = {
      appraiser: inputValues?.appraiser ?? null,
      appraiser_note: inputValues?.appraiser_note ?? null,
      area: inputValues?.area ?? null,
      asset_class_id: inputValues?.asset_class_id ?? null,
      asset_no: inputValues?.asset_no ?? null,
      asset_type_id: inputValues?.asset_type_id ?? null,
      capacity: inputValues?.capacity ?? null,
      condition: inputValues?.condition ?? null,
      cost: inputValues?.cost ?? null,
      created_by: 173,
      description: inputValues?.description ?? null,
      flagged: flagged === true ? '1' : '0',
      is_not_found: checkValue === '1' ? '1' : '2',
      line_name: inputValues?.line_name ?? null,
      location_id: locationId,
      make: inputValues?.make ?? null,
      make_id: inputValues?.make_id ?? null,
      mileage: inputValues?.mileage ?? null,
      mileage_type: inputValues?.mileage_type ?? null,
      model: inputValues?.model ?? null,
      model_label_id: inputValues?.model_label_id ?? null,
      modified_by: 173,
      parent_line: inputValues?.type_id ?? 0,
      priceVal: {
        'Forced Liquidation Value': lineValues.flvs,
        'Orderly Liquidation Value': lineValues.olvs,
      },
      project_id: locationsDataFull?.[0]?.project_id,
      quantity: Number(inputValues?.quantity) ?? null,
      quantity_type: inputValues?.quantity_type ?? null,
      serial_label_id: inputValues?.serial_label_id ?? null,
      serial_number: inputValues?.serial_number ?? null,
      special_notes: inputValues.special_notes === 'Create a New Note' ? inputValues?.notes ?? null : inputValues?.special_notes ?? null,
      type: 'asset',
      year: inputValues?.year ?? null,
    }
    dispatch(postAddAssetAction(obj))
  }

  const handleList = () => {
    history.push(routesNames.ASSETLIST)
  }

  const handleSnackBarClose = () => {
    setMessage('')
    setStatus('')
    dispatch(assetsListActions.clearMessageData())
  }

  return (
    <MyDiv>
      {(homeState?.locationsList?.loading || lineState?.assetDetails?.loading || assetState?.postAddAsset?.loading) &&
      <div>
        <Loader />
      </div>
      }
      <Box className="page_heading">
        <Typography>Add Assets</Typography>
      </Box>
      <Box className="wrapper_box">
        <Box className="d-flex box_actions">
          <Box>
            <IconButton className="icon">
              <KeyboardArrowLeftIcon />
            </IconButton>
            <IconButton className="icon">
              <KeyboardArrowRightIcon />
            </IconButton>
          </Box>
          <CustomButton
            variant="contained"
            title="View Asset List"
            className="btn_theme"
            onClick={handleList}
          />
        </Box>
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
              <Typography>Area</Typography>
              <CustomAutoComplete
                items={areaList}
                resultStringKeyName="area"
                handleOnSelect={(item) => handleOnSelect(item, 'areaData')}
                formatResult={(item) => formatResult(item, 'areaData')}
                placeholder="Search Area"
                showIcon={false}
                fuseOptions={{keys: ['area']}}
                styling={autoCompleteStyle}
              />
            </Box>
          </Grid>
          <Grid item md={3}>
            <Box className="input_box">
              <Typography>Line</Typography>
              <CustomAutoComplete
                items={lineList}
                resultStringKeyName="line_name"
                handleOnSelect={(item) => handleOnSelect(item, 'lineData')}
                formatResult={(item) => formatResult(item, 'lineData')}
                placeholder="Search Line"
                showIcon={false}
                fuseOptions={{keys: ['line_name']}}
                styling={autoCompleteStyle}
              />
            </Box>
          </Grid>
          <Grid item md={3}>
            <Box className="input_box">
              <Typography>Quantity</Typography>
              <Box className="d-flex">
                <FormControl size="small" fullWidth className="form_control">
                  <Select
                    id="select_input"
                    className="select_value"
                    value={inputValues.quantity_type}
                    onChange={handleChange}
                    name="quantity_type"
                    MenuProps={{...Menu}}
                  >
                    {quantity?.map((item) => {
                      return (
                        <StyledMenuItem key={item.id} value={item.type}>
                          {item.name}
                        </StyledMenuItem>
                      )
                    })}
                  </Select>
                </FormControl>
                <CustomTextBox
                  value={inputValues?.quantity}
                  onChange={handleChange}
                  name="quantity"
                  disabled={inputValues?.quantity_type === 'lot'}
                />
              </Box>
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
              <Typography>Make</Typography>
              <CustomAutoComplete
                items={makesList?.makeList}
                resultStringKeyName="make"
                handleOnSelect={(item) => handleOnSelect(item, 'makeData')}
                formatResult={(item) => formatResult(item, 'makeData')}
                placeholder="Search Make"
                showIcon={false}
                fuseOptions={{keys: ['make']}}
                styling={autoCompleteStyle}
              />
            </Box>
          </Grid>
          <Grid item md={3}>
            <Box className="input_box">
              <Typography>Model</Typography>
              <Box className="d-flex">
                <FormControl size="small" fullWidth className="form_control">
                  <Select
                    id="select_input"
                    className="select_value"
                    value={inputValues.model_label_id}
                    onChange={handleChange}
                    name="model_label_id"
                    MenuProps={{...Menu}}
                  >
                    {assetData?.modelLabelList?.map((item) => {
                      return (
                        <StyledMenuItem key={item.model_label_id} value={item.model_label_id}>
                          {item.name}
                        </StyledMenuItem>
                      )
                    })}
                  </Select>
                </FormControl>
                <CustomTextBox
                  value={inputValues?.model}
                  onChange={handleChange}
                  name="model"
                />
              </Box>
            </Box>
          </Grid>
          <Grid item md={3}>
            <Box className="input_box">
              <Typography>Capacity</Typography>
              <CustomAutoComplete
                items={makesList?.capacityList}
                resultStringKeyName="capacity"
                handleOnSelect={(item) => handleOnSelect(item, 'capacityData')}
                formatResult={(item) => formatResult(item, 'capacityData')}
                placeholder="Search Capacity"
                showIcon={false}
                fuseOptions={{keys: ['capacity']}}
                styling={autoCompleteStyle}
              />
            </Box>
          </Grid>
          <Grid item md={3}>
            <Box className="input_box">
              <Box className="d-flex add_btn">
                <Typography>Asset Type</Typography>
                <IconButton onClick={handleDialog}>
                  <Add />
                </IconButton>
              </Box>
              <FormControl size="small" fullWidth>
                <Select
                  id="select_input"
                  className="select_value"
                  value={inputValues?.asset_type_id ?? ''}
                  onChange={handleChange}
                  MenuProps={{...Menu, autoFocus: false}}
                  name="asset_type_id"
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
              <Typography>Serial Number</Typography>
              <Box className="d-flex">
                <FormControl size="small" fullWidth className="form_control">
                  <Select
                    id="select_input"
                    className="select_value"
                    value={inputValues.serial_label_id}
                    onChange={handleChange}
                    name="serial_label_id"
                    MenuProps={{...Menu}}
                  >
                    {assetData?.serialLabelList?.map((item) => {
                      return (
                        <StyledMenuItem key={item.serial_label_id} value={item.serial_label_id}>
                          {item.name}
                        </StyledMenuItem>
                      )
                    })}
                  </Select>
                </FormControl>
                <CustomTextBox
                  value={inputValues?.serial_number}
                  onChange={handleChange}
                  name="serial_number"
                />
              </Box>
            </Box>
          </Grid>
          <Grid item md={3}>
            <Box className="input_box">
              <Typography>Year</Typography>
              <CustomTextBox
                value={inputValues?.year}
                onChange={handleChange}
                name="year"
              />
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
              <Typography>Description</Typography>
              <CustomTextArea minRows={3} value={inputValues.description ?? ''} name="description" onChange={handleChange} />
            </Box>
          </Grid>
          <Grid item md={3}>
            <Box className="input_box">
              <Typography>Appraiser Notes</Typography>
              <CustomTextArea minRows={3} value={inputValues.appraiser_note ?? ''} name="appraiser_note" onChange={handleChange} />
            </Box>
          </Grid>
          <Grid item md={12} className="project_name d-flex mb-20">
            <Typography variant="h6">Price values allowed-</Typography>
            <Typography>
              "No Value", "Not Valued", "Leased" or Numeric.
            </Typography>
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
          <Grid item md={3}>
            <Box className="input_box">
              <Typography>Mileage</Typography>
              <Box className="d-flex">
                <FormControl size="small" fullWidth className="form_control">
                  <Select
                    id="select_input"
                    className="select_value"
                    value={inputValues.mileage_type}
                    onChange={handleChange}
                    name="mileage_type"
                    MenuProps={{...Menu}}
                  >
                    {mileage?.map((item) => {
                      return (
                        <StyledMenuItem key={item.id} value={item.name}>
                          {item.name}
                        </StyledMenuItem>
                      )
                    })}
                  </Select>
                </FormControl>
                <CustomTextBox
                  value={inputValues?.mileage}
                  onChange={handleChange}
                  name="mileage"
                />
              </Box>
            </Box>
          </Grid>
          <Grid item md={3} />
          <Grid item md={3}>
            <Box className="input_box">
              <Typography>Special Note</Typography>
              <FormControl size="small" fullWidth>
                <Select
                  id="select_input"
                  className="select_value"
                  value={inputValues.special_notes}
                  onChange={handleChange}
                  name="special_notes"
                  MenuProps={{...Menu}}
                >
                  {specialNote?.map((item) => {
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
          {inputValues.special_notes === 'Create a New Note' &&
          <Grid item md={3}>
            <Box className="input_box">
              <Typography>Notes</Typography>
              <CustomTextBox
                value={inputValues?.notes}
                onChange={handleChange}
                name="notes"
              />
            </Box>
          </Grid>
          }
          <Grid item md={3} className="notes_special">
            <FormControlLabel
              className="checked_label"
              control={<Checkbox onChange={(e) => handleFlagged(e)} checked={inputValues?.includeLine} />}
              label="Flagged"
            />
            <FormControl>
              <RadioGroup row>
                <FormControlLabel
                  className="checked_label"
                  value="1"
                  control={<Radio onChange={(e) => handleCheckbox(e)} checked={checkValue === '1'} />}
                  label="Found"
                />
                <FormControlLabel
                  className="checked_label"
                  value="2"
                  control={<Radio onChange={(e) => handleCheckbox(e)} checked={checkValue === '2'} />}
                  label="Not Found"
                />
              </RadioGroup>
            </FormControl>
          </Grid>
        </Grid>
        <Box className="d-flex btn-flex mb-20 mt-10">
          <CustomButton
            title="Save"
            variant="contained"
            className="btn_theme"
            onClick={handleSubmit}
          />
          <CustomButton
            title="Save & Create New"
            variant="contained"
            className="btn_theme"
          />
          <CustomButton
            title="Save & Copy New"
            variant="contained"
            className="btn_theme"
          />
          <CustomButton
            title="Save & Copy Below"
            variant="contained"
            className="btn_theme"
          />
          <CustomButton
            title="Back"
            variant="contained"
            className="btn_theme"
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
