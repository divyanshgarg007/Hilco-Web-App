/* eslint-disable no-debugger */
import {postModelAdd} from '../../../services/adminService'
import {adminListActions} from '../admin'
import getModelListAction from './getModelListAction'

const postModelAction = (payload) => {
  return (dispatch) => {
    dispatch(adminListActions.postModelRequest())
    if (!payload.name) return
    postModelAdd({action: 'duplicate', name: payload.name}).then((res) => {
      if (res.status === 200) {
        if (res.data.model[0].count === 1) {
          dispatch(adminListActions.setMessageData({message: 'Model Label Already Exists.', status: 'failed'}))// message content, status, eg - res.data
          return
        }
        postModelAdd({...payload, action: 'add'}).then(() => {
          dispatch(getModelListAction())
          dispatch(adminListActions.setMessageData({message: 'Model Label Added Successfully.', status: 'success'}))// message content, status, eg - res.data
        })
      }
      dispatch(adminListActions.postModelSuccess(res))
    }).catch((error) => {
      dispatch(adminListActions.postModelFailure(error))
    })
  }
}

export default postModelAction
