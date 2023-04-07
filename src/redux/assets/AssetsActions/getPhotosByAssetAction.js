import {fetchAssetPhotos} from '../../../services/assetListService'
import {assetsListActions} from '../assets'

const getPhotosByAssetAction = () => {
  return (dispatch) => {
    dispatch(assetsListActions.photosByAssetRequest())
    fetchAssetPhotos().then((res) => {
      dispatch(assetsListActions.photosByAssetSuccess(res))
    }).catch((error) => {
      dispatch(assetsListActions.photosByAssetFailure(error))
    })
  }
}

export default getPhotosByAssetAction
