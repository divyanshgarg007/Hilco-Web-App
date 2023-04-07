import {deleteMake} from '../../../services/adminService'
import {adminListActions} from '../admin'
import getMakeListAction from './getMakeListAction'

const deleteMakeAction = (payload) => {
  return (dispatch) => {
    dispatch(adminListActions.deleteMakeRequest())
    deleteMake(payload).then((res) => {
      if (res.status === 200) {
        dispatch(adminListActions.setMessageData({message: 'Make Deleted Successfully.', status: 'success'}))
        dispatch(getMakeListAction())
      }
      dispatch(adminListActions.deleteMakeSuccess(res))
    }).catch((error) => {
      dispatch(adminListActions.deleteMakeFailure(error))
    })
  }
}

export default deleteMakeAction
