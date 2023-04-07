import React from 'react'
import {Drawer, IconButton} from '@mui/material'
import {Table} from 'ka-table'
import {hideColumn, showColumn} from 'ka-table/actionCreators'
import CellEditorBoolean from 'ka-table/Components/CellEditorBoolean/CellEditorBoolean'
import {ActionType, DataType, EditingMode} from 'ka-table/enums'
import styled from 'styled-components'
import {Close} from '@mui/icons-material'
import MyDiv from './columnSettings.style'

const CustomDrawer = styled(Drawer)(({theme, open}) => ({
  '& .MuiDrawer-paperAnchorRight': {
    width: '25%',
  },
}))

const ColumnSettings = ({
  tableProps,
  dispatch,
  columnSetting,
  handleSidebar,
}) => {
  const columnsSettingsProps = {
    data: tableProps?.columns?.map((item) => ({
      ...item,
      visible: item.visible !== false,
    })),
    rowKeyField: 'key',
    columns: [
      {
        key: 'title',
        isEditable: false,
        title: 'Field',
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
    if (action.type === ActionType.UpdateCellValue) {
      dispatch(
        action.value
          ? showColumn(action.rowKeyValue)
          : hideColumn(action.rowKeyValue)
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
            cell: {
              content: (props) => {
                if (props?.column?.key === 'visible') {
                  return <CellEditorBoolean {...props} />
                }
              },
            },
            dataRow: {
              content: (props) => {
                if (props?.rowData?.key === 'selection-cell') {
                  return <></>
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
export default ColumnSettings
