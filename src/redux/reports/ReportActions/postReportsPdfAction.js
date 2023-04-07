import {postReports} from '../../../services/reportServices'
import {reportListActions} from '../report'

const postReportsPdfAction = (payload) => {
  return (dispatch) => {
    dispatch(reportListActions.reportsPdfRequest())
    postReports(payload).then((res) => {
      dispatch(reportListActions.reportsPdfSuccess(res))
    }).catch((error) => {
      dispatch(reportListActions.reportsPdfFailure(error))
    })

  }
}

export default postReportsPdfAction
