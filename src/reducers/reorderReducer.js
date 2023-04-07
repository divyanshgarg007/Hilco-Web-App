const reorderReducer = (state = {}, action) => {
  const targetRow = state.data.filter((row) => row.type_id === action.targetRowKeyValue)
  const dragedRow = state.data.filter((row) => row.type_id === action.rowKeyValue)
  // console.log("targetRow", targetRow);
  const updatedRows = state.data.map((row) => {
    // Remove ClassName of previous row
    if (row.className === 'droped-row') {
      return {
        ...row,
        className: '',
      }
    }
    // ####### If area is the same #######

    if (targetRow[0].area === dragedRow[0].area) {
      if (row.type_id === action.rowKeyValue) {
        return {
          ...row,
          area: targetRow[0].area,
          area_order: targetRow[0].area_order,
          area_asset_order: targetRow[0].area_asset_order,
          parent_line: targetRow[0].parent_line,
          ...(row.parent_line === 0 && {ref: targetRow[0].ref}),
          className: 'droped-row',
        }
      } else if (
        row.area === targetRow[0].area &&
        row.location_id === targetRow[0].location_id &&
        row.type_id !== action.rowKeyValue &&
        row.area_asset_order >= targetRow[0].area_asset_order &&
        row.area_asset_order <= dragedRow[0].area_asset_order
      ) {
        return {
          ...row,
          area_asset_order: row.area_asset_order + 1,
          ...(row.parent_line === 0 && {ref: row.ref + 1}),
        }
      }
    } else if (targetRow[0].area !== dragedRow[0].area) {
      // #######  If area is different #######

      if (row.type_id === action.rowKeyValue) {
        return {
          ...row,
          area: targetRow[0].area,
          area_order: targetRow[0].area_order,
          area_asset_order: targetRow[0].area_asset_order,
          parent_line: targetRow[0].parent_line,
          ...(row.parent_line === 0 && {ref: targetRow[0].ref}),
          className: 'droped-row',
        }
      } else if (
        row.area === targetRow[0].area &&
        row.location_id === targetRow[0].location_id &&
        row.type_id !== action.rowKeyValue &&
        row.area_asset_order >= targetRow[0].area_asset_order
        // && row.area_asset_order <= dragedRow[0].area_asset_order
      ) {
        return {
          ...row,
          area_asset_order: row.area_asset_order + 1,
          ...(row.parent_line === 0 && {ref: row.ref + 1}),
        }
      } else if (
        row.area === dragedRow[0].area &&
        row.location_id === dragedRow[0].location_id &&
        // row.type_id !== action.rowKeyValue &&
        row.area_asset_order > dragedRow[0].area_asset_order
      ) {
        return {
          ...row,
          area_asset_order: row.area_asset_order - 1,
          ...(row.parent_line === 0 && {ref: row.ref - 1}),
        }
      }
    }

    return row
  })

  const updatedRowsSorted = updatedRows.sort((a, b) => {
    return (
      a.location_id - b.location_id ||
      a.area_order - b.area_order ||
      a.area_asset_order - b.area_asset_order ||
      a.ref - b.ref
    )
  })
  const refRefAssets = updatedRowsSorted.map((asset, index) => {
    // console.log(asset,asset.parent_line === 0)
    if (asset.parent_line === 0) {
      return {
        ...asset,
        ref: index + 1,
        // ...values,
      }
    } else {
      return {
        ...asset,
      }
    }
  })
  console.log('Test: ', state, updatedRows, updatedRowsSorted)
  // state.data = updatedRowsSorted;
  // console.log(state);
  return {
    ...state,
    data: [...refRefAssets],
  }
}

export default reorderReducer
