import React from 'react'
import {Checkbox} from '@mui/material'
import {deselectRow, selectRow, selectRowsRange} from 'ka-table/actionCreators'
import {useDispatch} from 'react-redux'
import {adminListActions} from '../../../../../redux/admin/admin'

export default function SelectionCell(props) {

  const reduxDispatch = useDispatch()

  const {rowKeyValue, dispatch, isSelectedRow, selectedRows} = props

  const handleChange = (event) => {
    if (event.nativeEvent.shiftKey) {
      dispatch(selectRowsRange(rowKeyValue, [...selectedRows].pop()))
    } else if (event.currentTarget.checked) {
      reduxDispatch(adminListActions.setSelectedItems({id: rowKeyValue, type: 'add'}))
      dispatch(selectRow(rowKeyValue))
    } else {
      reduxDispatch(adminListActions.setSelectedItems({id: rowKeyValue, type: 'remove'}))
      dispatch(deselectRow(rowKeyValue))
    }
  }

  return (
    <Checkbox
      checked={isSelectedRow}
      onChange={(event) => {
        handleChange(event)
      }}
    />
  )
}
