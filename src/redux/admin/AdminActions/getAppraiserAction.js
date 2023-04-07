import {fetchAppraisersList} from '../../../services/adminService'
import {adminListActions} from '../admin'

// defining an action to fetch the service "fetchAppraisersList()"
const getAppraiserAction = () => {
  return (dispatch) => {
    dispatch(adminListActions.appraiserListRequest())
    fetchAppraisersList().then((res) => {
      // dispatching the response from service "fetchAppraisersList()" to the particular action "appraiserList()" after it is sliced
      dispatch(adminListActions.appraiserListSuccess(res))
    }).catch((error) => {
      dispatch(adminListActions.appraiserListFailure(error))
    })

  }
}

export default getAppraiserAction
