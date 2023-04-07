import {fetchProjectData} from '../../../services/reportServices'
import {reportListActions} from '../report'

const getProjectDataAction = () => {
  return (dispatch) => {
    dispatch(reportListActions.projectDataListRequest())
    fetchProjectData().then((res) => {
      dispatch(reportListActions.projectDataListSuccess(res))
    }).catch((error) => {
      dispatch(reportListActions.projectDataListFailure(error))
    })

  }
}

export default getProjectDataAction
