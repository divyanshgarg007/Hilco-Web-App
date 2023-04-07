/* eslint-disable */
import React, {useState, useEffect} from 'react'

import {kaReducer, Table} from 'ka-table'
import {SortingMode, EditingMode} from 'ka-table/enums'
// import { DispatchFunc } from 'ka-table/types';
import FlagSharpIcon from '@mui/icons-material/FlagSharp'
import {Check as CheckIcon} from '@mui/icons-material'
import {fetchAssetList, fetchAssetDetails} from '../../services/assetListService'
import {columns} from '../../utils/Table'
import {reorderReducer} from '../../reducers'
import DataGridStyled from './DataGridStyled.style'
import {ColumnToggle} from './Column'

const DataGrid = ({config, setConfig, handleSidebar, columnSetting}) => {
  const {
    dataKeys: {attributes, orders},
  } = config
  const tablePropsInit = {
    columns: orders.map((key) => {
      return {
        ...columns[key],
        visible: attributes[key].visibility,
      }
    }),
    data: [],
    editingMode: EditingMode.Cell,
    rowKeyField: 'type_id',
    rowReordering: true,
    groups: [
      {
        columnKey: 'location_id',
        key: 'location_id',
      },
      {
        columnKey: 'area',
        key: 'area_order',
      },
      {
        columnKey: 'parent_line',
      },
    ],
    sortingMode: SortingMode.Single,
    // sortingMode: SortingMode.MultipleTripleStateRemote,
    // columnResizing: true,
  }

  const [columnChooserProps, changeColumnChooserProps] = useState(tablePropsInit)
  const [rows, setRows] = useState([])
  const [lines, setLines] = useState()
  const [fetchRequest, setFetchRequest] = useState(false)
  const [fetchAssetDetailsRequest, setFetchAssetDetailsRequest] = useState(false)
  const [valueCode, setValueCode] = useState([])
  const [assetDetails, setAssetDetails] = useState()

  const dispatch = (action) => {
    changeColumnChooserProps((prevState) => {
      switch (action.type) {
        case 'ReorderRows':
          return reorderReducer(prevState, action)
        default:
          // console.log(kaReducer(prevState, action))
          return kaReducer(prevState, action)
      }
    })
  }
  const generateCell = (key, content, args, index) => {
    const cellSkeleton = (content, args) => {
      return (
        <td key={index} className="ka-group-cell" {...args}>
          <div className="ka-group-cell-content">
            <div className="ka-group-text">{content}</div>
          </div>
        </td>
      )
    }
    switch (key) {
      case 'quantity':
        return cellSkeleton('Mill', args)
      default:
        return cellSkeleton(content, args)
    }
  }

  const DataRowLine = (props) => {
    if (props.groupKey[props.groupIndex] !== '0') {
      const currentLine = props.groupKey[props.groupIndex]

      const currentLineDetail = lines[currentLine][0]
      const {value_short_name, value} = currentLineDetail
      const valueArray = value.split('#')
      const values = value_short_name.split('#').reduce((acc, val, i) => {
        acc[val] = valueArray[i] !== '' ? parseInt(valueArray[i]) : 0
        return acc
      }, {})
      // const assetValued = {...currentLineDetail, ...values};

      const lineAssets = rows.filter((row) => row.parent_line === parseInt(currentLine))
      const lineValues = lineAssets.reduce((acc, row) => {
        // console.log(typeof acc[locationPriceValue], row[locationPriceValue]);
        valueCode.forEach((locationPriceValue) => {
          if (typeof acc[locationPriceValue] !== 'undefined') {
            acc[locationPriceValue] +=
              isNaN(row[locationPriceValue]) || Number.isInteger(!row[locationPriceValue])
                ? 0
                : row[locationPriceValue]
          } else {
            acc[locationPriceValue] =
              isNaN(row[locationPriceValue]) || Number.isInteger(!row[locationPriceValue])
                ? 0
                : row[locationPriceValue]
          }
        })
        return acc
      }, {})

      const currentLineDetails = {
        ...lines[currentLine][0],
        ...lineValues,
        ...values,
      }

      // console.log(currentLineDetails, valueCode, values)
      return (
        <>
          <td className="ka-empty-cell" />
          <td className="ka-empty-cell" />
          <td className="ka-empty-cell" />
          <td className="ka-group-cell">
            <div className="ka-group-cell-content">
              <div className="ka-group-text">{currentLine}</div>
            </div>
          </td>
          {orders.map((column, index) => {
            if (attributes[column].visibility && attributes[column].model.includes('line')) {
              return generateCell(
                column,
                currentLineDetails[column] || currentLineDetails[attributes[column].secondaryKey],
                {
                  title: column,
                  ...(valueCode.includes(column) &&
                    values[column] !== '' && {style: {color: 'red'}}),
                },
                index
              )
            } else if (attributes[column].visibility && attributes[column].toggable) {
              return <td key={index} className="ka-empty-cell" />
            }
          })}
        </>
      )
    } else {
      return null
    }
  }

  useEffect(() => {
    if (!fetchRequest) {
      // setRows(columnChooserProps.data);
      fetchAssetList().then((res) => {
        const {line, asset} = res
        asset.sort((a, b) => {
          return (
            a.location_id - b.location_id ||
            a.area_order - b.area_order ||
            a.asset_area_order - b.asset_area_order
          )
        })
        const refAssets = asset?.map((asset, index) => {
          const {value_short_name, value} = asset
          const valueArray = value.split('#')
          const values = value_short_name.split('#').reduce((acc, val, i) => {
            acc[val] = valueArray[i] !== '' ? parseInt(valueArray[i]) : 0
            return acc
          }, {})
          const assetValued = {...asset, ...values}
          if (asset.parent_line <= 0) {
            return {
              ...assetValued,
              ref: index + 1,
            }
          } else {
            return assetValued
          }
        })
        // console.log(refAssets)
        setRows(refAssets)
        setLines(line)
        changeColumnChooserProps({
          ...columnChooserProps,
          data: refAssets,
        })
        // console.log(res);
        setFetchRequest(true)
      })
    }
  }, [columnChooserProps, fetchRequest])

  React.useEffect(() => {
    if (!fetchAssetDetailsRequest) {
      fetchAssetDetails().then((res) => {
        // console.log(res)
        setAssetDetails(res)
        const valueCodeRes = res.locationPriceValues.reduce(
          (acc, curr) => [...acc, curr.value_short_name],
          []
        )
        setValueCode(valueCodeRes)
        setFetchAssetDetailsRequest(true)
      })
    }
  }, [fetchAssetDetailsRequest])

  // Child Components
  const childComponents = {
    cell: {
      elementAttributes: (props) => ({
        onDrop: (e, extendedEvent) => {
          // console.log("onDrop", e, extendedEvent);
          e.target.classList.add('drop-handle')
          extendedEvent.dispatch('rowDroped', {extendedEvent})
        },
      }),
    },
    dataRow: {
      elementAttributes: (props) => ({
        className: `row-style ${props.rowData?.className} ${
          props.rowData?.parent_line > 0 ? 'group-line-child-row' : ''
        }`,
      }),
    },
    cellText: {
      content: (props) => {
        switch (true) {
          case props.column.key === 'flagged':
            return props.value ? <FlagSharpIcon fontSize="small" color="error" /> : ' '
          case props.column.key === 'is_not_found':
            return props.value ? <CheckIcon fontSize="small" color="success" /> : ' '
          case valueCode.includes(props.column.key):
            return props.value !== '0' ? props.value : ' '
          default:
            return null
        }
      },
    },
    groupRow: {
      elementAttributes: (props) => ({
        className: `group-row-${props.column.key}`,
        hidden:
          !!(props.column.key === 'parent_line' && props.groupKey[props.groupIndex] <= '0'),
        onClick: (e) => {
          // console.log(e, props, props.groupKey[props.groupIndex]);
        },
      }),
      childComponents: {
        dataRow: {
          elementAttributes: (props) => ({
            className: 'group-line-child-row',
          }),
        },
      },
      contentColSpan: 1,
      content: (props) => {
        // console.log(props)
        switch (props.column.key) {
          case 'parent_line':
            return DataRowLine(props)
          default:
            return null
        }
      },
    },
    groupCell: {
      content: (props) => {
        // console.log(props)
        switch (props.column.key) {
          case 'area':
            return props.groupKey[props.groupIndex]
          default:
            return null
        }
      },
    },
  }
  return (
    <DataGridStyled className="rows-reordering-demo">
      <ColumnToggle tableProps={columnChooserProps} dispatch={dispatch} columnSetting={columnSetting} handleSidebar={handleSidebar} />
      <Table {...columnChooserProps} childComponents={childComponents} dispatch={dispatch} />
    </DataGridStyled>
  )
}

export default DataGrid
