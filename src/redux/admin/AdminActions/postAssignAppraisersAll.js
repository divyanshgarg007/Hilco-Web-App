import {postAssignAppraiserAll} from '../../../services/adminService'
import {adminListActions} from '../admin'
import getLocationAction from './getLocationAction'

const postAssignAppraiserAllAction = (payload) => {
  return (dispatch) => {
    dispatch(adminListActions.postAssignAppraiserAllRequest())
    postAssignAppraiserAll(payload).then((res) => {
      if (res.status === 200) {
        dispatch(adminListActions.setMessageData({message: 'Appraiser assigned successfully.', status: 'success'}))
        dispatch(getLocationAction())
      }
      dispatch(adminListActions.postAssignAppraiserAllSuccess(res))
    }).catch((error) => {
      dispatch(adminListActions.postAssignAppraiserAllFailure(error))
    })

  }
}

export default postAssignAppraiserAllAction
