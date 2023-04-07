import {fetchAssetClassDetail} from '../../../services/adminService'
import {adminListActions} from '../admin'

const getAssetClassDetailAction = (payload) => {
  return (dispatch) => {
    dispatch(adminListActions.getassetClassDetailRequest())
    fetchAssetClassDetail(payload).then((res) => {
      dispatch(adminListActions.getassetClassDetailSuccess(res))
    }).catch((error) => {
      dispatch(adminListActions.getassetClassDetailFailure(error))
    })
  }
}

export default getAssetClassDetailAction
