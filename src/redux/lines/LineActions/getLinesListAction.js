import {fetchLinesList} from '../../../services/lineServices'
import {lineListActions} from '../line'

const getLinesListAction = () => {
  return (dispatch) => {
    dispatch(lineListActions.linesListRequest())
    fetchLinesList().then((res) => {
      dispatch(lineListActions.linesListSuccess(res))
    }).catch((error) => {
      dispatch(lineListActions.linesListFailure(error))
    })

  }
}

export default getLinesListAction
