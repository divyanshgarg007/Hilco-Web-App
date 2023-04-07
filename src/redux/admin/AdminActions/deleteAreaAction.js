import {deleteArea} from '../../../services/adminService'
import {adminListActions} from '../admin'
import getAreaListAction from './getAreaListAction'

const deleteAreaAction = (payload) => {
  return (dispatch) => {
    dispatch(adminListActions.deleteAreaRequest())
    deleteArea(payload).then((res) => {
      if (res.status === 200) {
        dispatch(adminListActions.setMessageData({message: 'Area Deleted Successfully.', status: 'success'}))
        dispatch(getAreaListAction(payload))
      }
      dispatch(adminListActions.deleteAreaSuccess(res))
    }).catch((error) => {
      dispatch(adminListActions.deleteAreaFailure(error))
    })
  }
}

export default deleteAreaAction
