import { createSlice } from "@reduxjs/toolkit";

const testSlice = createSlice({
 name: 'test',
 initialState: {name: 'faraz'},
 // all the reducer functions are the actions that we will use. Redux does the rest of the work in the background
 reducers: {
  addName(state, action) {
   state.name = 'faraz shah' // payload is by default accessed by action.payload
  },
  addEmail(state, action) {
   state.pop('remove element')
  },
  addAddress(state, action) {
   // do whatever
  },
 }
})

export const asyncAction = () => {
 return (dispatch) => {
  //do async stuff 
  dispatch(testActions.addName())
 }
}

export const testActions = testSlice.actions; // these are all the actions associated with the slice

export default testSlice