import {fetchFindReplace} from '../../../services/assetListService'
import {assetsListActions} from '../assets'

const getFindReplaceAction = (payload) => {
  return (dispatch) => {
    dispatch(assetsListActions.findReplaceRequest())
    fetchFindReplace(payload).then((res) => {
      dispatch(assetsListActions.findReplaceSuccess(res))
    }).catch((error) => {
      dispatch(assetsListActions.findReplaceFailure(error))
    })
  }
}

export default getFindReplaceAction
