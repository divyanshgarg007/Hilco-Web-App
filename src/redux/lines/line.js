import {createSlice} from '@reduxjs/toolkit'

const initialState = {
  messageData: {
    message: null,
    status: null,
  },
  linesList: {
    loading: false,
    linesList: [],
    error: null,
  },
  assetDetails: {
    loading: false,
    assetDetails: [],
    error: null,
  },
  assetType: {
    loading: false,
    assetType: [],
    error: null,
  },
  assetTypeList: {
    loading: false,
    assetTypeList: [],
    error: null,
  },
  makeCapacityList: {
    loading: false,
    makeCapacityList: [],
    error: null,
  },
  postLineDetail: {
    loading: false,
    postLineDetail: [],
    error: null,
  },
  lineByAreaList: {
    loading: false,
    lineByAreaList: [],
    error: null,
  },
}

const lineSlice = createSlice({
  name: 'line',
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
    linesListRequest(state, action) {
      state.linesList.loading = true
    },
    linesListSuccess(state, action) {
      state.linesList.linesList = action.payload
      state.linesList.loading = false
    },
    linesListFailure(state, action) {
      state.linesList.error = action.payload
      state.linesList.loading = false
    },
    assetDetailsRequest(state, action) {
      state.assetDetails.loading = true
    },
    assetDetailsSuccess(state, action) {
      state.assetDetails.assetDetails = action.payload
      state.assetDetails.loading = false
    },
    assetDetailsFailure(state, action) {
      state.assetDetails.error = action.payload
      state.assetDetails.loading = false
    },
    assetTypeRequest(state, action) {
      state.assetType.loading = true
    },
    assetTypeSuccess(state, action) {
      state.assetType.assetType = action.payload
      state.assetType.loading = false
    },
    assetTypeFailure(state, action) {
      state.assetType.error = action.payload
      state.assetType.loading = false
    },
    assetTypeListRequest(state, action) {
      state.assetTypeList.loading = true
    },
    assetTypeListSuccess(state, action) {
      state.assetTypeList.assetTypeList = action.payload
      state.assetTypeList.loading = false
    },
    assetTypeListFailure(state, action) {
      state.assetTypeList.error = action.payload
      state.assetTypeList.loading = false
    },
    makeCapacityListRequest(state, action) {
      state.makeCapacityList.loading = true
    },
    makeCapacityListSuccess(state, action) {
      state.makeCapacityList.makeCapacityList = action.payload
      state.makeCapacityList.loading = false
    },
    makeCapacityListFailure(state, action) {
      state.makeCapacityList.error = action.payload
      state.makeCapacityList.loading = false
    },
    postLineDetailRequest(state, action) {
      state.postLineDetail.loading = true
    },
    postLineDetailSuccess(state, action) {
      state.postLineDetail.postLineDetail = action.payload
      state.postLineDetail.loading = false
    },
    postLineDetailFailure(state, action) {
      state.postLineDetail.error = action.payload
      state.postLineDetail.loading = false
    },
    lineByAreaListRequest(state, action) {
      state.lineByAreaList.loading = true
    },
    lineByAreaListSuccess(state, action) {
      state.lineByAreaList.lineByAreaList = action.payload
      state.lineByAreaList.loading = false
    },
    lineByAreaListFailure(state, action) {
      state.lineByAreaList.error = action.payload
      state.lineByAreaList.loading = false
    },
  },
})

export const lineListActions = lineSlice.actions

export default lineSlice.reducer
