/* eslint-disable no-debugger */
import {createSlice, current} from '@reduxjs/toolkit'

const initialState = {
  messageData: {
    message: null,
    status: null,
  },
  selectedItems: [],
  appraiserList: {
    loading: false,
    appraiserList: [],
    error: null,
  },
  locationList: {
    loading: false,
    locationList: [],
    error: null,
  },
  appraiserLocationsList: {
    loading: false,
    appraiserLocationsList: [],
    error: null,
  },
  postAssignAppraiser: {
    loading: false,
    assignAppraiserList: [],
    error: null,
  },
  postAssignAppraiserAll: {
    loading: false,
    assignAppraiserList: [],
    error: null,
  },
  deleteAssignAppraiser: {
    loading: false,
    assignAppraiserList: [],
    error: null,
  },
  getResetAssignAppraiser: {
    loading: false,
    assignAppraiserList: [],
    error: null,
  },
  getAppraiserTrue: {
    loading: false,
    appraiserListTrue: [],
    error: null,
  },
  areaList: {
    loading: false,
    areaList: [],
    error: null,
  },
  deleteArea: {
    loading: false,
    deleteArea: [],
    error: null,
  },
  serialLabelList: {
    loading: false,
    serialLabelList: [],
    error: null,
  },
  postSerialLabel: {
    loading: false,
    postSerialLabel: [],
    error: null,
  },
  deleteSerialLabel: {
    loading: false,
    deleteSerialLabel: [],
    error: null,
  },
  assetTypeList: {
    loading: false,
    assetTypeList: [],
    error: null,
  },
  postAssetType: {
    loading: false,
    postAssetType: [],
    error: null,
  },
  deleteAssetType: {
    loading: false,
    deleteAssetType: [],
    error: null,
  },
  modelList: {
    loading: false,
    modelList: [],
    error: null,
  },
  postModel: {
    loading: false,
    postModel: [],
    error: null,
  },
  deleteModel: {
    loading: false,
    deleteModel: [],
    error: null,
  },
  postAssignAppraiserUser: {
    loading: false,
    postAssignAppraiserUser: [],
    error: null,
  },
  makeList: {
    loading: false,
    makeList: [],
    error: null,
  },
  postMake: {
    loading: false,
    postMake: [],
    error: null,
  },
  deleteMake: {
    loading: false,
    deleteMake: [],
    error: null,
  },
  assetClassesList: {
    loading: false,
    assetClassesList: [],
    error: null,
  },
  assetClassDetail: {
    loading: false,
    assetClassDetail: [],
    error: null,
  },
  deleteAssetClasses: {
    loading: false,
    deleteAssetClasses: [],
    error: null,
  },
  postAssetClasses: {
    loading: false,
    postAssetClasses: [],
    error: null,
  },
  assetTypesClasses: {
    loading: false,
    assetTypesClasses: [],
    error: null,
  },
  deleteAssetTypeClass: {
    loading: false,
    deleteAssetTypeClass: [],
    error: null,
  },
}

