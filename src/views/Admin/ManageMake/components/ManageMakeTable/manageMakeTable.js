import React, {useEffect, useState} from 'react'
import 'jspdf-autotable'
import {kaReducer} from 'ka-table'
import {
  DataType,
  SortingMode,
  EditingMode,
} from 'ka-table/enums'
import {CustomTable} from '../../../../../components'
import MyDiv from './manageMakeTable.style'


export default function ManageMakeTable(props) {

  const tablePropsInit = {
    columns: [
      {
        key: 'selection-cell',
        style: {width: '3.5%'},
      },
      {
        dataType: DataType.String,
        key: 'isFlagged',
        style: {width: '5%'},
        title: 'Flag',
        isEditable: false,
      },
      {
        dataType: DataType.String,
        key: 'name',
        style: {width: 120},
        title: 'Name',
        isEditable: true,
      },
      {
        dataType: DataType.String,
        key: 'created_on',
        style: {width: 120},
        title: 'Created On',
        isEditable: false,
      },
    ],
    data: props.makeList,
    rowKeyField: 'make_id',
    sortingMode: SortingMode.Single,
    editingMode: EditingMode.Cell,
    paging: {
      enabled: true,
      pageIndex: 0,
      pageSize: 10,
      pageSizes: [10, 20, 30, 40, 50],
    },
  }
  const [makeListTable, setMakeListTable] = useState(tablePropsInit)

  useEffect(() => {
    setMakeListTable(tablePropsInit)
  }, [props?.makeList])

  const dispatchResearch = (action) => {
    setMakeListTable((prevState) => kaReducer(prevState, action))
  }

  return (
    <MyDiv>
      <CustomTable
        tableProps={makeListTable}
        dispatch={dispatchResearch}
        handleCheck={props.handleCheck}
        checkedId={props.checkedId}
      />
    </MyDiv>
  )
}
