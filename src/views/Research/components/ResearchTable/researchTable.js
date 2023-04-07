/* eslint-disable new-cap */
import React, {useEffect, useState} from 'react'
import {Box, IconButton, Typography} from '@mui/material'
import jsPDF from 'jspdf'
import 'jspdf-autotable'
import {CSVLink} from 'react-csv'
import MenuIcon from '@mui/icons-material/Menu'
import {kaReducer} from 'ka-table'
import {
  DataType,
  SortDirection,
  SortingMode,
  FilteringMode,
} from 'ka-table/enums'
import {getValueByColumn} from 'ka-table/Utils/DataUtils'
import {kaPropsUtils} from 'ka-table/utils'
// import ResearchModify from '../ResearchModify'
import {CustomButton, CustomTable} from '../../../../components'
import ResearchDialog from '../ResearchDialog'
import MyDiv from './researchTable.style'

export default function ResearchTable(props) {

  const tablePropsInit = {
    columns: [
      {
        key: 'selection-cell',
        style: {width: '30px'},
      },
      {
        dataType: DataType.Number,
        key: 'quantity',
        style: {width: 120},
        title: 'Quantity',
      },
      {
        dataType: DataType.String,
        key: 'make',
        sortDirection: SortDirection.Ascend,
        style: {width: 120},
        title: 'Make',
      },
      {
        dataType: DataType.String,
        key: 'model',
        style: {width: 120},
        title: 'Model',
      },
      {
        dataType: DataType.String,
        key: 'capacity',
        style: {width: 120},
        title: 'Capacity',
      },
      {
        dataType: DataType.String,
        key: 'asset_type',
        style: {width: 120},
        title: 'Asset Type',
      },
      {
        dataType: DataType.Number,
        key: 'year',
        style: {width: 120},
        title: 'Year',
      },
      {
        dataType: DataType.String,
        key: 'comment',
        style: {width: 80},
        isSortable: false,
        title: 'FLV',
      },
      {
        dataType: DataType.String,
        key: 'xyz',
        style: {width: 80},
        isSortable: false,
        title: 'OLV',
      },
    ],
    data: props?.searchedData?.assets,
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

  const [researchTable, setResearchTable] = useState(tablePropsInit)
  // const [openModify, setOpenModify] = useState(false)
  const [columnSetting, setColumnSetting] = useState(false)
  const [showDataPopup, setShowDataPopup] = useState(false)
  const [currentRow, setCurrentRow] = useState(null)
  const [currentRowData, setCurrentRowData] = useState(null)

  useEffect(() => {
    setResearchTable(tablePropsInit)
  }, [props?.searchedData])

  useEffect(() => {
    // if(currentRow <= dataArray.length){
    setCurrentRowData(props?.searchedData?.assets?.find((elem) => elem.id === currentRow))
    // }
  }, [currentRow])

  const handleSidebar = () => {
    setColumnSetting(!columnSetting)
  }

  const dispatchResearch = (action) => {
    setResearchTable((prevState) => kaReducer(prevState, action))
  }

  // const handleClick = (e) => {
  //   setOpenModify(e.currentTarget)
  // }

  // const handleClose = () => {
  //   setOpenModify(false)
  // }

  const handlePopup = (id) => {
    setCurrentRow(id)
    setShowDataPopup(!showDataPopup)
  }

  const handleNext = () => {
    setCurrentRow(currentRow + 1)
  }

  const handlePrevious = () => {
    setCurrentRow(currentRow - 1)
  }

  const exportClick = (orientation) => {
    const doc = new jsPDF(orientation)
    const head = [researchTable.columns.map((c) => c.title)]
    const body = researchTable.data.map((d) =>
      researchTable.columns.map((c) => getValueByColumn(d, c))
    )
    doc.autoTable({
      margin: 1,
      headStyles: {fillColor: '#F1F5F7', textColor: '#747D86'},
      alternateRowStyles: {fillColor: '#F9FBFC'},
      head,
      body,
    })
    doc.save('table.pdf')
  }

  return (
    <MyDiv>
      <Box className="count_box">
        <Typography variant="h5">Research</Typography>
        <Typography>Total Items: {props?.searchedData?.totalRecord}</Typography>
      </Box>
      <Box className="button_group">
        <CustomButton
          title="Modify Search"
          variant="contained"
          className="btn_theme"
          onClick={props.handleShow}
        />
        <CustomButton
          title="Export All Data to PDF"
          variant="contained"
          className="btn_theme"
          onClick={exportClick}
        />
        <CSVLink
          data={kaPropsUtils.getData(researchTable)}
          headers={researchTable.columns.map((c) => ({
            label: c.title,
            key: c.key,
          }))}
          filename="table.data.csv"
        >
          Export All Data to Excel
        </CSVLink>
        {/* <CustomButton
          title="Back"
          variant="contained"
          className="btn_theme"
          onClick={props.handleShow}
        /> */}
      </Box>
      <IconButton onClick={handleSidebar} className="column_setting">
        <MenuIcon />
      </IconButton>
      <CustomTable
        tableProps={researchTable}
        dispatch={dispatchResearch}
        columnSetting={columnSetting}
        handleSidebar={handleSidebar}
        handlePopup={handlePopup}
        showDataPopup={showDataPopup}
      />
      {/* <ResearchModify
        openModify={openModify}
        handleClick={handleClick}
        handleClose={handleClose}
      /> */}
      <ResearchDialog
        modalData={currentRowData}
        handlePopup={handlePopup}
        showDataPopup={showDataPopup}
        handleNext={handleNext}
        handlePrevious={handlePrevious}
      />
    </MyDiv>
  )
}
