import {postAssignAppraiser} from '../../../services/adminService'
import {adminListActions} from '../admin'
import getAppraiserAction from './getAppraiserAction'

const postAssignAppraiserUserAction = (payload) => {
  return (dispatch) => {
    dispatch(adminListActions.postAssignAppraiserUserRequest())
    postAssignAppraiser(payload).then((res) => {
      if (res.status === 200) {
        dispatch(adminListActions.setMessageData({message: 'User updated successfully.', status: 'success'}))
        dispatch(getAppraiserAction())
      }
      dispatch(adminListActions.postAssignAppraiserUserSuccess(res))
    }).catch((error) => {
      dispatch(adminListActions.postAssignAppraiserUserFailure(error))
    })

  }
}

export default postAssignAppraiserUserAction