const adminSlice = createSlice({
  name: 'admin',
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
    appraiserListRequest(state, action) {
      state.appraiserList.loading = true
    },
    appraiserListSuccess(state, action) {
      state.appraiserList.appraiserList = action.payload
      state.appraiserList.loading = false
    },
    appraiserListFailure(state, action) {
      state.appraiserList.error = action.payload
      state.appraiserList.loading = false
    },
    locationListRequest(state, action) {
      state.locationList.loading = true
    },
    locationListSuccess(state, action) {
      state.locationList.locationList = action.payload
      state.locationList.loading = false
    },
    locationListFailure(state, action) {
      state.locationList.error = action.payload
      state.locationList.loading = false
    },
    getAppraiserLocationsRequest(state, action) {
      state.appraiserLocationsList.loading = true
    },
    getAppraiserLocationsSuccess(state, action) {
      state.appraiserLocationsList.appraiserLocationsList = action.payload
      state.appraiserLocationsList.loading = false
    },
    getAppraiserLocationsFailure(state, action) {
      state.appraiserLocationsList.error = action.payload
      state.appraiserLocationsList.loading = false
    },
    postAssignAppraiserRequest(state, action) {
      state.postAssignAppraiser.loading = true
    },
    postAssignAppraiserSuccess(state, action) {
      state.postAssignAppraiser = action.payload
      state.postAssignAppraiser.loading = false
    },
    postAssignAppraiserFailure(state, action) {
      state.postAssignAppraiser.error = action.payload
      state.postAssignAppraiser.loading = false
    },
    postAssignAppraiserAllRequest(state, action) {
      state.postAssignAppraiserAll.loading = true
    },
    postAssignAppraiserAllSuccess(state, action) {
      state.postAssignAppraiserAll = action.payload
      state.postAssignAppraiserAll.loading = false
    },
    postAssignAppraiserAllFailure(state, action) {
      state.postAssignAppraiserAll.error = action.payload
      state.postAssignAppraiserAll.loading = false
    },
    deleteAssignAppraiserRequest(state, action) {
      state.deleteAssignAppraiser.loading = true
    },
    deleteAssignAppraiserSuccess(state, action) {
      state.deleteAssignAppraiser = action.payload
      state.deleteAssignAppraiser.loading = false
    },
    deleteAssignAppraiserFailure(state, action) {
      state.deleteAssignAppraiser.error = action.payload
      state.deleteAssignAppraiser.loading = false
    },
    getResetAssignAppraiserRequest(state, action) {
      state.getResetAssignAppraiser.loading = true
    },
    getResetAssignAppraiserSuccess(state, action) {
      state.getResetAssignAppraiser = action.payload
      state.getResetAssignAppraiser.loading = false
    },
    getResetAssignAppraiserFailure(state, action) {
      state.getResetAssignAppraiser.error = action.payload
      state.getResetAssignAppraiser.loading = false
    },
    getAppraiserTrueRequest(state, action) {
      state.getResetAssignAppraiser.loading = true
    },
    getAppraiserTrueSuccess(state, action) {
      state.getResetAssignAppraiser = action.payload
      state.getResetAssignAppraiser.loading = false
    },
    getAppraiserTrueFailure(state, action) {
      state.getResetAssignAppraiser.error = action.payload
      state.getResetAssignAppraiser.loading = false
    },
    getAreaListRequest(state, action) {
      state.areaList.loading = true
    },
    getAreaListSuccess(state, action) {
      state.areaList.areaList = action.payload
      state.areaList.loading = false
    },
    getAreaListFailure(state, action) {
      state.areaList.error = action.payload
      state.areaList.loading = false
    },
    clearAreaList(state, action) {
      state.areaList.areaList = []
    },
    deleteAreaRequest(state, action) {
      state.deleteArea.loading = true
    },
    deleteAreaSuccess(state, action) {
      state.deleteArea.deleteArea = action.payload
      state.deleteArea.loading = false
    },
    deleteAreaFailure(state, action) {
      state.deleteArea.error = action.payload
      state.deleteArea.loading = false
    },
    getSerialLabelRequest(state, action) {
      state.serialLabelList.loading = true
    },
    getSerialLabelSuccess(state, action) {
      state.serialLabelList.serialLabelList = action.payload
      state.serialLabelList.loading = false
    },
    getSerialLabelFailure(state, action) {
      state.serialLabelList.error = action.payload
      state.serialLabelList.loading = false
    },
    postSerialLabelRequest(state, action) {
      state.postSerialLabel.loading = true
    },
    postSerialLabelSuccess(state, action) {
      state.postSerialLabel.postSerialLabel = action.payload
      state.postSerialLabel.loading = false
    },
    postSerialLabelFailure(state, action) {
      state.postSerialLabel.error = action.payload
      state.postSerialLabel.loading = false
    },
    deleteSerialLabelRequest(state, action) {
      state.deleteSerialLabel.loading = true
    },
    deleteSerialLabelSuccess(state, action) {
      state.deleteSerialLabel.deleteSerialLabel = action.payload
      state.deleteSerialLabel.loading = false
    },
    deleteSerialLabelFailure(state, action) {
      state.deleteSerialLabel.error = action.payload
      state.deleteSerialLabel.loading = false
    },
    getAssetTypeRequest(state, action) {
      state.assetTypeList.loading = true
    },
    getAssetTypeSuccess(state, action) {
      state.assetTypeList.assetTypeList = action.payload
      state.assetTypeList.loading = false
    },
    getAssetTypeFailure(state, action) {
      state.assetTypeList.error = action.payload
      state.assetTypeList.loading = false
    },
    postAssetTypeRequest(state, action) {
      state.postAssetType.loading = true
    },
    postAssetTypeSuccess(state, action) {
      state.postAssetType.postAssetType = action.payload
      state.postAssetType.loading = false
    },
    postAssetTypeFailure(state, action) {
      state.postAssetType.error = action.payload
      state.postAssetType.loading = false
    },
    deleteAssetTypeRequest(state, action) {
      state.deleteAssetType.loading = true
    },
    deleteAssetTypeSuccess(state, action) {
      state.deleteAssetType.deleteAssetType = action.payload
      state.deleteAssetType.loading = false
    },
    deleteAssetTypeFailure(state, action) {
      state.deleteAssetType.error = action.payload
      state.deleteAssetType.loading = false
    },
    getModelListRequest(state, action) {
      state.modelList.loading = true
    },
    getModelListSuccess(state, action) {
      state.modelList.modelList = action.payload
      state.modelList.loading = false
    },
    getModelListFailure(state, action) {
      state.modelList.error = action.payload
      state.modelList.loading = false
    },
    postModelRequest(state, action) {
      state.postModel.loading = true
    },
    postModelSuccess(state, action) {
      state.postModel.postModel = action.payload
      state.postModel.loading = false
    },
    postModelFailure(state, action) {
      state.postModel.error = action.payload
      state.postModel.loading = false
    },
    deleteModelRequest(state, action) {
      state.deleteModel.loading = true
    },
    deleteModelSuccess(state, action) {
      state.deleteModel.deleteModel = action.payload
      state.deleteModel.loading = false
    },
    deleteModelFailure(state, action) {
      state.deleteModel.error = action.payload
      state.deleteModel.loading = false
    },
    postAssignAppraiserUserRequest(state, action) {
      state.postAssignAppraiserUser.loading = true
    },
    postAssignAppraiserUserSuccess(state, action) {
      state.postAssignAppraiserUser = action.payload
      state.postAssignAppraiserUser.loading = false
    },
    postAssignAppraiserUserFailure(state, action) {
      state.postAssignAppraiserUser.error = action.payload
      state.postAssignAppraiserUser.loading = false
    },
    getMakeListRequest(state, action) {
      state.makeList.loading = true
    },
    getMakeListSuccess(state, action) {
      state.makeList.makeList = action.payload
      state.makeList.loading = false
    },
    getMakeListFailure(state, action) {
      state.makeList.error = action.payload
      state.makeList.loading = false
    },
    postMakeListRequest(state, action) {
      state.postMake.loading = true
    },
    postMakeListSuccess(state, action) {
      state.postMake.postMake = action.payload
      state.postMake.loading = false
    },
    postMakeListFailure(state, action) {
      state.postMake.error = action.payload
      state.postMake.loading = false
    },
    deleteMakeRequest(state, action) {
      state.deleteMake.loading = true
    },
    deleteMakeSuccess(state, action) {
      state.deleteMake.deleteMake = action.payload
      state.deleteMake.loading = false
    },
    deleteMakeFailure(state, action) {
      state.deleteMake.error = action.payload
      state.deleteMake.loading = false
    },
    getassetClassesRequest(state, action) {
      state.assetClassesList.loading = true
    },
    getassetClassesSuccess(state, action) {
      state.assetClassesList.assetClassesList = action.payload
      state.assetClassesList.loading = false
    },
    getassetClassesFailure(state, action) {
      state.assetClassesList.error = action.payload
      state.assetClassesList.loading = false
    },
    getassetClassDetailRequest(state, action) {
      state.assetClassDetail.loading = true
    },
    getassetClassDetailSuccess(state, action) {
      state.assetClassDetail.assetClassDetail = action.payload
      state.assetClassDetail.loading = false
    },
    getassetClassDetailFailure(state, action) {
      state.assetClassDetail.error = action.payload
      state.assetClassDetail.loading = false
    },
    clearAssetClassDetail(state, action) {
      state.assetClassDetail.assetClassDetail = []
    },
    deleteAssetClassesRequest(state, action) {
      state.deleteAssetClasses.loading = true
    },
    deleteAssetClassesSuccess(state, action) {
      state.deleteAssetClasses.deleteAssetClasses = action.payload
      state.deleteAssetClasses.loading = false
    },
    deleteAssetClassesFailure(state, action) {
      state.deleteAssetClasses.error = action.payload
      state.deleteAssetClasses.loading = false
    },
    postAssetClassesRequest(state, action) {
      state.postAssetClasses.loading = true
    },
    postAssetClassesSuccess(state, action) {
      state.postAssetClasses.postAssetClasses = action.payload
      state.postAssetClasses.loading = false
    },
    postAssetClassesFailure(state, action) {
      state.postAssetClasses.error = action.payload
      state.postAssetClasses.loading = false
    },
    getAssetTypesClassesRequest(state, action) {
      state.assetTypesClasses.loading = true
    },
    getAssetTypesClassesSuccess(state, action) {
      state.assetTypesClasses.assetTypesClasses = action.payload
      state.assetTypesClasses.loading = false
    },
    getAssetTypesClassesFailure(state, action) {
      state.assetTypesClasses.error = action.payload
      state.assetTypesClasses.loading = false
    },
    deleteAssetTypeClassRequest(state, action) {
      state.deleteAssetTypeClass.loading = true
    },
    deleteAssetTypeClassSuccess(state, action) {
      state.deleteAssetTypeClass.deleteAssetTypeClass = action.payload
      state.deleteAssetTypeClass.loading = false
    },
    deleteAssetTypeClassFailure(state, action) {
      state.deleteAssetTypeClass.error = action.payload
      state.deleteAssetTypeClass.loading = false
    },
    setSelectedItems(state, action) {
      if (action.payload.type === 'add') {
        state.selectedItems = [...state.selectedItems, action.payload.id]
      } else {
        const filteredList = state.selectedItems.filter((elem) => elem !== action.payload.id)
        state.selectedItems = filteredList
      }
    },
    setAllItemsSelected(state, action) {
      const {payload} = action
      if (payload.includes('manage-asset-type')) {
        const allItems = current(state.assetTypeList.assetTypeList)
        const allIds = allItems.map((elem) => elem.asset_type_id)
        state.selectedItems = allIds
        return
      }
      if (payload.includes('manage-serial-labels')) {
        const allItems = current(state.serialLabelList.serialLabelList)
        const allIds = allItems.map((elem) => elem.serial_label_id)
        state.selectedItems = allIds
        return
      }
      if (payload.includes('manage-make')) {
        const allItems = current(state.makeList.makeList)
        const allIds = allItems.map((elem) => elem.make_id)
        state.selectedItems = allIds
        return
      }
      if (payload.includes('manage-model')) {
        const allItems = current(state.modelList.modelList)
        const allIds = allItems.map((elem) => elem.model_label_id)
        state.selectedItems = allIds
        return
      }
      if (payload.includes('manage-user')) {
        const allItems = current(state.appraiserList.appraiserList)
        const allIds = allItems.map((elem) => elem.user_id)
        state.selectedItems = allIds
        return
      }
      if (payload.includes('manage-area')) {
        const allItems = current(state.areaList.areaList)
        const allIds = allItems.map((elem) => elem.area)
        state.selectedItems = allIds
        return
      }
    },
    clearSelectedItems(state) {
      state.selectedItems = []
    },
  },
})

export const adminListActions = adminSlice.actions

export default adminSlice.reducer
