import {fetchAssetTypeList} from '../../../services/adminService'
import {adminListActions} from '../admin'

const getAssetTypeAction = () => {
  return (dispatch) => {
    dispatch(adminListActions.getAssetTypeRequest())
    fetchAssetTypeList().then((res) => {
      dispatch(adminListActions.getAssetTypeSuccess(res))
    }).catch((error) => {
      dispatch(adminListActions.getAssetTypeFailure(error))
    })
  }
}

export default getAssetTypeAction
