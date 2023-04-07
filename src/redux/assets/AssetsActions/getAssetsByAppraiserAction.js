import {fetchAssetsByAppraiser} from '../../../services/assetListService'
import {assetsListActions} from '../assets'

const getAssetsByAppraiserAction = (payload) => {
  return (dispatch) => {
    dispatch(assetsListActions.assetsByAppraiserRequest())
    fetchAssetsByAppraiser(payload).then((res) => {
      dispatch(assetsListActions.assetsByAppraiserSuccess(res))
    }).catch((error) => {
      dispatch(assetsListActions.assetsByAppraiserFailure(error))
    })
  }
}

export default getAssetsByAppraiserAction
