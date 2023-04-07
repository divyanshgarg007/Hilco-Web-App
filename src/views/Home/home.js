/* eslint-disable prefer-template */
/* eslint-disable no-fallthrough */
/* eslint-disable radix */
/* eslint-disable no-unused-vars */
import React, {useState, useEffect} from 'react'
import {
  Box,
  FormControl,
  Grid,
  IconButton,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'
import TableCell, {tableCellClasses} from '@mui/material/TableCell'
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted'
import styled from 'styled-components'
import {useHistory} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {
  getLocationsDataAction, getLocationPriceValuesAction,
} from '../../redux/home/HomeActions'
import {getAppraiserTrueAction} from '../../redux/admin/AdminActions'
import {CustomBarChart, CustomPieChart, Loader} from '../../components'
import * as routesNames from '../../constants/routes'
import MyDiv from './home.style'

const StyledTableCell = styled(TableCell)(({theme}) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#ecebeb',
    color: '#555',
    fontSize: '15px',
    fontWeight: '600',
    textAlign: 'center',
    fontFamily: 'Poppins,sans-serif',
    border: '1px solid #cecece',
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: '13px',
    fontWeight: '500',
    color: '#555',
    textAlign: 'center',
    fontFamily: 'Poppins,sans-serif',
    borderBottom: '1px solid #cecece',
    borderRight: '1px solid #cecece',
    borderLeft: '1px solid #cecece',
  },
}))
const StyledTableCellBold = styled(TableCell)(({theme}) => ({
  [`&.${tableCellClasses.body}`]: {
    fontSize: '13px',
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
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
  // hide last border
  //   '&:last-child td, &:last-child th': {
  //     borderBottom: 0,
  //   },
}))

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

export default function Home() {

  const dispatch = useDispatch()
  const history = useHistory()
  const [values, setValues] = useState(0)
  const [locationData, setLocationData] = useState()
  const [locationValues, setLocationValues] = useState()

  const homeState = useSelector((state) => state.home)

  const locationAppraisers = locationData?.locationAppraisers
  const locationsDataFull = locationData?.locationsDataFull
  const locationPriceValues = locationValues?.locationPriceValues
  const projectPriceValues = locationData?.projectPriceValues

  // Calculate values of Flv and Olv
  let flvData = locationPriceValues?.FLV !== undefined ? Object.entries(locationPriceValues?.FLV) : null
  let olvData = locationPriceValues?.OLV !== undefined ? Object.entries(locationPriceValues?.OLV) : null

  // Total Sum for Flvs and Olvs Data
  const totalAssets = locationsDataFull?.reduce((prev, {assets}) => {
    return prev + assets
  }, 0)

  const totalLineAssets = locationsDataFull?.reduce((prev, next) => {
    return prev + (next.assets - next.less_count)
  }, 0)

  const priceValuesData = {
    sortCol: 'area_order',
    sortOrder: 'asc',
    action: 'getPriceValDataForHome',
    showOnlyAsset: false,
    appraiser: null,
    make: null,
    model: null,
    capacity: null,
    area: null,
  }

  useEffect(() => {
    dispatch(getLocationsDataAction())
    dispatch(getLocationPriceValuesAction(priceValuesData))
    dispatch(getAppraiserTrueAction())
  }, [dispatch])

  useEffect(() => {
    setLocationData(homeState?.locationsList?.locationsList?.data)
  }, [homeState?.locationsList?.locationsList])

  useEffect(() => {
    setLocationValues(homeState?.locationsPriceValues?.locationsPriceValues?.data)
  }, [homeState?.locationsPriceValues?.locationsPriceValues])

  const handleChange = (event) => {
    setValues(event.target.value)
  }

  const handleAssetList = () => {
    history.push(routesNames.ASSETLIST)
  }

  // for line chart
  const chartData = [['Location', 'Assets', {role: 'style'}]]
  locationsDataFull?.map((item) => {
    chartData.push([item.location_id.toString(), Number(item.assets), '#3366cc'])
  })

  const optionsBar = {
    title: '',
    width: 500,
    height: 300,
    vAxis: {title: 'Assets', minValue: 50},
    hAxis: {title: 'Location Id', slantedText: false, slantedTextAngle: 15},
    legend: {textStyle: {fontSize: 10}},
    chartArea: {width: '50%', height: '70%'},
  }

  // for pie chart
  const dataPie = [['Major', 'Degrees']]
  if (values === 0) {
    locationPriceValues?.FLV && Object.keys(locationPriceValues?.FLV)?.map((item) => {
      dataPie.push(['WireTech, Inc.' + item, Number(locationPriceValues?.FLV[item])])
    })
  }
  if (values === 1) {
    locationPriceValues?.OLV && Object.keys(locationPriceValues?.OLV)?.map((item) => {
      dataPie.push(['WireTech, Inc.' + item, Number(locationPriceValues?.OLV[item])])
    })
  }

  const optionsPie = {
    title: '',
    width: 500,
    height: 300,
    chartArea: {width: '100%', height: '70%'},
    tooltip: {
      isHtml: true,
    },
  }

  return (
    <MyDiv>
      {(homeState?.locationsList?.loading || homeState?.locationsPriceValues?.loading) &&
      <div>
        <Loader />
      </div>
      }
      <Box className="page_heading">
        <Typography>{locationsDataFull?.[0].project_name}</Typography>
      </Box>
      <Grid container columnSpacing={{sm: 8, md: 8}}>
        <Grid item md={6}>
          <Box className="chart_box">
            <Typography>Location wise Assets</Typography>
            <CustomBarChart data={chartData} options={optionsBar} />
          </Box>
        </Grid>
        <Grid item md={6}>
          <Box className="chart_box">
            <Typography>Location wise Values</Typography>
            <FormControl size="small" className="select_form">
              <Select
                id="select_input"
                className="select_value"
                value={values}
                onChange={handleChange}
              >
                {projectPriceValues?.map((item, index) => {
                  return (
                    <StyledMenuItem key={index} value={index}>
                      {item}
                    </StyledMenuItem>
                  )
                })}
              </Select>
            </FormControl>
            <CustomPieChart data={dataPie} options={optionsPie} />
          </Box>
        </Grid>
      </Grid>
      <TableContainer className="custom_table">
        <Table>
          <TableHead>
            <TableRow>
              <StyledTableCell>Location [Location Id]</StyledTableCell>
              <StyledTableCell>No. of Assets (Individual)</StyledTableCell>
              <StyledTableCell>No. of Assets (Line)</StyledTableCell>
              <StyledTableCell>Appraisers</StyledTableCell>
              <StyledTableCell>FLV($)</StyledTableCell>
              <StyledTableCell>OLV($)</StyledTableCell>
              <StyledTableCell>Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {locationsDataFull?.map((item) => {
              return (
                <StyledTableRow key={item.location_id}>
                  <StyledTableCell>{item.name} [{item.location_id}] {item.street} {item.state} {item.country} </StyledTableCell>
                  <StyledTableCell>{item.assets}</StyledTableCell>
                  <StyledTableCell>{item.assets - item.less_count}</StyledTableCell>
                  <StyledTableCell key={item.location_id}>
                    {Object.values(locationAppraisers[item?.location_id])?.map((elem) => {
                      return elem.concat(', ')
                    })}
                  </StyledTableCell>
                  <StyledTableCell>
                    {flvData !== undefined && flvData !== 'null' ? flvData?.filter((data) => parseInt(data[0]) === parseInt([item?.location_id]))[0][1].toLocaleString() : null}
                  </StyledTableCell>
                  <StyledTableCell>
                    {olvData !== undefined && olvData !== 'null' ? olvData?.filter((data) => parseInt(data[0]) === parseInt([item?.location_id]))[0][1].toLocaleString() : null}
                  </StyledTableCell>
                  <StyledTableCell>
                    <IconButton className="list_icon" onClick={() => handleAssetList(item.location_id)}>
                      <FormatListBulletedIcon />
                    </IconButton>
                  </StyledTableCell>
                </StyledTableRow>
              )
            }
            )}
            <StyledTableRow>
              <StyledTableCellBold>Total for all locations</StyledTableCellBold>
              <StyledTableCellBold>{totalAssets}</StyledTableCellBold>
              <StyledTableCellBold>{totalLineAssets}</StyledTableCellBold>
              <StyledTableCellBold />
              <StyledTableCellBold>{locationData?.currencySymbols?.USD}{locationValues?.locationTotalValues?.FLV.toLocaleString()}</StyledTableCellBold>
              <StyledTableCellBold>{locationData?.currencySymbols?.USD}{locationValues?.locationTotalValues?.OLV.toLocaleString()}</StyledTableCellBold>
              <StyledTableCellBold />
            </StyledTableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </MyDiv>
  )
}
