import React from 'react'
import {Checkbox} from '@mui/material'
import {deselectAllFilteredRows, selectAllFilteredRows} from 'ka-table/actionCreators'
import {useDispatch} from 'react-redux'
import {adminListActions} from '../../../../../redux/admin/admin'
import {reportListActions} from '../../../../../redux/reports/report'

export default function SelectionHeader(props) {

  const {dispatch, areAllRowsSelected} = props

  const reduxDispatch = useDispatch()

  return (
    <Checkbox
      checked={areAllRowsSelected}
      onChange={(event) => {
        const {baseURI} = event.target
        if (event.currentTarget.checked && baseURI.includes('asset-list-reports')) {
          reduxDispatch(reportListActions.setAllItemsSelected(baseURI))
          dispatch(selectAllFilteredRows())
        } else if (event.currentTarget.checked && baseURI.includes('manage-')) { // there are a lot of different url for admin, so we are using generic manage- instead of complete url.
          reduxDispatch(adminListActions.setAllItemsSelected(baseURI))
          dispatch(selectAllFilteredRows())
        } else {
          reduxDispatch(adminListActions.clearSelectedItems())
          reduxDispatch(reportListActions.clearSelectedItems())
          dispatch(deselectAllFilteredRows())
        }
      }}
    />
  )
}
