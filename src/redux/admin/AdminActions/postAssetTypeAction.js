/* eslint-disable no-debugger */
import {postAssetTypeAdd} from '../../../services/adminService'
import {adminListActions} from '../admin'
import getAssetTypeAction from './getAssetTypeAction'

const postAssetTypeAction = (payload) => {
  return (dispatch) => {
    dispatch(adminListActions.postAssetTypeRequest())
    if (!payload.type) return
    postAssetTypeAdd({action: 'duplicate', type: payload.type}).then((res) => {
      if (res.status === 200) {
        if (res.data.assetType[0].count === 1) {
          dispatch(adminListActions.setMessageData({message: 'Asset Type Already Exists.', status: 'failed'}))// message content, status, eg - res.data
          return
        }
        postAssetTypeAdd({...payload, action: 'add'}).then(() => {
          dispatch(getAssetTypeAction())
          dispatch(adminListActions.setMessageData({message: 'Asset Type Added Successfully.', status: 'success'}))// message content, status, eg - res.data
        })
      }
      dispatch(adminListActions.postAssetTypeSuccess(res))
    }).catch((error) => {
      dispatch(adminListActions.postAssetTypeFailure(error))
    })
  }
}

export default postAssetTypeAction
