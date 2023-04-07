import React from 'react'
import {Edit} from '@mui/icons-material'
import {IconButton} from '@mui/material'

export default function EditCell({className, onClick, rowKeyValue}) {

  return (
    <IconButton className={className} onClick={onClick(rowKeyValue)}>
      <Edit />
    </IconButton>
  )
}
