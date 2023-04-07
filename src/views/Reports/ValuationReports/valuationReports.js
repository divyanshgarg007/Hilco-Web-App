import React, {useState, useEffect} from 'react'
import {Box, Typography} from '@mui/material'
import {kaReducer} from 'ka-table'
import {DataType} from 'ka-table/enums'
import {kaPropsUtils} from 'ka-table/utils'
import {CSVLink} from 'react-csv'
import {useDispatch, useSelector} from 'react-redux'
import {getAppraiserTrueAction} from '../../../redux/admin/AdminActions'
import {CustomTable, Loader} from '../../../components'
import {getReportsListAction} from '../../../redux/reports/ReportActions'
import MyDiv from './valuationReports.style'

export default function ValuationReports() {

  const dispatch = useDispatch()
  const [reportsData, setReportsData] = useState([])

  const tablePropsInit = {
    columns: [
      {
        key: 'selection-cell',
        style: {width: '3.5%'},
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
    ],
    data: reportsData,
    rowKeyField: 'location_id',
    paging: {
      enabled: true,
      pageIndex: 0,
      pageSize: 50,
      pageSizes: [50, 100, 150, 200, 250],
    },
  }

  const [valuationReports, setValuationReports] = useState(tablePropsInit)

  const adminState = useSelector((state) => state.report)

  useEffect(() => {
    dispatch(getAppraiserTrueAction())
    dispatch(getReportsListAction())
  }, [dispatch])

  useEffect(() => {
    setReportsData(adminState?.reportsList?.reportsList)
  }, [adminState?.reportsList?.reportsList])

  useEffect(() => {
    setValuationReports(tablePropsInit)
  }, [reportsData])

  const dispatchReports = (action) => {
    setValuationReports((prevState) => kaReducer(prevState, action))
  }

  return (
    <MyDiv>
      {(adminState?.reportsList?.loading) &&
      <div>
        <Loader />
      </div>
      }
      <Box className="page_heading">
        <Typography>VALUATION BY CLASS/CONDITION</Typography>
      </Box>
      <Box className="excel_download">
        <CSVLink
          data={kaPropsUtils.getData(valuationReports)}
          headers={valuationReports.columns.map((c) => ({
            label: c.title,
            key: c.key,
          }))}
          filename="table.data.csv"
        >
          Generate Excel Report
        </CSVLink>
      </Box>
      <CustomTable tableProps={valuationReports} dispatch={dispatchReports} />
    </MyDiv>
  )
}
