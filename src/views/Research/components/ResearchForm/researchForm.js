import React from 'react'
import {
  Grid,
  Typography,
  Box,
  FormControl,
  Select,
  MenuItem,
  FormControlLabel,
  Checkbox,
  Radio,
} from '@mui/material'
import styled from 'styled-components'
import {CustomAutoComplete, CustomButton, CustomTextBox} from '../../../../components'
import MyDiv from './researchForm.style'

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

const Placeholder = styled(MenuItem)(({theme}) => ({
  '&.MuiMenuItem-root': {
    display: 'none',
  },
}))

const ITEM_HEIGHT = 60
const Menu = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5,
    },
  },
}

const autoCompleteStyle = {
  height: '35px',
  border: '1px solid #aaa',
  borderRadius: '4px',
  backgroundColor: 'white',
  boxShadow: 'none',
  hoverBackgroundColor: '#eee',
  color: '#212121',
  fontSize: '14px',
  fontFamily: 'Poppins',
  iconColor: 'grey',
  lineColor: 'rgb(232, 234, 237)',
  placeholderColor: 'grey',
  clearIconMargin: '3px 14px 0 0',
  zIndex: 1,
  searchIconMargin: '0 0 0 16px',
}

// const items = [
//   {
//     id: 0,
//     name: 'Cobol',
//   },
//   {
//     id: 1,
//     name: 'JavaScript',
//   },
//   {
//     id: 2,
//     name: 'Basic',
//   },
//   {
//     id: 3,
//     name: 'PHP',
//   },
//   {
//     id: 4,
//     name: 'Java',
//   },
// ]

