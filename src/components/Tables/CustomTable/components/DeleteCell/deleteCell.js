import React from 'react'
import {Delete} from '@mui/icons-material'
import {IconButton} from '@mui/material'

export default function DeleteCell({className, onClick, rowKeyValue}) {
  return (
    <IconButton className={className} onClick={onClick(rowKeyValue)}>
      <Delete />
    </IconButton>
  )
}
