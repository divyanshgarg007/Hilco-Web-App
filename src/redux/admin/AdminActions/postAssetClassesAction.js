/* eslint-disable no-debugger */
import {postAssetClassesAdd} from '../../../services/adminService'
import {adminListActions} from '../admin'
import getAssetClassesListAction from './getAssetClassesListAction'

const postAssetClassesAction = (payload) => {
  return (dispatch) => {
    dispatch(adminListActions.postAssetClassesRequest())
    postAssetClassesAdd(payload).then((res) => {
      if (res.status === 200) {
        dispatch(adminListActions.setMessageData({message: 'Asset Class Added Successfully.', status: 'success'}))// message content, status, eg - res.data
        dispatch(getAssetClassesListAction())
      }
      dispatch(adminListActions.postAssetClassesSuccess(res))
    }).catch((error) => {
      console.log(error, 'res')
      dispatch(adminListActions.postAssetClassesFailure(error))
    })
  }
}

export default postAssetClassesAction
