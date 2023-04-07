import {fetchReportList} from '../../../services/reportServices'
import {reportListActions} from '../report'

const getReportsListAction = () => {
  return (dispatch) => {
    dispatch(reportListActions.reportsListRequest())
    fetchReportList().then((res) => {
      dispatch(reportListActions.reportsListSuccess(res))
    }).catch((error) => {
      dispatch(reportListActions.reportsListFailure(error))
    })

  }
}

export default getReportsListAction
