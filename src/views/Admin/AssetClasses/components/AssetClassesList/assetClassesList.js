/* eslint-disable prefer-template */
import React from 'react'
import {ExpandMore as ExpandMoreIcon, KeyboardDoubleArrowLeft as KeyboardDoubleArrowLeftIcon} from '@mui/icons-material'
import {
  Box,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
  List,
  ListItemButton,
  IconButton,
  ListItemText,
} from '@mui/material'
import MyDiv from './assetClassesList.style'

export default function AssetClassesList(props) {

  const unAssigned = props.assetTypesList?.filter((data) => data.class_id === null)

  return (
    <MyDiv>
      <Box className="wrapper">
        <Accordion expanded={props.expanded === 'panel' + 0} onChange={props.handleChangeAccordion('panel' + 0)} className="accordion_box">
          <AccordionSummary
            className="accordion_item"
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel0bh-content"
            id="panel0bh-header"
          >
            <Typography className="label_title">Unassigned Asset Types ({unAssigned.length})</Typography>
          </AccordionSummary>
          <AccordionDetails className="accordion_details">
            <List>
              {unAssigned?.map((item, index) => {
                return (
                  <Box key={index}
                    className={
                      props.selectedIndex.filter((data) => data === item.asset_type_id)[0]
                        ? 'add_item list_item'
                        : 'list_item'
                    }
                  >
                    <ListItemButton
                      selected={props.selectedIndex === item.asset_type_id}
                      onClick={() => props.handleListItemClick(item.asset_type_id)}
                      key={item.asset_type_id}
                      className="list_btn"
                    >
                      <ListItemText
                        primary={item.type}
                        className="label_name"
                      />
                    </ListItemButton>
                  </Box>
                )
              })}
            </List>
          </AccordionDetails>
        </Accordion>
        {props.filterAssetClassesList?.map((item, index) => {
          return (
            <Accordion
              key={index}
              expanded={props.expanded === 'panel' + item.asset_class_id}
              onChange={props.handleChangeAccordion('panel' + item.asset_class_id)}
              className="accordion_box"
            >
              <AccordionSummary
                className="accordion_item"
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
              >
                <Typography className="label_title">{item.name} ({item.count})</Typography>
              </AccordionSummary>
              <AccordionDetails className="accordion_details">
                <List>
                  {props.assetTypesList?.filter((data) => data.class_id === item.asset_class_id)?.map((item, index) => {
                    return (
                      <Box key={index}
                        className={
                          props.selectedIndex.filter((data) => data === item.asset_type_id)[0]
                            ? 'add_item list_item'
                            : 'list_item'
                        }
                      >
                        <ListItemButton
                          selected={props.selectedIndex === item.asset_type_id}
                          onClick={() => props.handleListItemClick(item.asset_type_id)}
                          key={item.asset_type_id}
                          className="list_btn"
                        >
                          <ListItemText
                            primary={item.type}
                            className="label_name"
                          />
                        </ListItemButton>
                      </Box>
                    )
                  })}
                </List>
              </AccordionDetails>
            </Accordion>
          )
        })}
        <IconButton className="add_all" onClick={() => props.handleAssociate()}>
          <KeyboardDoubleArrowLeftIcon />
        </IconButton>
      </Box>
    </MyDiv>
  )
}
