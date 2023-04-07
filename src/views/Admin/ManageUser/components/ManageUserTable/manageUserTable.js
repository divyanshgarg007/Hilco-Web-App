import React, {useState, useEffect} from 'react'
import 'jspdf-autotable'
import {kaReducer} from 'ka-table'
import {
  DataType,
  SortingMode,
  EditingMode,
} from 'ka-table/enums'
import {CustomTable} from '../../../../../components'
import MyDiv from './manageUserTable.style'

export default function ManageUserTable(props) {

  const tablePropsInit = {
    columns: [
      {
        key: 'selection-cell',
        style: {width: '3.5%'},
      },
      {
        dataType: DataType.Number,
        key: 'user_id',
        style: {width: 50},
        title: 'User Id',
      },
      {
        dataType: DataType.String,
        key: 'username',
        style: {width: 120},
        title: 'Username',
      },
      {
        dataType: DataType.String,
        key: 'first_name',
        style: {width: 120},
        title: 'First Name',
      },
      {
        dataType: DataType.String,
        key: 'name',
        style: {width: 120},
        title: 'Name',
      },
      {
        dataType: DataType.String,
        key: 'status',
        style: {width: 120},
        title: 'Status',
      },
    ],
    data: props.filteredAppraiserData,
    rowKeyField: 'user_id',
    sortingMode: SortingMode.Single,
    editingMode: EditingMode.Cell,
    paging: {
      enabled: true,
      pageIndex: 0,
      pageSize: 10,
      pageSizes: [10, 20, 30, 40, 50],
    },
  }

  const [userListTable, setUserListTable] = useState(tablePropsInit)

  useEffect(() => {
    setUserListTable(tablePropsInit)
  }, [props.filteredAppraiserData])

  const dispatchResearch = (action) => {
    setUserListTable((prevState) => kaReducer(prevState, action))
  }

  return (
    <MyDiv>
      <CustomTable
        tableProps={userListTable}
        dispatch={dispatchResearch}
      />
    </MyDiv>
  )
}
