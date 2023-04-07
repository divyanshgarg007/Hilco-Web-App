/* eslint-disable no-undef */
import * as React from 'react'
import {Drawer, IconButton} from '@mui/material'
import {Table} from 'ka-table'
import {hideColumn, showColumn} from 'ka-table/actionCreators'
import CellEditorBoolean from 'ka-table/Components/CellEditorBoolean/CellEditorBoolean'
import {DataType, EditingMode, ActionType} from 'ka-table/enums'
import styled from 'styled-components'
import {Close} from '@mui/icons-material'
import MyDiv from './ColumnToggle.style'

const CustomDrawer = styled(Drawer)(({theme, open}) => ({
  '& .MuiDrawer-paperAnchorRight': {
    width: '25%',
  },
}))

export default function ColumnToggle({tableProps, dispatch, handleSidebar, columnSetting}) {
  const columnsSettingsProps = {
    data: tableProps?.columns?.map((c) => ({...c, visible: c.visible !== false})),
    rowKeyField: 'key',
    columns: [
      {
        key: 'title',
        isEditable: true,
        title: 'Title',
        dataType: DataType.String,
      },
      {
        key: 'visible',
        title: 'Visible',
        isEditable: false,
        style: {textAlign: 'center'},
        width: 80,
        dataType: DataType.Boolean,
      },
    ],
    editingMode: EditingMode.None,
  }
  const dispatchSettings = (action) => {
    console.log(action)
    if (action.type === ActionType.UpdateCellValue) {
      dispatch(
        action.value ? showColumn(action.rowKeyValue) : hideColumn(action.rowKeyValue)
      )
    }
  }

  return (
    <CustomDrawer anchor="right" open={columnSetting} onClose={handleSidebar}>
      <MyDiv>
        <IconButton onClick={handleSidebar} className="close_drawer">
          <Close />
        </IconButton>
        <Table
          {...columnsSettingsProps}
          childComponents={{
            rootDiv: {
              elementAttributes: () => ({style: {width: 400, marginBottom: 20}}),
            },
            cell: {
              content: (props) => {
                switch (props.column.key) {
                  case 'visible':
                    return <CellEditorBoolean {...props} />
                  default:
                    return null
                }
              },
            },
          }}
          dispatch={dispatchSettings}
        />
      </MyDiv>
    </CustomDrawer>
  )
}
