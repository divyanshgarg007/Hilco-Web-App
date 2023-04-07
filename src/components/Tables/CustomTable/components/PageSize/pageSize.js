import React from 'react'
import {updatePageSize} from 'ka-table/actionCreators'
import MyDiv from './pageSize.style'

export default function PageSize({pageSize, pageSizes, dispatch}) {
  return (
    <MyDiv>
      Items Per Page:
      <select
        className="select_box"
        value={pageSize}
        onChange={(event) => {
          dispatch(updatePageSize(Number(event.currentTarget.value)))
        }}
      >
        {pageSizes?.map((value) => (
          <option key={value} value={value}>
            {value}
          </option>
        ))}
      </select>
    </MyDiv>
  )
}
