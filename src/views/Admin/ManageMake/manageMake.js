import React, {useEffect, useState} from 'react'
import {Box, FormControl, Grid, Select, Typography, MenuItem} from '@mui/material'
import styled from 'styled-components'
import {useDispatch, useSelector} from 'react-redux'
import {AlertMessage, CustomButton, CustomTextBox, Loader} from '../../../components'
import {
  deleteMakeAction,
  getMakeListAction, postMakeListAction,
} from '../../../redux/admin/AdminActions'
import {adminListActions} from '../../../redux/admin/admin'
import {ManageMakeTable} from './components'
import MyDiv from './manageMake.style'
const selectValues = [
  {
    id: 0,
    label: 'Valid Make',
  },
  {
    id: 1,
    label: 'Flagged Make',
  },
  {
    id: 2,
    label: 'Both',
  },
]

const StyledMenuItem = styled(MenuItem)(() => ({
  '&.MuiMenuItem-root': {
    borderBottom: '1px solid #ccc',
    color: '#000000',
    fontWeight: '400',
    fontSize: '14px',
    fontFamily: 'Poppins,sans-serif',
  },
  '&.MuiMenuItem-root:first-child': {
    marginTop: '-8px',
  },
  '&.MuiMenuItem-root:last-child': {
    marginBottom: '-8px',
  },
}))

export default function ManageMake() {

  const dispatch = useDispatch()
  // const [values, setValues] = useState(1)
  const [checkedId, setCheckedId] = useState([])
  const [makeList, setMakeList] = useState()
  const [isFlaggedId, setIsFlaggedId] = useState(0)
  const [addValue, setAddValue] = useState('')
  const [filteredMakeList, setFilteredMakeList] = useState([])
  const [searchValue, setSearchValue] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState('')
  const adminState = useSelector((state) => state.admin)


  useEffect(() => {
    dispatch(getMakeListAction())
  }, [dispatch])

  useEffect(() => {
    setMakeList(adminState?.makeList?.makeList)
    setFilteredMakeList(adminState?.makeList?.makeList)
  }, [adminState?.makeList?.makeList])

  useEffect(() => {
    if (adminState?.messageData.status === 'success') {
      setMessage(adminState?.messageData?.message)
      setStatus('success')
      setAddValue('')
    }
    if (adminState?.messageData.status === 'failed') {
      setMessage(adminState?.messageData?.message)
      setStatus('warning')
    }
  }, [adminState?.messageData])

  useEffect(() => {
    if (searchValue !== '') {
      console.log(searchValue)
      const result = makeList.filter((item) => {
        return item?.name?.toLowerCase().includes(searchValue.toLowerCase())
      })
      setFilteredMakeList(result)
    }
  }, [makeList])

  const handleCheck = (id) => () => {
    let checkFlag = checkedId.find((item) => item === id)

    if (!checkFlag) {
      setCheckedId([...checkedId, id])
    } else if (checkFlag) {
      setCheckedId(checkedId?.filter((item) => item !== id))
    }
  }

  const handleSearchName = () => {
    if (searchValue !== '') {
      const result = makeList.filter((item) => {
        return item?.name?.toLowerCase().includes(searchValue.toLowerCase())
      })
      setFilteredMakeList(result)
    } else {
      setFilteredMakeList(makeList)
    }
  }

  const handleChange = (e) => {
    setSearchValue(e.target.value)
  }

  const handleChangeAdd = (e) => {
    setAddValue(e.target.value)
  }

  const handleAdd = () => {
    if (!addValue) {
      setMessage('Please Enter Make')
      setStatus('warning')
      return
    }
    let obj = {
      created_by: 173,
      modified_by: 173,
      name: addValue,
    }
    dispatch(postMakeListAction(obj))
  }

  const handleDelete = () => {
    if (adminState.selectedItems.length > 0) {
      let obj = {
        action: 'deleteList',
        make_id: adminState.selectedItems.join('^'),
      }
      dispatch(deleteMakeAction(obj))
      dispatch(adminListActions.clearSelectedItems())
    } else if (adminState.selectedItems.length === 0) {
      setMessage('Please select at least one Make Label.')
      setStatus('warning')
    }
  }

  const handleChangeMenu = (e) => {
    setIsFlaggedId(e.target.value)
    dispatch(getMakeListAction(e.target.value))
  }


  const handleSnackBarClose = () => {
    setMessage('')
    setStatus('')
    dispatch(adminListActions.clearMessageData())
  }

  const handleReset = () => {
    setSearchValue('')
    setIsFlaggedId(0)
    dispatch(getMakeListAction())
  }

  return (
    <MyDiv>
      {(adminState?.makeList?.loading || adminState?.deleteMake?.loading) &&
      <div>
        <Loader />
      </div>
      }
      <Box className="page_heading">
        <Typography>Manage Makes</Typography>
      </Box>
      <Box className="admin_card">
        <Grid container className="main_container" columnSpacing={{md: 8}} >
          <Grid item md={4} className="d-flex">
            <Box className="input_box">
              <Typography>Make</Typography>
              <CustomTextBox value={addValue} onChange={handleChangeAdd} name="serial" />
            </Box>
            <CustomButton onClick={handleAdd} title="Add" className="btn_theme" variant="contained" />
          </Grid>
          <Grid item md={4}>
            <Box className="input_box">
              <Typography>Search String</Typography>
              <CustomTextBox onChange={handleChange} name="serial" value={searchValue} />
            </Box>
          </Grid>
          <Grid item md={4} className="d-flex">
            <Box className="input_box">
              <FormControl size="small" className="select_area">
                <Select
                  id="select_input"
                  className="select_value"
                  value={isFlaggedId}
                  fullWidth
                  onChange={handleChangeMenu}
                >
                  {selectValues?.map((item) => {
                    return (
                      <StyledMenuItem key={item.id} value={item.id}>
                        {item.label}
                      </StyledMenuItem>
                    )
                  })}
                </Select>
              </FormControl>
            </Box>
            <Box className="d-flex">
              <CustomButton onClick={handleSearchName} title="Search" className="btn_theme" variant="contained" />
              <CustomButton title="Reset" className="btn_reset" variant="contained" onClick={handleReset} />
            </Box>
          </Grid>
        </Grid>
      </Box>
      <ManageMakeTable makeList={filteredMakeList} handleCheck={handleCheck} checkedId={checkedId} />
      <Box className="d-flex bottom_actions">
        <CustomButton onClick={handleDelete} title="Delete" className="btn_theme" variant="contained" />
        <CustomButton title="Cancel" className="btn_reset" variant="contained" />
      </Box>
      <AlertMessage
        message={message}
        severity={status}
        open={message?.length > 0}
        close={handleSnackBarClose}
      />
    </MyDiv>
  )
}
