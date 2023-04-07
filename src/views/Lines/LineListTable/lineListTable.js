import React, {useState, useEffect} from 'react'
import {Box, IconButton, Typography} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import {kaReducer} from 'ka-table'
import {
  DataType,
  SortingMode,
  FilteringMode,
} from 'ka-table/enums'
import {useDispatch, useSelector} from 'react-redux'
import {getAppraiserTrueAction} from '../../../redux/admin/AdminActions'
import {CustomTable, Loader} from '../../../components'
import {getLinesListAction} from '../../../redux/lines/LineActions'
import MyDiv from './lineListTable.style'

export default function LineListTable() {

  const dispatch = useDispatch()
  const [columnSetting, setColumnSetting] = useState(false)
  const [linesData, setLinesData] = useState([])

  const tablePropsInit = {
    columns: [
      {
        dataType: DataType.Number,
        key: 'asset_id',
        style: {width: 120},
        title: 'Asset Id',
      },
      {
        dataType: DataType.String,
        key: 'make',
        style: {width: 120},
        title: 'Make',
      },
      {
        dataType: DataType.String,
        key: 'line_name',
        style: {width: 120},
        title: 'Line Name',
      },
      {
        dataType: DataType.String,
        key: 'asset_type',
        style: {width: 120},
        title: 'Asset Type',
      },
      {
        dataType: DataType.String,
        key: 'line_unique_name',
        style: {width: 120},
        isSortable: false,
        title: 'Unique Name',
      },
      {
        dataType: DataType.String,
        key: 'year',
        style: {width: 120},
        isSortable: false,
        title: 'Year',
      },
      {
        dataType: DataType.String,
        key: 'asset_no',
        style: {width: 120},
        isSortable: false,
        title: 'Asset#',
      },
    ],
    data: linesData,
    rowKeyField: 'asset_id',
    sortingMode: SortingMode.Single,
    paging: {
      enabled: true,
      pageIndex: 0,
      pageSize: 50,
      pageSizes: [50, 100, 150, 200, 250],
    },
    filteringMode: FilteringMode.FilterRow,
  }
  const [linesTableData, setLinesTableData] = useState(tablePropsInit)

  const adminState = useSelector((state) => state.line)

  useEffect(() => {
    dispatch(getAppraiserTrueAction())
    dispatch(getLinesListAction())
  }, [dispatch])

  useEffect(() => {
    setLinesData(adminState?.linesList?.linesList)
  }, [adminState?.linesList?.linesList])

  useEffect(() => {
    setLinesTableData(tablePropsInit)
  }, [linesData])

  const dispatchResearch = (action) => {
    setLinesTableData((prevState) => kaReducer(prevState, action))
  }

  const handleSidebar = () => {
    setColumnSetting(!columnSetting)
  }

  return (
    <MyDiv>
      {(adminState?.linesList?.loading) &&
      <div>
        <Loader />
      </div>
      }
      <Box className="page_heading">
        <Typography>Line List</Typography>
      </Box>
      <IconButton onClick={handleSidebar} className="column_setting">
        <MenuIcon />
      </IconButton>
      <CustomTable
        tableProps={linesTableData}
        dispatch={dispatchResearch}
        columnSetting={columnSetting}
        handleSidebar={handleSidebar}
      />
    </MyDiv>
  )
}
