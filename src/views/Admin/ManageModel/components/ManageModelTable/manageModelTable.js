import React, {useState, useEffect} from 'react'
import 'jspdf-autotable'
import {kaReducer} from 'ka-table'
import {
  DataType,
  SortingMode,
  EditingMode,
} from 'ka-table/enums'
import {CustomTable} from '../../../../../components'
import MyDiv from './manageModelTable.style'

export default function ManageModelTable(props) {

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
    ],
    data: props.filteredModelList,
    rowKeyField: 'model_label_id',
    sortingMode: SortingMode.Single,
    editingMode: EditingMode.Cell,
    paging: {
      enabled: true,
      pageIndex: 0,
      pageSize: 10,
      pageSizes: [10, 20, 30, 40, 50],
    },
  }

  const [modelTableList, setModelTableList] = useState(tablePropsInit)

  useEffect(() => {
    setModelTableList(tablePropsInit)
  }, [props.filteredModelList])

  const dispatchResearch = (action) => {
    setModelTableList((prevState) => kaReducer(prevState, action))
  }

  return (
    <MyDiv>
      <CustomTable
        tableProps={modelTableList}
        dispatch={dispatchResearch}
      />
    </MyDiv>
  )
}
