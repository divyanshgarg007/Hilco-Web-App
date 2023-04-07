import React from 'react'
import {
  Box,
  IconButton,
  ListItemButton,
  ListItemText,
} from '@mui/material'
import {FormatListBulleted as FormatListBulletedIcon, KeyboardDoubleArrowRight as KeyboardDoubleArrowRightIcon} from '@mui/icons-material'
import {FixedSizeList as WindowList} from 'react-window'
import MyDiv from './appraisersList.style'

export default function AppraisersList(props) {

  const RenderItem = ({index, style}) => (<Box
    style={style}
    className={
      props.selectedIndex.filter((data) => data === props?.filteredAppraiserData[index]?.user_id)[0]
        ? 'add_item list_item'
        : 'list_item'
    }
  >
    <ListItemButton
      selected={props.selectedIndex === props?.filteredAppraiserData[index]?.user_id}
      onClick={() => props.handleListItemClick(props?.filteredAppraiserData[index]?.user_id)}
      key={props?.filteredAppraiserData[index]?.user_id}
      className="list_btn"
    >
      <ListItemText
        primary={`${props?.filteredAppraiserData[index]?.first_name}${' '}${props?.filteredAppraiserData[index]?.last_name}`}
        className="label_name"
      />
    </ListItemButton>
    <IconButton onClick={() => props.handlePopup(props?.filteredAppraiserData[index]?.user_id, 'appraiserLocation')}>
      <FormatListBulletedIcon />
    </IconButton>
  </Box>)

  return (
    <MyDiv>
      <Box className="wrapper">
        <WindowList height={565} itemCount={props.filteredAppraiserData?.length} itemSize={35} width="100%">
          {RenderItem}
        </WindowList>
        <IconButton onClick={props.handleMoveAppraiserList} className="add_all">
          <KeyboardDoubleArrowRightIcon />
        </IconButton>
      </Box>
    </MyDiv>
  )
}
