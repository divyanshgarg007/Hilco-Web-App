import {deleteAssetType} from '../../../services/adminService'
import {adminListActions} from '../admin'
import getAssetTypeAction from './getAssetTypeAction'

const deleteAssetTypeAction = (payload) => {
  return (dispatch) => {
    dispatch(adminListActions.deleteAssetTypeRequest())
    deleteAssetType(payload).then((res) => {
      if (res.status === 200) {
        dispatch(adminListActions.setMessageData({message: 'Asset Type Deleted Successfully.', status: 'success'}))
        dispatch(getAssetTypeAction())
      }
      dispatch(adminListActions.deleteAssetTypeSuccess(res))
    }).catch((error) => {
      dispatch(adminListActions.deleteAssetTypeFailure(error))
    })
  }
}

export default deleteAssetTypeAction
