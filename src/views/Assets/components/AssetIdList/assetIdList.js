/* eslint-disable prefer-template */
import React from 'react'
import {Close, ExpandMore as ExpandMoreIcon} from '@mui/icons-material'
import {
  Box,
  IconButton,
  ListItemText,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
  ListItem,
  Grid,
  FormControlLabel,
  Checkbox,
} from '@mui/material'
import MyDiv from './assetIdList.style'

export default function AssetIdList(props) {

  const getAssetCount = (item) => {
    return Object.entries(props?.photosAssetData?.asset_photos).filter((elem) => elem[0] === item.toString())?.[0]?.[1]?.length ?? 0
  }

  return (
    <MyDiv>
      <Box className="wrapper">
        {props.assetsData !== undefined ?
          <>
            {props.assetsData && Object.values(props.assetsData)?.map((item, index) => {
              return (
                <Accordion
                  key={index}
                  expanded={props.expanded === 'panel' + item.type_id}
                  onChange={props.handleAccordionChange('panel' + item.type_id)}
                  className="accordion_box"
                >
                  <AccordionSummary
                    onClick={() => props.handleAccordionClick(item.type_id)}
                    className="accordion_item"
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                  >
                    <Typography className="label_title">Asset Id #{item.asset_id} {item.make} {item.year} {item.asset_no}
                      ({props?.photosAssetData?.asset_photos && getAssetCount(item.type_id)}) {item.type}</Typography>
                  </AccordionSummary>
                  <AccordionDetails className="accordion_details">
                    <Grid container columnSpacing={{md: 3}}>
                      {props?.photosAssetData?.asset_photos && Object.keys(props?.photosAssetData?.asset_photos)?.map((elem, index) => {
                        return (
                          Number(elem) === Number(item.type_id) ?
                            <>
                              {props?.photosAssetData?.asset_photos[elem].map((obj) => {
                                return (
                                  <Grid item md={3} key={index}>
                                    <Box className="list_item">
                                      <ListItem key={elem} className="list">
                                        <img src={props.url + obj.path} alt={obj.path.split('/').pop()} />
                                        <ListItemText
                                          primary={obj.path.split('/').pop()}
                                          className="label_name"
                                        />
                                        <FormControlLabel
                                          className="checked_label"
                                          control={<Checkbox checked={obj.photo_nominated === 1 ?? false} />}
                                          label="Nominate"
                                        />

                                      </ListItem>
                                      <IconButton onClick={() => props.handleDelete(obj.path)}>
                                        <Close />
                                      </IconButton>
                                    </Box>
                                  </Grid>
                                )
                              })}
                            </>
                            : null
                        )
                      })}
                    </Grid>
                  </AccordionDetails>
                </Accordion>
              )
            })}
          </> : <Typography className="label_title">No assets found</Typography>
        }
      </Box>
    </MyDiv>
  )
}
