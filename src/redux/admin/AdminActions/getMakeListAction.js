import {getMakeList} from '../../../services/adminService'
import {adminListActions} from '../admin'

const getMakeListAction = (payload) => {
  return (dispatch) => {
    dispatch(adminListActions.getMakeListRequest())
    getMakeList(payload).then((res) => {
      dispatch(adminListActions.getMakeListSuccess(res))
    }).catch((error) => {
      dispatch(adminListActions.getMakeListFailure(error))
    })
  }
}

export default getMakeListAction
