import React, {useState, useEffect} from 'react'
import 'jspdf-autotable'
import {kaReducer} from 'ka-table'
import {
  DataType,
  SortDirection,
  SortingMode,
  FilteringMode,
} from 'ka-table/enums'
import {CustomTable} from '../../../../../components'
import MyDiv from './assetClassTable.style'

export default function AssetClassTable(props) {

  const tablePropsInit = {
    columns: [
      {
        dataType: DataType.String,
        key: 'name',
        style: {width: 120},
        title: 'Asset Class',
      },
      {
        dataType: DataType.String,
        key: 'code',
        sortDirection: SortDirection.Ascend,
        style: {width: 50},
        title: 'Code',
      },
      {
        dataType: DataType.Number,
        key: 'count',
        style: {width: 50},
        title: 'Associated Asset Type',
      },
      {
        key: 'action-cell',
        style: {width: '50px'},
        isSortable: false,
        title: 'Actions',
      },
    ],
    data: props.assetClassesList,
    rowKeyField: 'asset_class_id',
    sortingMode: SortingMode.Single,
    paging: {
      enabled: true,
      pageIndex: 0,
      pageSize: 10,
      pageSizes: [10, 20, 30, 40, 50],
    },
    filteringMode: FilteringMode.FilterRow,
  }

  const [assetClassesTable, setAssetClassesTable] = useState(tablePropsInit)

  useEffect(() => {
    setAssetClassesTable(tablePropsInit)
  }, [props.assetClassesList])


  const dispatchResearch = (action) => {
    setAssetClassesTable((prevState) => kaReducer(prevState, action))
  }

  return (
    <MyDiv>
      <CustomTable
        tableProps={assetClassesTable}
        dispatch={dispatchResearch}
        handleEdit={props.handleEdit}
        handleDelete={props.handleDelete}
      />
    </MyDiv>
  )
}
