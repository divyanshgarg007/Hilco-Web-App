import {deleteSerialLabel} from '../../../services/adminService'
import {adminListActions} from '../admin'
import getSerialLabelAction from './getSerialLabelAction'

const deleteSerialLabelAction = (payload) => {
  return (dispatch) => {
    dispatch(adminListActions.deleteSerialLabelRequest())
    deleteSerialLabel(payload).then((res) => {
      if (res.status === 200) {
        dispatch(adminListActions.setMessageData({message: 'Serial Label Deleted Successfully.', status: 'success'}))
        dispatch(getSerialLabelAction())
      }
      dispatch(adminListActions.deleteSerialLabelSuccess(res))
    }).catch((error) => {
      dispatch(adminListActions.deleteSerialLabelFailure(error))
    })
  }
}

export default deleteSerialLabelAction
