import React from 'react'
import {
  Checkbox,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material'
import TableCell, {tableCellClasses} from '@mui/material/TableCell'
import styled from 'styled-components'
import MyDiv from './findReplaceImportTable.style'

const StyledTableCell = styled(TableCell)(({theme}) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#ecebeb',
    color: '#555',
    fontSize: '14px',
    fontWeight: '600',
    textAlign: 'center',
    padding: '10px 5px',
    fontFamily: 'Poppins,sans-serif',
    border: '1px solid #cecece',
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: '14px',
    fontWeight: '500',
    color: '#555',
    textAlign: 'center',
    padding: '10px 10px',
    fontFamily: 'Poppins,sans-serif',
    borderBottom: '1px solid #cecece',
    borderRight: '1px solid #cecece',
    borderLeft: '1px solid #cecece',
  },
}))

const StyledTableRow = styled(TableRow)(({theme}) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: '#fff',
  },
  '&:nth-of-type(even)': {
    backgroundColor: '#f6f6f6',
  },
}))


export default function FindReplaceImportTable(props) {

  return (
    <MyDiv>
      <TableContainer className="custom_table">
        <Table>
          <TableHead>
            <TableRow>
              <StyledTableCell />
              <StyledTableCell>Asset</StyledTableCell>
              <StyledTableCell>Original Capacity</StyledTableCell>
              <StyledTableCell>Replace Capacity</StyledTableCell>
              <StyledTableCell>Original Description</StyledTableCell>
              <StyledTableCell>Replace Description</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props?.findReplaceList.map((item) => {
              return (
                <StyledTableRow key={item.asset_id}>
                  <StyledTableCell>
                    <Checkbox value={item?.type_id} checked={props?.isChecked[item?.type_id]} onChange={(e) => props.handleCheckBox(e)} />
                  </StyledTableCell>
                  <StyledTableCell>Asset Id #{item.asset_id}</StyledTableCell>
                  <StyledTableCell>{item.capacity}</StyledTableCell>
                  <StyledTableCell>{item.replace_capacity}</StyledTableCell>
                  <StyledTableCell>{item.description}</StyledTableCell>
                  <StyledTableCell>{item.replace_description}</StyledTableCell>
                </StyledTableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </MyDiv>
  )
}
