import {fetchAreaByLineList} from '../../../services/lineServices'
import {lineListActions} from '../line'

const getLineByAreaListAction = (payload) => {
  return (dispatch) => {
    dispatch(lineListActions.lineByAreaListRequest())
    fetchAreaByLineList(payload).then((res) => {
      dispatch(lineListActions.lineByAreaListSuccess(res))
    }).catch((error) => {
      dispatch(lineListActions.lineByAreaListFailure(error))
    })

  }
}

export default getLineByAreaListAction
