/* eslint-disable prefer-template */
import React, {useEffect, useState} from 'react'
import {
  Delete as DeleteIcon,
  ExpandMore as ExpandMoreIcon,
} from '@mui/icons-material'
import {
  Box,
  IconButton,
  ListItemText,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
  ListItem,
} from '@mui/material'
import MyDiv from './locationsList.style'

export default function LocationsList(props) {

  const [expanded, setExpanded] = useState(false)
  const [finalData, setFinalData] = useState()

  const locationAppraisers = props.locationData?.locationAppraisers
  const locationsDataFull = props.locationData?.locationsDataFull

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false)
  }

  useEffect(() => {
    if (props.filteredFlag === false) {
      setFinalData(locationsDataFull)
    } else if (props.filteredFlag === true) {
      setFinalData(props.filteredLocationData)
    }
  }, [locationsDataFull, props.filteredLocationData])

  return (
    <MyDiv>
      <Box className="wrapper">
        {finalData?.map((item, index) => {
          return (
            <Accordion
              key={index}
              expanded={expanded === 'panel' + item.location_id}
              onChange={handleChange('panel' + item.location_id)}
              className="accordion_box"
            >
              <AccordionSummary
                onClick={() => props.handleAccordionClick(item.location_id)}
                className="accordion_item"
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
              >
                <Typography className="label_title">{item.name} [{item.location_id}]</Typography>
                <Typography className="label_data">{item.street} {item.state} {item.country}</Typography>
              </AccordionSummary>
              <AccordionDetails className="accordion_details">
                {locationAppraisers[item?.location_id] && Object.keys(locationAppraisers[item?.location_id])?.map((elem, index) => {
                  return (
                    <Box className="list_item" key={index}>
                      <ListItem key={locationAppraisers[item.location_id][elem.id]} className="list">
                        <ListItemText
                          primary={locationAppraisers[item.location_id][elem]}
                          className="label_name"
                        />
                      </ListItem>
                      <IconButton onClick={() => props.handleDelete(elem, item.location_id)}>
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  )
                })}
              </AccordionDetails>
            </Accordion>
          )
        })}
      </Box>
    </MyDiv>
  )
}
