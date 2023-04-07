import React, {useState} from 'react'
import {
  Box,
  Checkbox,
  Divider,
  FormControlLabel,
  Grid,
  IconButton,
  Typography,
} from '@mui/material'
import {DragIndicator as DragIndicatorIcon} from '@mui/icons-material'
import {DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd'
import {CustomButton} from '../../../../components'
import MyDiv from './researchColumns.style'

export default function ResearchColumns(props) {

  const [isSelect, setIsSelected] = useState(true)

  const handleSelect = () => {
    setIsSelected(!isSelect)
  }

  return (
    <MyDiv>
      <Box className="wrapper_box">
        <Grid container columnSpacing={{sm: 4, md: 4}} mb={3}>
          <Grid item md={12} className="top_grid">
            <Typography className="heading">
              {!isSelect ? 'Sort Columns' : 'Display Columns'}
            </Typography>
            <CustomButton
              title={isSelect ? 'Sort Columns' : 'Display Columns'}
              variant="contained"
              className="btn_theme"
              onClick={handleSelect}
            />
          </Grid>
          <Grid item md={12}>
            <Divider />
          </Grid>
          {isSelect ? (
            <>
              {props?.displyColumns?.map((item) => {
                return (
                  <Grid item md={6} key={item.id}>
                    <FormControlLabel className="check_data"
                      control={
                        <Checkbox
                          onChange={props.handleChange}
                          value={item.label}
                          checked={props?.isChecked?.filter((data) => data.id === item.id)[0]}
                          id={item.id}
                        />
                      }
                      label={item.label}
                    />
                  </Grid>
                )
              })}
              <Grid item md={12} mb={1} mt={1}>
                <Typography className="heading">Values</Typography>
                <Divider />
              </Grid>
              {props?.values?.map((item) => {
                return (
                  <Grid item md={6} key={item.id}>
                    <FormControlLabel className="check_data"
                      control={
                        <Checkbox
                          onChange={props.handleChange}
                          value={item.label}
                          checked={props?.isChecked?.filter((data) => data.id === item.id)[0]}
                          id={item.id}
                        />
                      }
                      label={item.label}
                    />
                  </Grid>
                )
              })}
            </>
          ) :
            (
              <Grid item md={12}>
                <DragDropContext onDragEnd={props.onDragEnd}>
                  <Droppable droppableId="droppable">
                    {(provided) => (
                      <ul {...provided.droppableProps} ref={provided.innerRef} className="dragList">
                        {props?.isChecked?.map((item, index) => {
                          return (
                            <Draggable key={item?.id} draggableId={item?.id} index={index}>
                              {(provided) => (
                                <li
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                >
                                  <Grid container className="drag_box">
                                    <Grid item md={11}>
                                      <Box className="card_box">
                                        <Typography>{item.value}</Typography>
                                      </Box>
                                    </Grid>
                                    <Grid item md={1}>
                                      <IconButton {...provided.dragHandleProps}>
                                        <DragIndicatorIcon />
                                      </IconButton>
                                    </Grid>
                                  </Grid>
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
              </Grid>
            )
          }
        </Grid>
      </Box>
    </MyDiv>
  )
}
