/* eslint-disable no-unused-vars */
import React, {useEffect, useState} from 'react'
import Dialog from '@mui/material/Dialog'
import Slide from '@mui/material/Slide'
import {
  Box,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  Typography,
} from '@mui/material'
import {Close} from '@mui/icons-material'
import {DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd'
import {useDispatch, useSelector} from 'react-redux'
import {CustomButton} from '../../../../components'
import {postAreaOrderListAction} from '../../../../redux/reports/ReportActions'
import MyDiv from './areaOrderingDialog.style'

const Transition = React.forwardRef((props, ref) => {
  return <Slide direction="up" ref={ref} {...props} />
})

export default function AreaOrderingDialog(props) {

  const dispatch = useDispatch()
  const [items, setItems] = useState()

  useEffect(() => {
    setItems(props.areaList[0])
  }, [props.areaList[0]])

  const onDragEnd = (result) => {
    let locationId
    const areaList = items?.area?.filter((data) => data.area !== result.draggableId).map((data) => {
      locationId = data.location_id
      return (Object.values(data)[0])
    })
    areaList.splice(result.destination.index, 0, result.draggableId)
    let areaString = areaList.join('^')
    let obj = {
      areas: areaString,
      id: 2,
      locationId: locationId,
      reOrderArea: 'reOrderArea',
    }
    dispatch(postAreaOrderListAction(obj))
  }

  const popup = (popupbox) => (
    <MyDiv>
      <Box className="dialog_box">
        <Box className="dialog_header">
          <DialogTitle className="dialog_title">Area Ordering</DialogTitle>
          <IconButton className="icon" onClick={props.handleOrder}>
            <Close />
          </IconButton>
        </Box>
        <Divider />
        <DialogContent className="dialog_content">
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="droppable">
              {(provided) => (
                <ul {...provided.droppableProps} ref={provided.innerRef} className="dragList">
                  {items?.area?.map((item, index) => {
                    return (
                      <Draggable key={item?.area} draggableId={item?.area} index={index}>
                        {(provided) => (
                          <li
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <Box className="card_box">
                              <Typography>{item.area}</Typography>
                            </Box>
                          </li>
                        )}
                      </Draggable>
                    )
                  }
                  )}
                  {provided.placeholder}
                </ul>
              )}
            </Droppable>
          </DragDropContext>
        </DialogContent>
        <DialogActions>
          <Box className="d-flex mb-20 mt-10">
            <CustomButton
              title="Close"
              variant="contained"
              className="btn_theme"
              onClick={props.handleOrder}
            />
          </Box>
        </DialogActions>
      </Box>
    </MyDiv>
  )
  return (
    <Dialog
      popupbox="openDialog"
      open={props.openOrder}
      TransitionComponent={Transition}
      onClose={props.handleOrder}
      fullWidth
    >
      {popup('openDialog')}
    </Dialog>
  )
}