export default function ResearchForm(props) {

  return (
    <MyDiv>
      <Box className="wrapper_box">
        <Grid container columnSpacing={{sm: 4, md: 4}} mb={3}>
          <Grid item md={3}>
            <FormControlLabel className="checked_label"
              control={<Radio name="radio-buttons" value="1" onChange={(e) => props.handleCheckbox(e)} checked={props.checkValue === '1'} />} label="Appraisal Only"
            />
          </Grid>
          <Grid item md={3}>
            <FormControlLabel className="checked_label"
              control={<Radio name="radio-buttons" value="2" onChange={(e) => props.handleCheckbox(e)} checked={props.checkValue === '2'} />} label="Imported Only"
            />
          </Grid>
        </Grid>
        <Grid container columnSpacing={{sm: 4, md: 4}}>
          {!(props.checkValue === '2') &&
          <Grid item md={4}>
            <Box className="input_box">
              <Typography>Appraiser</Typography>
              <FormControl size="small" fullWidth>
                <Select
                  id="select_input"
                  className="select_value"
                  value={props.inputValues.appraisers || 0}
                  onChange={props.handleChangeInput}
                  name="appraisers"
                  MenuProps={{...Menu, autoFocus: false}}
                >
                  <CustomTextBox
                    onKeyDown={(e) => {e.stopPropagation()}}
                    autoFocus
                    value={props.searchName}
                    onChange={(e) => props.handleSearch(e, 'appraiser')}
                    className="search_box"
                    fieldLabel="Search"
                  />
                  <Placeholder value={0}>Select Appraiser</Placeholder>
                  {props?.filterAssetData?.map((item) => {
                    return (
                      <StyledMenuItem key={item.id} value={item.id}>
                        {item.last_name}{' '}{item.name}{' '}({item.id})
                      </StyledMenuItem>
                    )
                  })}
                </Select>
              </FormControl>
            </Box>
          </Grid>
          }
          <Grid item md={4}>
            <Box className="input_box">
              <Typography>Date Appraised</Typography>
              <Box className="date_box d-flex">
                <CustomTextBox value={props.inputValues?.date_appraised_from} onChange={props.handleChangeInput} name="date_appraised_from" fieldLabel="From" />
                <CustomTextBox value={props.inputValues?.date_appraised_to} onChange={props.handleChangeInput} name="date_appraised_to" fieldLabel="To" />
              </Box>
            </Box>
          </Grid>
          {!(props.checkValue === '2') &&
          <Grid item md={4}>
            <Box className="input_box">
              <Typography>Line</Typography>
              <CustomAutoComplete
                items={props?.appraisalData?.lines}
                resultStringKeyName="line_name"
                fuseOptions={{keys: ['line_name']}}
                handleOnSelect={(item) => props.handleOnSelect(item, 'lineData')}
                formatResult={(item) => props.formatResult(item, 'lineData')}
                placeholder="Search Line"
                showIcon={false}
                styling={autoCompleteStyle}
              />
            </Box>
          </Grid>
          }
          <Grid item md={4}>
            <Box className="input_box">
              <Typography>Make</Typography>
              <CustomAutoComplete
                items={props.checkValue === '1' ? props?.appraisalData?.makeList : props?.importedData?.makeList}
                resultStringKeyName="make"
                fuseOptions={{keys: ['make']}}
                handleOnSelect={(item) => props.handleOnSelect(item, 'makeData')}
                formatResult={(item) => props.formatResult(item, 'makeData')}
                placeholder="Search Make"
                showIcon={false}
                styling={autoCompleteStyle}
              />
            </Box>
          </Grid>
          <Grid item md={4}>
            <Box className="input_box">
              <Typography>Model</Typography>
              <CustomTextBox value={props.inputValues?.model} onChange={props.handleChangeInput} name="model" />
            </Box>
          </Grid>
          <Grid item md={4}>
            <Box className="input_box">
              <Typography>Capacity</Typography>
              <CustomTextBox value={props.inputValues?.capacity} onChange={props.handleChangeInput} name="capacity" />
            </Box>
          </Grid>
          <Grid item md={4}>
            <Box className="input_box">
              <Typography>Asset Type</Typography>
              <FormControl size="small" fullWidth>
                <Select
                  id="select_input"
                  className="select_value"
                  value={props.inputValues.asset_type || 0}
                  onChange={props.handleChangeInput}
                  MenuProps={{...Menu, autoFocus: false}}
                  name="asset_type"
                >
                  <CustomTextBox
                    onKeyDown={(e) => {e.stopPropagation()}}
                    autoFocus
                    value={props.searchName}
                    onChange={(e) => props.handleSearch(e, 'assetType')}
                    className="search_box"
                    fieldLabel="Search"
                  />
                  <Placeholder value={0}>Select Asset Type</Placeholder>
                  {props?.assetTypes?.map((item) => {
                    return (
                      <StyledMenuItem key={item.asset_type_id} value={item.asset_type_id}>
                        {item.asset_type}
                      </StyledMenuItem>
                    )
                  })}
                </Select>
              </FormControl>
            </Box>
          </Grid>
          <Grid item md={4}>
            <Box className="input_box">
              <Typography>Year</Typography>
              <Box className="date_box d-flex">
                <CustomTextBox value={props.inputValues?.year_from} onChange={props.handleChangeInput} name="year_from" fieldLabel="From" />
                <CustomTextBox value={props.inputValues?.year_to} onChange={props.handleChangeInput} name="year_to" fieldLabel="To" />
              </Box>
            </Box>
          </Grid>
          {(props.checkValue === '2') &&
          <Grid item md={4}>
            <Box className="input_box">
              <Typography>Cost</Typography>
              {/* <CustomAutoComplete
                items={items}
                handleOnSelect={props.handleOnSelect}
                formatResult={props.formatResult}
                placeholder="Search Cost"
                showIcon={false}
                styling={autoCompleteStyle}
              /> */}
              <CustomTextBox value={props.inputValues?.cost} onChange={props.handleChangeInput} name="cost" fieldLabel="Cost" />
            </Box>
          </Grid>
          }
          <Grid item md={4}>
            <Box className="input_box">
              <Typography>Description</Typography>
              <CustomTextBox value={props.inputValues?.description} onChange={props.handleChangeInput} name="description" />
            </Box>
          </Grid>
          <Grid item md={4}>
            <Box className="input_box">
              <Typography>Client</Typography>
              <CustomAutoComplete
                items={props.checkValue === '1' ? props?.appraisalData?.clients : props?.importedData?.clients}
                resultStringKeyName="client_name"
                fuseOptions={{keys: ['client_name']}}
                handleOnSelect={(item) => props.handleOnSelect(item, 'clientData')}
                formatResult={(item) => props.formatResult(item, 'clientData')}
                placeholder="Search Client"
                showIcon={false}
                styling={autoCompleteStyle}
              />
            </Box>
          </Grid>
          <Grid item md={4}>
            <Box className="input_box">
              <Typography>Company</Typography>
              <CustomAutoComplete
                items={props.checkValue === '1' ? props?.appraisalData?.companies : props?.importedData?.companies}
                resultStringKeyName="company_name"
                fuseOptions={{keys: ['company_name']}}
                handleOnSelect={(item) => props.handleOnSelect(item, 'companyData')}
                formatResult={(item) => props.formatResult(item, 'companyData')}
                placeholder="Search Company"
                showIcon={false}
                styling={autoCompleteStyle}
              />
            </Box>
          </Grid>
          {(props.checkValue === '2') &&
          <Grid item md={4}>
            <Box className="input_box">
              <Typography>Asset No</Typography>
              <CustomTextBox value={props.inputValues?.asset_no} onChange={props.handleChangeInput} name="asset_no" fieldLabel="Asset No" />
            </Box>
          </Grid>
          }
          {props.checkValue === '2' &&
          <Grid item md={4}>
            <Box className="input_box">
              <Typography>Serial Number</Typography>
              <CustomTextBox value={props.inputValues?.serial_number} onChange={props.handleChangeInput} name="serial_number" />
            </Box>
          </Grid>
          }
          {!(props.checkValue === '2') &&
          <Grid item md={4}>
            <Box mt={2}>
              <FormControlLabel className="checked_label" control={<Checkbox onChange={props.handleCheckbox} checked={props?.inputValues?.includeLine} />} label="Include Line" />
            </Box>
          </Grid>
          }
        </Grid>
        <Box className="d-flex btn-flex mb-20 mt-10">
          <CustomButton title="Search" variant="contained" className="btn_theme" onClick={props.handleShow} />
          <CustomButton title="Reset" variant="contained" className="btn_reset" />
        </Box>
      </Box>
    </MyDiv>
  )
}
