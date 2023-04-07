import {deleteAssignAppraiser} from '../../../services/adminService'
import {adminListActions} from '../admin'
import getLocationAction from './getLocationAction'

const deleteAssignAppraiserAction = (payload) => {
  return (dispatch) => {
    dispatch(adminListActions.deleteAssignAppraiserRequest())
    deleteAssignAppraiser(payload).then((res) => {
      if (res.status === 200) {
        dispatch(adminListActions.setMessageData({message: 'Appraiser un-assigned successfully.', status: 'success'}))
        dispatch(getLocationAction())
      }
      dispatch(adminListActions.deleteAssignAppraiserSuccess(res))
    }).catch((error) => {
      dispatch(adminListActions.deleteAssignAppraiserFailure(error))
    })
  }
}

export default deleteAssignAppraiserAction
