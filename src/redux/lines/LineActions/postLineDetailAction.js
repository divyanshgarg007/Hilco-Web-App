import {postLineDetail} from '../../../services/lineServices'
import {lineListActions} from '../line'

const postLineDetailAction = (payload) => {
  return (dispatch) => {
    dispatch(lineListActions.postLineDetailRequest())
    postLineDetail(payload).then((res) => {
      if (res.status === 200) {
        dispatch(lineListActions.setMessageData({message: 'Line Details Submitted successfully.', status: 'success'}))
      }
      dispatch(lineListActions.postLineDetailSuccess(res))
    }).catch((error) => {
      dispatch(lineListActions.postLineDetailFailure(error))
    })

  }
}

export default postLineDetailAction
