import {postAreaOrder} from '../../../services/reportServices'
import {reportListActions} from '../report'
import getReportsListAction from './getReportsListAction'

const postAreaOrderListAction = (payload) => {
  return (dispatch) => {
    dispatch(reportListActions.areaOderingRequest())
    postAreaOrder(payload).then((res) => {
      if (res.status === 200) {
        dispatch(getReportsListAction())
      }
      dispatch(reportListActions.areaOderingSuccess(res))
    }).catch((error) => {
      dispatch(reportListActions.areaOderingFailure(error))
    })

  }
}

export default postAreaOrderListAction
