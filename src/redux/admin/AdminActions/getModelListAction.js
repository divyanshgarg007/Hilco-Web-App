import {fetchModelList} from '../../../services/adminService'
import {adminListActions} from '../admin'

const getModelListAction = (payload) => {
  return (dispatch) => {
    dispatch(adminListActions.getModelListRequest())
    fetchModelList(payload).then((res) => {
      dispatch(adminListActions.getModelListSuccess(res))
    }).catch((error) => {
      dispatch(adminListActions.getModelListFailure(error))
    })
  }
}

export default getModelListAction
