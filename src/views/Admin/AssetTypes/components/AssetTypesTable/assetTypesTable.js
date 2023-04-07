import React, {useState, useEffect} from 'react'
import 'jspdf-autotable'
import {kaReducer} from 'ka-table'
import {
  DataType,
  SortingMode,
  EditingMode,
} from 'ka-table/enums'
import {CustomTable} from '../../../../../components'
import MyDiv from './assetTypesTable.style'

export default function AssetTypesTable(props) {

  const tablePropsInit = {
    columns: [
      {
        key: 'selection-cell',
        style: {width: '3.5%'},
      },
      {
        dataType: DataType.String,
        key: 'type',
        style: {width: 120},
        title: 'Singular Type',
      },
      {
        dataType: DataType.String,
        key: 'type_plural',
        style: {width: 120},
        title: 'Plural Type',
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
    data: props.assetTypesList,
    rowKeyField: 'asset_type_id',
    sortingMode: SortingMode.Single,
    editingMode: EditingMode.Cell,
    paging: {
      enabled: true,
      pageIndex: 0,
      pageSize: 10,
      pageSizes: [10, 20, 30, 40, 50],
    },
  }

  const [assetTypesTable, setAssetTypesTable] = useState(tablePropsInit)

  useEffect(() => {
    setAssetTypesTable(tablePropsInit)
  }, [props.assetTypesList])

  const dispatchResearch = (action) => {
    setAssetTypesTable((prevState) => kaReducer(prevState, action))
  }
  return (
    <MyDiv>
      <CustomTable
        tableProps={assetTypesTable}
        dispatch={dispatchResearch}
      />
    </MyDiv>
  )
}
