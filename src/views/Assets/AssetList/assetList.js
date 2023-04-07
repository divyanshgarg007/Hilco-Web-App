/* eslint-disable no-unused-vars */
import React, {useState, useEffect} from 'react'
import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  IconButton,
  Select,
  Typography,
  MenuItem,
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import styled from 'styled-components'
import {useDispatch, useSelector} from 'react-redux'
import {kaReducer} from 'ka-table'
import {
  DataType,
  SortingMode,
  FilteringMode,
} from 'ka-table/enums'
import {CustomButton, CustomTable, CustomTextBox, DataGrid, Loader} from '../../../components'
import {tableConfig} from '../../../utils/Table'
// import {DataGrid} from '../../../components'
import {getProjectDataAction} from '../../../redux/reports/ReportActions'
import {getAssetListDataAction} from '../../../redux/assets/AssetsActions'
import MyDiv from './assetList.style'

const audioData = [
  {
    id: 1,
    label: 'Audio',
  },
  {
    id: 2,
    label: 'Sticky',
  },
]

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


export default function AssetList(props) {

  const dispatch = useDispatch()
  const [config, setConfig] = useState(tableConfig)
  const [columnSetting, setColumnSetting] = useState(false)
  const [inputValues, setInputValues] = useState({})
  const [assetListData, setAssetListData] = useState([])
  const [projectId, setProjectId] = useState()
  const [locationId, setLocationId] = useState()

  // const tablePropsInit = {
  //   columns: [
  //     {
  //       key: 'selection-cell',
  //       style: {width: '30px'},
  //     },
  //     {
  //       dataType: DataType.Number,
  //       key: 'id',
  //       style: {width: '4%'},
  //       title: 'Ref#',
  //     },
  //     {
  //       dataType: DataType.String,
  //       key: 'flagged',
  //       style: {width: '4%'},
  //       title: 'Flag',
  //     },
  //     {
  //       dataType: DataType.String,
  //       key: 'is_not_found',
  //       style: {width: '4%'},
  //       title: 'Found',
  //     },
  //     {
  //       dataType: DataType.Number,
  //       key: 'asset_id',
  //       style: {width: '5%'},
  //       title: 'Asset Id',
  //     },
  //     {
  //       dataType: DataType.Number,
  //       key: 'quantity',
  //       style: {width: '5%'},
  //       title: 'Quantity',
  //     },
  //     {
  //       dataType: DataType.Number,
  //       key: 'asset_no',
  //       style: {width: '4%'},
  //       title: 'Asset#',
  //     },
  //     {
  //       dataType: DataType.String,
  //       key: 'make',
  //       style: {width: 100},
  //       title: 'Make',
  //     },
  //     {
  //       dataType: DataType.String,
  //       key: 'model',
  //       style: {width: '5%'},
  //       title: 'Model',
  //     },
  //     {
  //       dataType: DataType.String,
  //       key: 'capacity',
  //       style: {width: 160},
  //       title: 'Capacity/Text1',
  //     },
  //     {
  //       dataType: DataType.String,
  //       key: 'asset_type',
  //       style: {width: 120},
  //       title: 'Asset Type',
  //     },
  //     {
  //       dataType: DataType.String,
  //       key: 'asset_class_code',
  //       style: {width: '4%'},
  //       title: 'Class',
  //     },
  //     {
  //       dataType: DataType.String,
  //       key: 'serial_number',
  //       style: {width: '5%'},
  //       title: 'Serial Number',
  //     },
  //     {
  //       dataType: DataType.String,
  //       key: 'year',
  //       style: {width: '6%'},
  //       title: 'Year',
  //     },
  //     {
  //       dataType: DataType.String,
  //       key: 'condition',
  //       style: {width: '6%'},
  //       title: 'Condition',
  //     },
  //     {
  //       dataType: DataType.Number,
  //       key: 'value',
  //       style: {width: '5%'},
  //       title: 'FLVs',
  //     },
  //     {
  //       dataType: DataType.Number,
  //       key: 'value',
  //       style: {width: '5%'},
  //       title: 'OLVs',
  //     },
  //   ],
  //   data: assetListData?.getAssetsData?.asset,
  //   // groups: {columnKey: 'year'},
  //   rowKeyField: 'type_id',
  //   sortingMode: SortingMode.Single,
  //   paging: {
  //     enabled: true,
  //     pageIndex: 0,
  //     pageSize: 60,
  //     pageSizes: [60, 120, 180, 240, 300],
  //   },
  // }
  // const [assetTableData, setAssetTableData] = useState(tablePropsInit)

  const reportState = useSelector((state) => state.report)
  const assetsState = useSelector((state) => state.assets)

  useEffect(() => {
    dispatch(getProjectDataAction())
  }, [dispatch])

  useEffect(() => {
    setProjectId(reportState?.projectDataList?.projectDataList?.data?.[0]?.project_id)
  }, [reportState?.projectDataList?.projectDataList])

  useEffect(() => {
    if (reportState?.projectDataList?.projectDataList?.status === 200) {
      let locationData = {
        action: 'getLocation',
        project_id: projectId,
      }
      let appraiserData = {
        action: 'getAppraiser',
        project_id: projectId,
      }
      let areaData = {
        action: 'getArea',
        project_id: projectId,
      }
      // let assetData = {
      //   NForDeleted: false,
      //   action: 'getAssets',
      //   appraiser: null,
      //   area: null,
      //   capacity: null,
      //   global_search: null,
      //   hideCategorized: false,
      //   isAudio: false,
      //   location: null,
      //   make: null,
      //   model: null,
      //   pageNumber: 1,
      //   pageSize: 60,
      //   projectId: projectId,
      //   showOnlyAsset: false,
      //   sortCol: 'area_order',
      //   sortOrder: 'asc',
      // }
      dispatch(getAssetListDataAction(locationData))
      dispatch(getAssetListDataAction(appraiserData))
      dispatch(getAssetListDataAction(areaData))
      // dispatch(getAssetListDataAction(assetData))
    }
  }, [dispatch, projectId])

  useEffect(() => {
    setAssetListData(assetsState?.getAssetListData)
  }, [assetsState?.getAssetListData])

  // useEffect(() => {
  //   setAssetTableData(tablePropsInit)
  // }, [assetListData])

  // const dispatchAssets = (action) => {
  //   setAssetTableData((prevState) => kaReducer(prevState, action))
  // }

  const handleChange = (e, type) => {
    if (type === 'locations') {
      setLocationId(e.target.value)
    }

    setInputValues({...inputValues, [e.target.name]: e.target.value})
  }

  const handleSidebar = () => {
    setColumnSetting(!columnSetting)
  }

  return (
    <MyDiv>
      {(reportState?.projectDataList?.loading || assetsState?.getAssetListData?.loading || assetListData?.getAssetsData?.length === 0) &&
      <div>
        <Loader />
      </div>
      }
      <Box className="page_heading">
        <Box className="heading_box">
          <Typography>
            Assets List <span>Total Assets : {assetListData?.getAssetsData?.totalAssetCount}</span>
          </Typography>
          <FormControl className="checkbox_container">
            <FormControlLabel
              className="checked_label"
              control={<Checkbox />}
              label="Hide Cat. Assets"
            />
            <FormControlLabel
              className="checked_label"
              control={<Checkbox />}
              label="Show Assets"
            />
            <FormControlLabel
              className="checked_label"
              control={<Checkbox />}
              label="NF / Deleted"
            />
          </FormControl>
        </Box>
        <Box className="form_box">
          <FormControl size="small" fullWidth>
            <Select
              id="select_input"
              className="select_value"
              value={inputValues.location || 0}
              onChange={(e) => handleChange(e, 'locations')}
              name="location"
              MenuProps={{...Menu}}
            >
              <StyledMenuItem value={0}>All Locations</StyledMenuItem>
              {assetListData?.getLocationtData?.map((item) => {
                return (
                  <StyledMenuItem key={item.location_id} value={item.location_id}>
                    {item.name} [{item.street} {item.city} {item.country}]
                  </StyledMenuItem>
                )
              })}
            </Select>
          </FormControl>
          <FormControl size="small" fullWidth>
            <Select
              id="select_input"
              className="select_value"
              value={inputValues.appraiser || 0}
              onChange={handleChange}
              name="appraiser"
              MenuProps={{...Menu}}
            >
              <StyledMenuItem value={0}>All Appraisers</StyledMenuItem>
              {locationId ? assetListData?.getAppraiserData?.filter((data) => data.location_id === locationId)?.map((item) => {
                return (
                  <StyledMenuItem key={item.user_id} value={item.user_id}>
                    {item.last_name} {item.name}
                  </StyledMenuItem>
                )
              }) : assetListData?.getAppraiserData?.map((item) => {
                return (
                  <StyledMenuItem key={item.user_id} value={item.user_id}>
                    {item.last_name} {item.name}
                  </StyledMenuItem>
                )
              })
              }
            </Select>
          </FormControl>
          <FormControl size="small" fullWidth>
            <Select
              id="select_input"
              className="select_value"
              value={inputValues.area || 0}
              onChange={handleChange}
              name="area"
              MenuProps={{...Menu}}
            >
              <StyledMenuItem value={0}>All Areas</StyledMenuItem>
              {locationId ? assetListData?.getAreaData?.filter((data) => data.location_id === locationId)?.map((item) => {
                return (
                  <StyledMenuItem key={item.area} value={item.area}>
                    {item.area}
                  </StyledMenuItem>
                )
              }) : assetListData?.getAreaData?.map((item) => {
                return (
                  <StyledMenuItem key={item.area} value={item.area}>
                    {item.area}
                  </StyledMenuItem>
                )
              })
              }
            </Select>
          </FormControl>
          <CustomTextBox fieldLabel="Search" value={inputValues?.search} onChange={handleChange} className="search_input" />
          <FormControl size="small" fullWidth>
            <Select
              id="select_input"
              className="select_value"
              value={inputValues.isAudio || 0}
              onChange={handleChange}
              name="isAudio"
              MenuProps={{...Menu}}
            >
              <StyledMenuItem value={0}>Select</StyledMenuItem>
              {audioData?.map((item) => {
                return (
                  <StyledMenuItem key={item.id} value={item.id}>
                    {item.label}
                  </StyledMenuItem>
                )
              })}
            </Select>
          </FormControl>
          <CustomTextBox fieldLabel="Ref#" value={inputValues?.ref} onChange={handleChange} className="custom_input" />
          <CustomTextBox fieldLabel="Asset Id" value={inputValues?.asset_id} onChange={handleChange} className="custom_input" />
          <Box className="button_group">
            <CustomButton
              title="Search"
              variant="contained"
              className="btn_theme"
            />
            <CustomButton
              title="Reset"
              variant="contained"
              className="btn_reset"
            />
          </Box>
        </Box>
      </Box>
      <IconButton onClick={handleSidebar} className="column_setting">
        <MenuIcon />
      </IconButton>
      <DataGrid
        config={config}
        setConfig={setConfig}
        columnSetting={columnSetting}
        handleSidebar={handleSidebar}
      />
      {/* <CustomTable
        tableProps={assetTableData}
        dispatch={dispatchAssets}
        columnSetting={columnSetting}
        handleSidebar={handleSidebar}
      /> */}
    </MyDiv>
  )
}
