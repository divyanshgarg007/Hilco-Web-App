/* eslint-disable no-debugger */
import {createSlice, current} from '@reduxjs/toolkit'

const initialState = {
  messageData: {
    message: null,
    status: null,
  },
  selectedItems: [],
  reportsList: {
    loading: false,
    reportsList: [],
    error: null,
  },
  areaOdering: {
    loading: false,
    areaOdering: [],
    error: null,
  },
  projectDataList: {
    loading: false,
    projectDataList: [],
    error: null,
  },
  reportsPdf: {
    loading: false,
    reportsPdf: [],
    error: null,
  },
}

const reportSlice = createSlice({
  name: 'report',
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
    reportsListRequest(state, action) {
      state.reportsList.loading = true
    },
    reportsListSuccess(state, action) {
      state.reportsList.reportsList = action.payload
      state.reportsList.loading = false
    },
    reportsListFailure(state, action) {
      state.reportsList.error = action.payload
      state.reportsList.loading = false
    },
    areaOderingRequest(state, action) {
      state.areaOdering.loading = true
    },
    areaOderingSuccess(state, action) {
      state.areaOdering.areaOdering = action.payload
      state.areaOdering.loading = false
    },
    areaOderingFailure(state, action) {
      state.areaOdering.error = action.payload
      state.areaOdering.loading = false
    },
    projectDataListRequest(state, action) {
      state.projectDataList.loading = true
    },
    projectDataListSuccess(state, action) {
      state.projectDataList.projectDataList = action.payload
      state.projectDataList.loading = false
    },
    projectDataListFailure(state, action) {
      state.projectDataList.error = action.payload
      state.projectDataList.loading = false
    },
    reportsPdfRequest(state, action) {
      state.reportsPdf.loading = true
    },
    reportsPdfSuccess(state, action) {
      state.reportsPdf.reportsPdf = action.payload
      state.reportsPdf.loading = false
    },
    reportsPdfFailure(state, action) {
      state.reportsPdf.error = action.payload
      state.reportsPdf.loading = false
    },
    setAllItemsSelected(state, action) {
      const {payload} = action
      if (payload.includes('asset-list-reports')) {
        const allItems = current(state.reportsList.reportsList)
        const allIds = allItems.map((elem) => elem.location_id)
        state.selectedItems = allIds
        return
      }
    },
    clearSelectedItems(state) {
      state.selectedItems = []
    },
  },
})

export const reportListActions = reportSlice.actions

export default reportSlice.reducer
