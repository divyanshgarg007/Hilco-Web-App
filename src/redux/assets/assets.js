import {createSlice} from '@reduxjs/toolkit'

const initialState = {
  messageData: {
    message: null,
    status: null,
  },
  findReplace: {
    loading: false,
    findReplace: [],
    error: null,
  },
  postFindReplace: {
    loading: false,
    postFindReplace: [],
    error: null,
  },
  postAddAsset: {
    loading: false,
    postAddAsset: [],
    error: null,
  },
  assetsByAppraiser: {
    loading: false,
    assetsByAppraiser: [],
    error: null,
  },
  photosByAsset: {
    loading: false,
    photosByAsset: [],
    error: null,
  },
  photosByAppraiser: {
    loading: false,
    photosByAppraiser: [],
    error: null,
  },
  photosToAssets: {
    loading: false,
    photosToAssets: [],
    error: null,
  },
  deleteAssignPhotos: {
    loading: false,
    deleteAssignPhotos: [],
    error: null,
  },
  getAssetListData: {
    loading: false,
    getLocationtData: [],
    getAppraiserData: [],
    getAreaData: [],
    getAssetsData: [],
    error: null,
  },
}

const assetsSlice = createSlice({
  name: 'assets',
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
    findReplaceRequest(state, action) {
      state.findReplace.loading = true
    },
    findReplaceSuccess(state, action) {
      state.findReplace.findReplace = action.payload
      state.findReplace.loading = false
    },
    findReplaceFailure(state, action) {
      state.findReplace.error = action.payload
      state.findReplace.loading = false
    },
    postFindReplaceRequest(state, action) {
      state.postFindReplace.loading = true
    },
    postFindReplaceSuccess(state, action) {
      state.postFindReplace.postFindReplace = action.payload
      state.postFindReplace.loading = false
    },
    postFindReplaceFailure(state, action) {
      state.postFindReplace.error = action.payload
      state.postFindReplace.loading = false
    },
    postAddAssetRequest(state, action) {
      state.postAddAsset.loading = true
    },
    postAddAssetSuccess(state, action) {
      state.postAddAsset.postAddAsset = action.payload
      state.postAddAsset.loading = false
    },
    postAddAssetFailure(state, action) {
      state.postAddAsset.error = action.payload
      state.postAddAsset.loading = false
    },
    assetsByAppraiserRequest(state, action) {
      state.assetsByAppraiser.loading = true
    },
    assetsByAppraiserSuccess(state, action) {
      state.assetsByAppraiser.assetsByAppraiser = action.payload
      state.assetsByAppraiser.loading = false
    },
    assetsByAppraiserFailure(state, action) {
      state.assetsByAppraiser.error = action.payload
      state.assetsByAppraiser.loading = false
    },
    photosByAssetRequest(state, action) {
      state.photosByAsset.loading = true
    },
    photosByAssetSuccess(state, action) {
      state.photosByAsset.photosByAsset = action.payload
      state.photosByAsset.loading = false
    },
    photosByAssetFailure(state, action) {
      state.photosByAsset.error = action.payload
      state.photosByAsset.loading = false
    },
    photosByAppraiserRequest(state, action) {
      state.photosByAppraiser.loading = true
    },
    photosByAppraiserSuccess(state, action) {
      state.photosByAppraiser.photosByAppraiser = action.payload
      state.photosByAppraiser.loading = false
    },
    photosByAppraiserFailure(state, action) {
      state.photosByAppraiser.error = action.payload
      state.photosByAppraiser.loading = false
    },
    photosToAssetsRequest(state, action) {
      state.photosToAssets.loading = true
    },
    photosToAssetsSuccess(state, action) {
      state.photosToAssets.photosToAssets = action.payload
      state.photosToAssets.loading = false
    },
    photosToAssetsFailure(state, action) {
      state.photosToAssets.error = action.payload
      state.photosToAssets.loading = false
    },
    deleteAssignPhotosRequest(state, action) {
      state.deleteAssignPhotos.loading = true
    },
    deleteAssignPhotosSuccess(state, action) {
      state.deleteAssignPhotos.deleteAssignPhotos = action.payload
      state.deleteAssignPhotos.loading = false
    },
    deleteAssignPhotosFailure(state, action) {
      state.deleteAssignPhotos.error = action.payload
      state.deleteAssignPhotos.loading = false
    },
    getAssetListDataRequest(state, action) {
      state.getAssetListData.loading = true
    },
    getLocationSuccess(state, action) {
      state.getAssetListData.getLocationtData = action.payload
      state.getAssetListData.loading = false
    },
    getAppraiserSuccess(state, action) {
      state.getAssetListData.getAppraiserData = action.payload
      state.getAssetListData.loading = false
    },
    getAreaSuccess(state, action) {
      state.getAssetListData.getAreaData = action.payload
      state.getAssetListData.loading = false
    },
    getAssetsSuccess(state, action) {
      state.getAssetListData.getAssetsData = action.payload
      state.getAssetListData.loading = false
    },
    getAssetListDataFailure(state, action) {
      state.getAssetListData.error = action.payload
      state.getAssetListData.loading = false
    },
  },
})

export const assetsListActions = assetsSlice.actions

export default assetsSlice.reducer
