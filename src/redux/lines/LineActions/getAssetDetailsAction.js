import {fetchAssetDetails} from '../../../services/lineServices'
import {lineListActions} from '../line'

const getAssetDetailsAction = (payload) => {
  return (dispatch) => {
    dispatch(lineListActions.assetDetailsRequest())
    fetchAssetDetails(payload).then((res) => {
      dispatch(lineListActions.assetDetailsSuccess(res))
    }).catch((error) => {
      dispatch(lineListActions.assetDetailsFailure(error))
    })

  }
}

export default getAssetDetailsAction
