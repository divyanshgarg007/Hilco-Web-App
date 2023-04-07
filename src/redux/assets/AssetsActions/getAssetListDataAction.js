import {getAssetList} from '../../../services/assetListService'
import {assetsListActions} from '../assets'

const getAssetListDataAction = (payload) => {
  return (dispatch) => {
    dispatch(assetsListActions.getAssetListDataRequest())
    getAssetList(payload).then((res) => {
      if (payload.action === 'getLocation') {
        dispatch(assetsListActions.getLocationSuccess(res))
      }
      if (payload.action === 'getAppraiser') {
        dispatch(assetsListActions.getAppraiserSuccess(res))
      }
      if (payload.action === 'getArea') {
        dispatch(assetsListActions.getAreaSuccess(res))
      }
      // if (payload.action === 'getAssets') {
      //   dispatch(assetsListActions.getAssetsSuccess(res))
      // }
    }).catch((error) => {
      dispatch(assetsListActions.getAssetListDataFailure(error))
    })
  }
}

export default getAssetListDataAction
