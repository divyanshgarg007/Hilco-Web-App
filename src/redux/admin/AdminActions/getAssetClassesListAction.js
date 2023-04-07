import {fetchAssetClassesList} from '../../../services/adminService'
import {adminListActions} from '../admin'

const getAssetClassesListAction = (payload) => {
  return (dispatch) => {
    dispatch(adminListActions.getassetClassesRequest())
    fetchAssetClassesList(payload).then((res) => {
      dispatch(adminListActions.getassetClassesSuccess(res))
    }).catch((error) => {
      dispatch(adminListActions.getassetClassesFailure(error))
    })
  }
}

export default getAssetClassesListAction
