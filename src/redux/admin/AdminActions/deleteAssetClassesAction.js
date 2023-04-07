import {deleteAssetClasses} from '../../../services/adminService'
import {adminListActions} from '../admin'
import getAssetClassesListAction from './getAssetClassesListAction'

const deleteAssetClassesAction = (payload) => {
  return (dispatch) => {
    dispatch(adminListActions.deleteAssetClassesRequest())
    deleteAssetClasses(payload).then((res) => {
      if (res.status === 200) {
        dispatch(adminListActions.setMessageData({message: 'Asset Class Deleted Successfully.', status: 'success'}))
        dispatch(getAssetClassesListAction())
      }
      dispatch(adminListActions.deleteAssetClassesSuccess(res))
    }).catch((error) => {
      dispatch(adminListActions.deleteAssetClassesFailure(error))
    })
  }
}

export default deleteAssetClassesAction
