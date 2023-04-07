/* eslint-disable no-debugger */
import {postSerialLabelAdd} from '../../../services/adminService'
import {adminListActions} from '../admin'
import getSerialLabelAction from './getSerialLabelAction'

const postSerialLabelAction = (payload) => {
  return (dispatch) => {
    dispatch(adminListActions.postSerialLabelRequest())
    if (!payload.name) return
    postSerialLabelAdd({action: 'duplicate', name: payload.name}).then((res) => {
      if (res.status === 200) {
        if (res.data.serial[0].count === 1) {
          dispatch(adminListActions.setMessageData({message: 'Serial Label Already Exists.', status: 'failed'}))// message content, status, eg - res.data
          return
        }
        postSerialLabelAdd({...payload, action: 'add'}).then(() => {
          dispatch(getSerialLabelAction())
          dispatch(adminListActions.setMessageData({message: 'Serial Label Added Successfully.', status: 'success'}))// message content, status, eg - res.data
        })
      }
      dispatch(adminListActions.postSerialLabelSuccess(res))
    }).catch((error) => {
      dispatch(adminListActions.postSerialLabelFailure(error))
    })
  }
}

export default postSerialLabelAction
