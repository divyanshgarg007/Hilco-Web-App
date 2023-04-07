/* eslint-disable */
import React, {useEffect, useState} from 'react'
import 'jspdf-autotable'
import {kaReducer} from 'ka-table'
import {
  DataType,
  SortingMode,
  EditingMode,
} from 'ka-table/enums'
import {CustomTable} from '../../../../../components'
import MyDiv from './manageTable.style'

export default function ManageTable(props) {

  const tablePropsInit = {
    columns: [
      {
        key: 'selection-cell',
        style: {width: '3.5%'},
      },
      {
        dataType: DataType.String,
        key: 'area',
        style: {width: 240},
        title: 'Area',
      },
    ],
    data: props.areaList,
    rowKeyField: 'area',
    sortingMode: SortingMode.Single,
    editingMode: EditingMode.Cell,
    paging: {
      enabled: true,
      pageIndex: 0,
      pageSize: 10,
      pageSizes: [10, 20, 30, 40, 50],
    },
  }

  const [manageArea, setManageArea] = useState(tablePropsInit)

  useEffect(() => {
    setManageArea(tablePropsInit)
  }, [props.areaList])

  const dispatchResearch = (action) => {
    setManageArea((prevState) => kaReducer(prevState, action))
  }

  return (
    <MyDiv>
      <CustomTable
        tableProps={manageArea}
        dispatch={dispatchResearch}
      />
    </MyDiv>
  )
}
