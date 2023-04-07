import React from 'react'
import {
  Box,
  Checkbox,
  IconButton,
  Popover,
  Typography,
} from '@mui/material'
import {Close} from '@mui/icons-material'
import MyDiv from './expandCell.style'

const ExpandCell = (props) => {

  return (
    <Popover
      open={props.expandMore}
      anchorEl={props.expandMore}
      onClose={props.handleExpandClose}
      PaperProps={{
        elevation: 0,
        sx: {
          'overflow': 'visible',
          'filter': 'drop-shadow(0px 1px 2px #ccc)',
          'mt': 0,
          'marginLeft': '120px',
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
        <Box className="container_box">
          <IconButton className="close" onClick={props.handleExpandClose}><Close /></IconButton>
          <Box className="inner_container">
            <Typography className="container-name">Appraiser Filtering</Typography>
            {props?.filterListData[0]?.appraiser?.map((item) => {
              return (
                <Box className="box_items" key={item.user_id}>
                  <Checkbox
                    onChange={props.handleChange}
                    value={item.last_name && item.name}
                    checked={props?.checked?.filter((elem) => elem.id === item.user_id)[0]}
                    id={item.user_id}
                  />
                  <Typography className="user_name">{item.last_name}{', '}{item.name}</Typography>
                </Box>
              )
            })}
          </Box>
        </Box>
      </MyDiv>
    </Popover>
  )
}
export default ExpandCell
