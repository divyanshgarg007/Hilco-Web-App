import {postFindReplace} from '../../../services/assetListService'
import {assetsListActions} from '../assets'

const postFindReplaceAction = (payload) => {
  return (dispatch) => {
    dispatch(assetsListActions.postFindReplaceRequest())
    postFindReplace(payload).then((res) => {
      if (res.status === 200) {
        dispatch(assetsListActions.setMessageData({message: 'Records updated successfully.', status: 'success'}))
      }
      dispatch(assetsListActions.postFindReplaceSuccess(res))
    }).catch((error) => {
      dispatch(assetsListActions.postFindReplaceFailure(error))
    })

  }
}

export default postFindReplaceAction
