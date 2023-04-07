import {postAddAssets} from '../../../services/assetListService'
import {assetsListActions} from '../assets'

const postAddAssetAction = (payload) => {
  return (dispatch) => {
    dispatch(assetsListActions.postAddAssetRequest())
    postAddAssets(payload).then((res) => {
      if (res.status === 200) {
        dispatch(assetsListActions.setMessageData({message: 'Asset Details Added successfully.', status: 'success'}))
      }
      dispatch(assetsListActions.postAddAssetSuccess(res))
    }).catch((error) => {
      dispatch(assetsListActions.postAddAssetFailure(error))
    })

  }
}

export default postAddAssetAction
