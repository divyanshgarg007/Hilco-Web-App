import React, {useState, useEffect} from 'react'
import {
  Box,
  Grid,
  IconButton,
  ListItemButton,
  ListItemText,
} from '@mui/material'
import {KeyboardDoubleArrowRight as KeyboardDoubleArrowRightIcon} from '@mui/icons-material'
import MyDiv from './imagesList.style'

export default function ImagesList(props) {

  const [filteredImages, setFilteredImages] = useState([])

  useEffect(() => {
    const allImages = [...props.imagesList]
    props?.photosAssetData?.asset_photos_to_remove?.map((element) => {
      const currentIndex = allImages.indexOf(element)
      if (currentIndex > -1) {
        allImages.splice(currentIndex, 1)
      }
      setFilteredImages(allImages)
    })
  }, [props?.photosAssetData?.asset_photos_to_remove, props?.imagesList])

  return (
    <MyDiv>
      <Box className="wrapper">
        <Grid container columnSpacing={{md: 3}}>
          {filteredImages?.map((item, index) => {
            return (
              <Grid item md={3} key={index}>
                <Box className={props.selectedIndex.filter((data) => data === item)[0] ? 'add_item list_item' : 'list_item'}>
                  <ListItemButton
                    selected={props.selectedIndex === item}
                    onClick={() => props.handleListItemClick(item)}
                    key={index}
                    className="list_btn"
                  >
                    <img src={props.url + item} alt={item.split('/').pop()} />
                    <ListItemText primary={item.split('/').pop()} className="label_name" />
                  </ListItemButton>
                </Box>
              </Grid>
            )
          })}
        </Grid>
        <IconButton className="add_all" onClick={props.handleAssign}>
          <KeyboardDoubleArrowRightIcon />
        </IconButton>
      </Box>
    </MyDiv>
  )
}
