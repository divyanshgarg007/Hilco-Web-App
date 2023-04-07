/* eslint-disable no-debugger */
import {postMakeAdd} from '../../../services/adminService'
import {adminListActions} from '../admin'
import getMakeListAction from './getMakeListAction'

const postMakeListAction = (payload) => {
  return (dispatch) => {
    dispatch(adminListActions.postMakeListRequest())
    if (!payload.name) return
    postMakeAdd({action: 'duplicate', name: payload.name}).then((res) => {
      console.log(res, 'res')
      if (res.status === 200) {
        if (res.data.make[0].count === 1) {
          dispatch(adminListActions.setMessageData({message: 'Make Already Exists.', status: 'failed'}))
          return
        }
        postMakeAdd({...payload, action: 'add'}).then(() => {
          dispatch(getMakeListAction())
          dispatch(adminListActions.setMessageData({message: 'Make Added Successfully.', status: 'success'}))
        })
      }
      dispatch(adminListActions.postMakeListSuccess(res))
    }).catch((error) => {
      dispatch(adminListActions.postMakeListFailure(error))
    })
  }
}

export default postMakeListAction
