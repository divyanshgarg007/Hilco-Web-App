import {removeAssetType} from '../../../services/adminService'
import {adminListActions} from '../admin'
import getAssetTypesClassesAction from './getAssetTypesClassesAction'

const deleteAssetTypeClassAction = (payload) => {
  return (dispatch) => {
    dispatch(adminListActions.deleteAssetTypeClassRequest())
    removeAssetType(payload).then((res) => {
      if (res.status === 200) {
        console.log(payload, 'payload')
        if (payload.action === 'disassociate') {
          dispatch(adminListActions.setMessageData({message: 'Asset Type Disassociated Successfully.', status: 'success'}))
        } else if (payload.action === 'associate') {
          dispatch(adminListActions.setMessageData({message: 'Asset Type Associated Successfully.', status: 'success'}))
        }
        dispatch(getAssetTypesClassesAction({action: payload.classListAction})) // extracting the action for our API (value - FetchAssetType)
      }
      dispatch(adminListActions.deleteAssetTypeClassSuccess(res))
    }).catch((error) => {
      dispatch(adminListActions.deleteAssetTypeClassFailure(error))
    })
  }
}

export default deleteAssetTypeClassAction
