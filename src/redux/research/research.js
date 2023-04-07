import {createSlice} from '@reduxjs/toolkit'

const initialState = {
  messageData: {
    message: null,
    status: null,
  },
  appraisalType: {
    loading: false,
    appraisalType: [],
    error: null,
  },
  importedType: {
    loading: false,
    importedType: [],
    error: null,
  },
  showResearch: {
    loading: false,
    showResearch: [],
    error: null,
  },
}

const researchSlice = createSlice({
  name: 'research',
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
    appraisalTypeRequest(state, action) {
      state.appraisalType.loading = true
    },
    appraisalTypeSuccess(state, action) {
      state.appraisalType.appraisalType = action.payload
      state.appraisalType.loading = false
    },
    appraisalTypeFailure(state, action) {
      state.appraisalType.error = action.payload
      state.appraisalType.loading = false
    },
    importedTypeRequest(state, action) {
      state.importedType.loading = true
    },
    importedTypeSuccess(state, action) {
      state.importedType.importedType = action.payload
      state.importedType.loading = false
    },
    importedTypeFailure(state, action) {
      state.importedType.error = action.payload
      state.importedType.loading = false
    },
    showResearchRequest(state, action) {
      state.showResearch.loading = true
    },
    showResearchSuccess(state, action) {
      state.showResearch.showResearch = action.payload
      state.showResearch.loading = false
    },
    showResearchFailure(state, action) {
      state.showResearch.error = action.payload
      state.showResearch.loading = false
    },
  },
})

export const researchListActions = researchSlice.actions

export default researchSlice.reducer
