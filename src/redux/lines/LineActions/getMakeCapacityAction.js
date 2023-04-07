import {fetchMakeCapacityList} from '../../../services/lineServices'
import {lineListActions} from '../line'

const getMakeCapacityAction = (payload) => {
  return (dispatch) => {
    dispatch(lineListActions.makeCapacityListRequest())
    fetchMakeCapacityList(payload).then((res) => {
      dispatch(lineListActions.makeCapacityListSuccess(res))
    }).catch((error) => {
      dispatch(lineListActions.makeCapacityListFailure(error))
    })

  }
}

export default getMakeCapacityAction
