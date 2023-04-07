import {postPhotosToAssets} from '../../../services/assetListService'
import {assetsListActions} from '../assets'
import getPhotosByAppraiserAction from './getPhotosByAppraiserAction'
import getPhotosByAssetAction from './getPhotosByAssetAction'

const postAssignPhotosAction = (payload, userId) => {
  return (dispatch) => {
    dispatch(assetsListActions.photosToAssetsRequest())
    postPhotosToAssets(payload).then((res) => {
      if (res.status === 200) {
        dispatch(getPhotosByAppraiserAction(userId))
        dispatch(getPhotosByAssetAction())
      }
      dispatch(assetsListActions.photosToAssetsSuccess(res))
    }).catch((error) => {
      dispatch(assetsListActions.photosToAssetsFailure(error))
    })

  }
}

export default postAssignPhotosAction
