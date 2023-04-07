import {deleteModel} from '../../../services/adminService'
import {adminListActions} from '../admin'
import getModelListAction from './getModelListAction'

const deleteModelAction = (payload) => {
  return (dispatch) => {
    dispatch(adminListActions.deleteModelRequest())
    deleteModel(payload).then((res) => {
      if (res.status === 200) {
        dispatch(adminListActions.setMessageData({message: 'Model Label Deleted Successfully.', status: 'success'}))
        dispatch(getModelListAction())
      }
      dispatch(adminListActions.deleteModelSuccess(res))
    }).catch((error) => {
      dispatch(adminListActions.deleteModelFailure(error))
    })
  }
}

export default deleteModelAction
