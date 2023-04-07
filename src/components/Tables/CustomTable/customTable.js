import React from 'react'
import {Table} from 'ka-table'
import {kaPropsUtils} from 'ka-table/utils'
import {
  Flag as FlagIcon,
  ContentCopy as ContentCopyIcon,
  FormatListBulleted as FormatListBulletedIcon,
  ExpandMore as ExpandMoreIcon,
} from '@mui/icons-material'
import {IconButton} from '@mui/material'
import {
  ColumnSettings,
  DeleteCell,
  EditCell,
  ExpandCell,
  PageSize,
  SelectionCell,
  SelectionHeader,
  ToggleSwitch,
} from './components'
import MyDiv from './customTable.style'

const CustomTable = ({
  tableProps,
  dispatch,
  columnSetting,
  handleSidebar,
  handlePopup,
  handleEdit,
  handleDelete,
  handleCheck,
  checkedId,
  handleOrder,
  handleExpandClose,
  handleExpandClick,
  expandMore,
  filterListData,
  handleChange,
  checked,
}) => {
  return (
    <MyDiv>
      <ColumnSettings
        tableProps={tableProps}
        dispatch={dispatch}
        columnSetting={columnSetting}
        handleSidebar={handleSidebar}
      />
      <Table
        {...tableProps}
        dispatch={dispatch}
        childComponents={{
          pagingSizes: {
            content: (props) => <PageSize {...props} />,
          },
          pagingIndex: {
            elementAttributes: ({isActive}) => ({
              className: `page-item ${isActive ? 'active' : ''}`,
            }),
          },
          pagingPages: {
            elementAttributes: () => ({
              className: 'pagination',
            }),
          },
          table: {
            elementAttributes: () => ({
              id: 'table-to-xls',
            }),
          },
          cellText: {
            content: (props) => {
              if (props.column.key === 'selection-cell') {
                return <SelectionCell {...props} />
              } else if (props.column.key === 'action-cell') {
                return (
                  <>
                    <EditCell className="icon_btn edit" onClick={handleEdit} {...props} />
                    <DeleteCell className="icon_btn delete" onClick={handleDelete} {...props} />
                  </>
                )
              } else if (props.column.key === 'status-cell') {
                return <ToggleSwitch />
              } else if (
                props.column.key === 'flag' &&
                checkedId?.includes(props.rowKeyValue)
              ) {
                return (
                  <IconButton
                    id={props.rowKeyValue}
                    className="icon_btn_flag delete"
                    onClick={handleCheck(props.rowKeyValue)}
                  >
                    <FlagIcon />
                  </IconButton>
                )
              } else if (props.column.key === 'flag' &&
              !checkedId?.includes(props.rowKeyValue)) {
                return (
                  <IconButton
                    id={props.rowKeyValue}
                    className="icon_btn_flag delete"
                    onClick={handleCheck(props.rowKeyValue)}
                  />
                )
              } else if (props.column.key === 'area-ordering-cell') {
                return (
                  <IconButton className="cell_btn" onClick={() => handleOrder(props.rowKeyValue)}>
                    <ContentCopyIcon />
                  </IconButton>
                )
              } else if (props.column.key === 'location-asset-cell') {
                return (
                  <IconButton className="cell_btn">
                    <FormatListBulletedIcon />
                  </IconButton>
                )
              } else if (props.column.key === 'expand-cell') {
                return (
                  <>
                    <IconButton className="cell_btn" onClick={(e) => handleExpandClick(e, props.rowKeyValue)}><ExpandMoreIcon /></IconButton>
                    <ExpandCell expandMore={expandMore} handleExpandClose={handleExpandClose}
                      filterListData={filterListData} checked={checked} handleChange={handleChange}
                    />
                  </>
                )
              }
            },
            // elementAttributes: (props) => ({
            //   onClick: () => {
            //     if (props.column.key === "flag") {
            //       console.log(props.column.key, 'flag')
            //       return handleCheck(props.rowKeyValue);
            //     }
            //   },
            // }),
          },
          filterRowCell: {
            content: (props) => {
              if (
                props.column.key === 'selection-cell' ||
                props.column.key === 'action-cell' ||
                props.column.key === 'assetType'
              ) {
                return <></>
              }
            },
          },
          headCell: {
            content: (props) => {
              if (props.column.key === 'selection-cell') {
                return (
                  <SelectionHeader
                    {...props}
                    areAllRowsSelected={kaPropsUtils.areAllFilteredRowsSelected(
                      tableProps
                    )}
                  />
                )
              }
              // else if (props.column.key === "action-cell") {
              //   return (
              //       <></>
              //   );
              // }
            },
          },
          cell: {
            elementAttributes: (props) => ({
              onClick: () => {
                if (
                  props.column.key === 'selection-cell' ||
                  props.column.key === 'flag'
                ) {
                  return <></>
                } else {
                  handlePopup(props?.rowData?.id)
                }
              },
            }),
          },
          cellEditor: {
            content: (props) => {
              if (props.column.key === 'selection-cell') {
                return <SelectionCell {...props} />
              }
            },
          },
          noDataRow: {
            content: () => 'No Data Found',
          },
        }}
      />
    </MyDiv>
  )
}

export default CustomTable
