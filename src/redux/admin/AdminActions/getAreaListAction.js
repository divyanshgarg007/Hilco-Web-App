import {fetchAreaList} from '../../../services/adminService'
import {adminListActions} from '../admin'

const getAreaListAction = (payload) => {
  return (dispatch) => {
    dispatch(adminListActions.getAreaListRequest())
    fetchAreaList(payload).then((res) => {
      dispatch(adminListActions.getAreaListSuccess(res))
    }).catch((error) => {
      dispatch(adminListActions.getAreaListFailure(error))
    })
  }
}

export default getAreaListAction
