import React, {useState, useEffect} from 'react'
import 'jspdf-autotable'
import {kaReducer} from 'ka-table'
import {
  DataType,
  SortingMode,
  EditingMode,
} from 'ka-table/enums'
import {CustomTable} from '../../../../../components'
import MyDiv from './serialLabelsTable.style'

export default function SerialLabelsTable(props) {

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
        title: 'Name',
      },
      {
        dataType: DataType.String,
        key: 'created_on',
        style: {width: 120},
        title: 'Created On',
        isEditable: false,
      },
      // {
      //   key: 'action-cell',
      //   style: {width: '30px'},
      //   isSortable: false,
      //   title: 'Actions',
      //   isEditable: false,
      // },
    ],
    data: props.serialLabelList,
    rowKeyField: 'serial_label_id',
    sortingMode: SortingMode.Single,
    editingMode: EditingMode.Cell,
    paging: {
      enabled: true,
      pageIndex: 0,
      pageSize: 10,
      pageSizes: [10, 20, 30, 40, 50],
    },
  }

  const [serialLabelTable, setSerialLabelTable] = useState(tablePropsInit)

  useEffect(() => {
    setSerialLabelTable(tablePropsInit)
  }, [props.serialLabelList])

  const dispatchResearch = (action) => {
    setSerialLabelTable((prevState) => kaReducer(prevState, action))
  }

  return (
    <MyDiv>
      <CustomTable
        tableProps={serialLabelTable}
        dispatch={dispatchResearch}
      />
    </MyDiv>
  )
}
