import React, {useState, useEffect} from 'react'
import {Box, Typography} from '@mui/material'
import {kaReducer} from 'ka-table'
import {DataType} from 'ka-table/enums'
import {kaPropsUtils} from 'ka-table/utils'
import {CSVLink} from 'react-csv'
import {useDispatch, useSelector} from 'react-redux'
import {AlertMessage, CustomButton, CustomTable, CustomTextBox, Loader} from '../../../components'
import {getProjectDataAction, getReportsListAction} from '../../../redux/reports/ReportActions'
import {getAppraiserTrueAction} from '../../../redux/admin/AdminActions'
import {AreaOrderingDialog} from '../components'
import {getLocationPriceValuesAction} from '../../../redux/home/HomeActions'
import {reportListActions} from '../../../redux/reports/report'
import MyDiv from './finalAssetListReport.style'

export default function FinalAssetListReport() {

  const dispatch = useDispatch()
  const [finalListData, setFinalListData] = useState([])
  const [locId, setLocId] = useState(null)
  const tablePropsInit = {
    columns: [
      {
        key: 'selection-cell',
        style: {width: '3.5%'},
      },
      {
        key: 'expand-cell',
        style: {width: '5%'},
      },
      {
        dataType: DataType.String,
        key: 'name',
        style: {width: 120},
        title: 'Location',
      },
      {
        dataType: DataType.String,
        key: 'street',
        style: {width: 120},
        title: 'Address',
      },
      {
        dataType: DataType.String,
        key: 'type_of_operation_c',
        style: {width: 120},
        title: 'Type of Operation',
      },
      {
        dataType: DataType.String,
        key: 'square_footage_c',
        style: {width: 120},
        title: 'Square Footage',
      },
      {
        key: 'area-ordering-cell',
        style: {width: 70},
        title: 'Area Ordering',
      },
      {
        key: 'location-asset-cell',
        style: {width: 80},
        title: 'Location Wise Assets',
      },
    ],
    data: finalListData,
    rowKeyField: 'location_id',
    paging: {
      enabled: true,
      pageIndex: 0,
      pageSize: 50,
      pageSizes: [50, 100, 150, 200, 250],
    },
  }

  const [finalTableList, setFinalTableList] = useState(tablePropsInit)
  const [openOrder, setOpenOrder] = useState(false)
  const [expandMore, setExpandMore] = useState(false)
  const [checked, setChecked] = useState([])
  const [filterListData, setFilterDataList] = useState([])
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState('')
  const [projectData, setProjectData] = useState([])
  const reportState = useSelector((state) => state.report)
  const homeState = useSelector((state) => state.home)

  useEffect(() => {
    dispatch(getAppraiserTrueAction())
    dispatch(getReportsListAction())
    dispatch(getProjectDataAction())
  }, [dispatch])

  useEffect(() => {
    setFinalListData(reportState?.reportsList?.reportsList)
  }, [reportState?.reportsList?.reportsList])

  useEffect(() => {
    setProjectData(reportState?.projectDataList?.projectDataList?.data)
  }, [reportState?.projectDataList?.projectDataList])

  useEffect(() => {
    setFinalTableList(tablePropsInit)
  }, [finalListData])

  useEffect(() => {
    let data = finalListData?.filter((item) => {return item.location_id === locId})
    setFilterDataList(data)
  }, [finalListData])

  const dispatchReports = (action) => {
    setFinalTableList((prevState) => kaReducer(prevState, action))
  }

  const handleOrder = (locationId) => {
    setOpenOrder(!openOrder)
    setLocId(locationId)
    let data = finalListData?.filter((item) => {return item.location_id === locationId})
    setFilterDataList(data)
  }

  const handleExpandClick = (e, locationId) => {
    setExpandMore(e?.currentTarget)
    let data = finalListData?.filter((item) => {return item.location_id === locationId})
    setFilterDataList(data)
  }

  const handleExpandClose = () => {
    setExpandMore(false)
  }

  const handleChange = (event) => {
    let updatedCheck = [...checked]
    let obj = {
      id: event?.target?.id,
      value: event?.target?.value,
    }
    if (event?.target?.checked) {
      updatedCheck = [...checked, obj]
    } else {
      updatedCheck.splice(checked.indexOf(event?.target.id), 1)
    }
    setChecked(updatedCheck)
  }

  const handlePdf = () => {
    if (reportState.selectedItems.length > 0) {
      let data = {
        action: 'getAssets',
        appraiser: null,
        area: null,
        capacity: null,
        getRefDataForReports: true,
        locations: reportState?.selectedItems,
        make: null,
        model: null,
        projectId: finalListData[0]?.project_id,
        showOnlyAsset: false,
        sortCol: 'area_order',
        sortOrder: 'asc',
      }
      let finalData = {
        currency_symbol: '$',
        locationArray: reportState?.selectedItems,
        locationDataFull: finalListData,
        projectData: projectData[0],
        project_id: finalListData[0]?.project_id,
        reportFormat: 'pdf',
        reportType: 'final_asset_list',
        start_page: 1,
        values_total: {
          FLV_TOTAL: 1374075,
          OLV_TOTAL: 1877225,
        },
      }
      dispatch(getLocationPriceValuesAction(data, finalData))
      dispatch(reportListActions.clearSelectedItems())
    } else if (reportState.selectedItems.length === 0) {
      setMessage('Please select at least one Asset List.')
      setStatus('warning')
    }
  }

  const handleSnackBarClose = () => {
    setMessage('')
    setStatus('')
    dispatch(reportListActions.clearMessageData())
  }

  return (
    <MyDiv>
      {(reportState?.reportsList?.loading || homeState?.locationsPriceValues?.loading) &&
      <div>
        <Loader />
      </div>
      }
      <Box className="page_heading">
        <Typography>FINAL ASSET LIST REPORT</Typography>
      </Box>
      <Box className="button_group">
        <CustomButton
          title="Generate Custom Reports"
          variant="contained"
          className="btn_theme"
        />
        <CSVLink
          data={kaPropsUtils.getData(finalTableList)}
          headers={finalTableList.columns.map((c) => ({
            label: c.title,
            key: c.key,
          }))}
          filename="table.data.csv"
        >
          Generate FAS Excel Reports in one tab
        </CSVLink>
      </Box>
      <CustomTable
        tableProps={finalTableList}
        dispatch={dispatchReports}
        handleOrder={handleOrder}
        expandMore={expandMore}
        handleExpandClick={handleExpandClick}
        handleExpandClose={handleExpandClose}
        filterListData={filterListData}
        handleChange={handleChange}
        checked={checked}
      />
      <Box className="button_group mt-20">
        <Box className="input_box">
          <Typography>Starting Page</Typography>
          <CustomTextBox name="model" value="1" />
        </Box>
        <CSVLink
          data={kaPropsUtils.getData(finalTableList)}
          headers={finalTableList.columns.map((c) => ({
            label: c.title,
            key: c.key,
          }))}
          filename="table.data.csv"
        >
          Generate FAS Excel Reports
        </CSVLink>
        <CustomButton
          title="Generate PDF"
          variant="contained"
          className="btn_theme"
          onClick={handlePdf}
        />
        <CSVLink
          data={kaPropsUtils.getData(finalTableList)}
          headers={finalTableList.columns.map((c) => ({
            label: c.title,
            key: c.key,
          }))}
          filename="table.data.csv"
        >
          Generate Excel Reports
        </CSVLink>
        <CustomButton
          title="Generate Review Report PDF"
          variant="contained"
          className="btn_theme"
        />
      </Box>
      <AreaOrderingDialog
        openOrder={openOrder}
        handleOrder={handleOrder}
        areaList={filterListData}
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
