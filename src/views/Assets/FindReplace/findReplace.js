import React, {useState, useEffect} from 'react'
import {
  Box,
  FormControl,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  Typography,
} from '@mui/material'
import {useDispatch, useSelector} from 'react-redux'
import {AlertMessage, CustomButton, CustomTextBox, Loader} from '../../../components'
import {FindReplaceTable} from '../components'
import {getFindReplaceAction, postFindReplaceAction} from '../../../redux/assets/AssetsActions'
import {assetsListActions} from '../../../redux/assets/assets'
import MyDiv from './findReplace.style'

export default function FindReplace() {

  const dispatch = useDispatch()
  const [showList, setShowList] = useState(false)
  const [findReplaceList, setFindReplaceList] = useState([])
  const [values, setValues] = useState({})
  const [checkValue, setCheckValue] = useState('matchcase')
  const [isChecked, setIsChecked] = useState({})
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState('')

  const assetsState = useSelector((state) => state.assets)

  useEffect(() => {
    setFindReplaceList(assetsState?.findReplace?.findReplace)
  }, [assetsState?.findReplace?.findReplace])

  useEffect(() => {
    if (assetsState?.messageData.status === 'success') {
      setMessage(assetsState?.messageData?.message)
      setStatus('success')
      setShowList(!showList)
      setValues({})
    }
    if (assetsState?.messageData.status === 'failed') {
      setMessage(assetsState?.messageData?.message)
      setStatus('warning')
    }
  }, [assetsState?.messageData])

  const handleChange = (e) => {
    setValues({...values, [e.target.name]: e.target.value})
  }

  const handleMatchCase = (e) => {
    setCheckValue(e.target.value)
  }

  const handleCheckBox = (e) => {
    setIsChecked({...isChecked, [e.target.value]: e.target.checked})
  }

  const handleSubmit = () => {
    if (!values?.find) {
      setMessage('Please Enter Find')
      setStatus('warning')
      return
    }
    let obj = {
      find: values?.find ?? '',
      matchtype: checkValue,
      replace: values?.replace ?? '',
      type: 'filter',
    }
    dispatch(getFindReplaceAction(obj))
    setShowList(!showList)
  }

  const commitChanges = () => {
    if (Object.keys(isChecked)?.toString() === '') {
      setMessage('Please select atleast one asset')
      setStatus('warning')
      return
    }
    let data = {
      find_text: values?.find ?? '',
      replace_text: values?.replace ?? '',
      matchtype: checkValue,
      items: Object.keys(isChecked)?.toString(),
    }
    dispatch(postFindReplaceAction(data))
  }

  const handleSnackBarClose = () => {
    setMessage('')
    setStatus('')
    dispatch(assetsListActions.clearMessageData())
  }

  return (
    <MyDiv>
      {(assetsState?.findReplace?.loading) &&
      <div>
        <Loader />
      </div>
      }
      <Box className="page_heading">
        <Typography>{!showList ? 'Find Replace' : 'Assets'}</Typography>
        {showList &&
        <CustomButton variant="contained" className="btn_theme" title="Commit" onClick={commitChanges} />
        }
      </Box>
      <Box className="wrapper_box">
        <Grid container columnSpacing={{md: 4}}>
          <Grid item md={3}>
            <Box className="input_box">
              <Typography>Find</Typography>
              <CustomTextBox value={values?.find ?? ''} onChange={handleChange} name="find" fieldLabel="Find" />
            </Box>
          </Grid>
          <Grid item md={3}>
            <Box className="input_box">
              <Typography>Replace</Typography>
              <CustomTextBox value={values?.replace ?? ''} onChange={handleChange} name="replace" fieldLabel="Replace" />
            </Box>
          </Grid>
          <Grid item md={12} mt={2}>
            <FormControl>
              <RadioGroup row>
                <FormControlLabel
                  className="checked_label"
                  value="matchcase"
                  control={<Radio onChange={handleMatchCase} checked={checkValue === 'matchcase'} />}
                  label="Match Case"
                />
                <FormControlLabel
                  className="checked_label"
                  value="matchword"
                  control={<Radio onChange={handleMatchCase} checked={checkValue === 'matchword'} />}
                  label="Match Whole Word"
                />
              </RadioGroup>
            </FormControl>
          </Grid>
        </Grid>
        <Box mt={2}>
          <CustomButton
            title="Submit"
            variant="contained"
            className="btn_theme"
            onClick={handleSubmit}
          />
        </Box>
      </Box>
      {showList &&
        <FindReplaceTable findReplaceList={findReplaceList} handleCheckBox={handleCheckBox} isChecked={isChecked} />
      }
      <AlertMessage
        message={message}
        severity={status}
        open={message?.length > 0}
        close={handleSnackBarClose}
      />
    </MyDiv>
  )
}
