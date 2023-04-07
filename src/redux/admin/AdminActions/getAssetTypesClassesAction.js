import {fetchAssetTypes} from '../../../services/adminService'
import {adminListActions} from '../admin'

const getAssetTypesClassesAction = (payload) => {
  return (dispatch) => {
    dispatch(adminListActions.getAssetTypesClassesRequest())
    fetchAssetTypes(payload).then((res) => {
      dispatch(adminListActions.getAssetTypesClassesSuccess(res))
    }).catch((error) => {
      dispatch(adminListActions.getAssetTypesClassesFailure(error))
    })
  }
}

export default getAssetTypesClassesAction
