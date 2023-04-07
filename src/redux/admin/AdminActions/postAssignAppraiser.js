import {postAssignAppraiser} from '../../../services/adminService'
import {adminListActions} from '../admin'
import getLocationAction from './getLocationAction'

const postAssignAppraiserAction = (payload) => {
  return (dispatch) => {
    dispatch(adminListActions.postAssignAppraiserRequest())
    postAssignAppraiser(payload).then((res) => {
      if (res.status === 200) {
        dispatch(adminListActions.setMessageData({message: 'Appraiser assigned successfully.', status: 'success'}))
        dispatch(getLocationAction())
      }
      dispatch(adminListActions.postAssignAppraiserSuccess(res))
    }).catch((error) => {
      dispatch(adminListActions.postAssignAppraiserFailure(error))
    })

  }
}

export default postAssignAppraiserAction
