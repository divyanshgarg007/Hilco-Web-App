/* eslint-disable no-debugger */
import {createSlice} from '@reduxjs/toolkit'

const initialState = {
  messageData: {
    message: null,
    status: null,
  },
  locationsList: {
    loading: false,
    locationsList: [],
    error: null,
  },
  locationsPriceValues: {
    loading: false,
    locationsPriceValues: [],
    error: null,
  },
}

const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    // defining the actions
    setMessageData(state, action) {
      state.messageData.message = action.payload.message
      state.messageData.status = action.payload.status
    },
    clearMessageData(state, action) {
      state.messageData.message = null
      state.messageData.status = null
    },
    locationsRequest(state, action) {
      state.locationsList.loading = true
    },
    locationsSuccess(state, action) {
      state.locationsList.locationsList = action.payload
      state.locationsList.loading = false
    },
    locationsFailure(state, action) {
      state.locationsList.error = action.payload
      state.locationsList.loading = false
    },
    locationsPriceValuesRequest(state, action) {
      state.locationsPriceValues.loading = true
    },
    locationsPriceValuesSuccess(state, action) {
      state.locationsPriceValues.locationsPriceValues = action.payload
      state.locationsPriceValues.loading = false
    },
    locationsPriceValuesFailure(state, action) {
      state.locationsPriceValues.error = action.payload
      state.locationsPriceValues.loading = false
    },
  },
})

export const homeListActions = homeSlice.actions

export default homeSlice.reducer
