import React, {useState} from 'react'
import {Grid, IconButton, Popover} from '@mui/material'
import {Close} from '@mui/icons-material'
import ResearchForm from '../ResearchForm'
import ResearchColumns from '../ResearchColumns'
import MyDiv from './researchModify.style'

const displyColumns = [
  {
    id: '1',
    label: 'Make',
  },
  {
    id: '2',
    label: 'Model',
  },
  {
    id: '3',
    label: 'Capacity',
  },
  {
    id: '4',
    label: 'Asset Type',
  },
  {
    id: '5',
    label: 'Year',
  },
  {
    id: '6',
    label: 'Company',
  },
  {
    id: '7',
    label: 'Client',
  },
  {
    id: '8',
    label: 'Appraiser',
  },
  {
    id: '9',
    label: 'Date Appraiser',
  },
  {
    id: '10',
    label: 'Cost',
  },
]

const values = [
  {
    id: '11',
    label: 'FLV',
  },
  {
    id: '12',
    label: 'OLV',
  },
  {
    id: '13',
    label: 'OLVIP',
  },
  {
    id: '14',
    label: 'FMV',
  },
  {
    id: '15',
    label: 'FMVIP',
  },
  {
    id: '16',
    label: 'FAS',
  },
  {
    id: '17',
    label: 'RCN',
  },
]

export default function ResearchModify(props) {
  const [checked, setChecked] = useState([])

  const handleShowData = () => {
    props.handleClose()
  }

  const handleChange = (event) => {
    let updatedCheck = [...checked]
    let obj = {
      id: event?.target?.id,
      value: event?.target?.value,
    }
    if (event?.target?.checked) {
      updatedCheck = [...checked, obj]
    } else {
      updatedCheck.splice(checked.indexOf(event?.target.id), 1)
    }
    setChecked(updatedCheck)
  }

  return (
    <Popover
      open={props.openModify}
      anchorEl={props.openModify}
      onClose={props.handleClose}
      PaperProps={{
        elevation: 0,
        sx: {
          'overflow': 'visible',
          'filter': 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
          'mt': 1.5,
          '& .MuiAvatar-root': {
            width: 32,
            height: 32,
            ml: -0.5,
            mr: 1,
          },
          '&:before': {
            content: '""',
            display: 'block',
            position: 'absolute',
            top: 0,
            left: 15,
            width: 10,
            height: 10,
            bgcolor: 'background.paper',
            transform: 'translateY(-50%) rotate(45deg)',
            zIndex: 0,
          },
        },
      }}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
    >
      <MyDiv>
        <Grid container columnSpacing={{sm: 4, md: 4}} className="container_modify" >
          <Grid item md={8}>
            <ResearchForm handleShow={handleShowData} />
          </Grid>
          <Grid item md={4}>
            <ResearchColumns
              handleChange={handleChange}
              displyColumns={displyColumns}
              values={values}
              checked={checked}
              setChecked={setChecked}
            />
          </Grid>
          <IconButton
            className="close"
            onClick={props.handleClose}
          >
            <Close />
          </IconButton>
        </Grid>
      </MyDiv>
    </Popover>
  )
}
