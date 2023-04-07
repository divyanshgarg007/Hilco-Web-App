import {deletePhotosToAssets} from '../../../services/assetListService'
import {assetsListActions} from '../assets'
import getPhotosByAppraiserAction from './getPhotosByAppraiserAction'
import getPhotosByAssetAction from './getPhotosByAssetAction'

const deleteAssignPhotosAction = (payload, userId) => {
  return (dispatch) => {
    dispatch(assetsListActions.deleteAssignPhotosRequest())
    deletePhotosToAssets(payload).then((res) => {
      if (res.status === 200) {
        dispatch(getPhotosByAppraiserAction(userId))
        dispatch(getPhotosByAssetAction())
      }
      dispatch(assetsListActions.deleteAssignPhotosSuccess(res))
    }).catch((error) => {
      dispatch(assetsListActions.deleteAssignPhotosFailure(error))
    })

  }
}

export default deleteAssignPhotosAction
