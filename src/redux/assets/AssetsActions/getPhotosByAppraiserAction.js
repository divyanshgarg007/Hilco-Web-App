import {fetchPhotosByAppraiser} from '../../../services/assetListService'
import {assetsListActions} from '../assets'

const getPhotosByAppraiserAction = (payload) => {
  return (dispatch) => {
    dispatch(assetsListActions.photosByAppraiserRequest())
    fetchPhotosByAppraiser(payload).then((res) => {
      dispatch(assetsListActions.photosByAppraiserSuccess(res))
    }).catch((error) => {
      dispatch(assetsListActions.photosByAppraiserFailure(error))
    })
  }
}

export default getPhotosByAppraiserAction
