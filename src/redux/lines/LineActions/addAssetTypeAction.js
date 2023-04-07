import {postAssetTypeAdd} from '../../../services/adminService'
import {lineListActions} from '../line'
import getAssetTypeListAction from './getAssetTypeListAction'

const addAssetTypeAction = (payload) => {

  return (dispatch) => {
    dispatch(lineListActions.assetTypeRequest())
    if (!payload.type) return
    postAssetTypeAdd({action: 'duplicate', type: payload.type}).then((res) => {
      if (res.status === 200) {
        if (res.data.assetType[0].count === 1) {
          dispatch(lineListActions.setMessageData({message: 'Asset Type Already Exists.', status: 'failed'}))// message content, status, eg - res.data
          return
        }
        postAssetTypeAdd({...payload, action: 'add'}).then(() => {
          dispatch(getAssetTypeListAction())
          dispatch(lineListActions.setMessageData({message: 'Asset Type Added Successfully.', status: 'success'}))// message content, status, eg - res.data
        })
      }
      dispatch(lineListActions.assetTypeSuccess(res))
    }).catch((error) => {
      dispatch(lineListActions.assetTypeFailure(error))
    })
  }
}

export default addAssetTypeAction
