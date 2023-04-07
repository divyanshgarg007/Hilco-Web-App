import {fetchLocationList} from '../../../services/adminService'
import {adminListActions} from '../admin'

// defining an action to fetch the service "fetchlocationList()"
const getLocationAction = () => {
  return (dispatch) => {
    dispatch(adminListActions.locationListRequest())
    fetchLocationList().then((res) => {
      // dispatching the response from service "fetchlocationList()" to the particular action "locationList()" after it is sliced
      dispatch(adminListActions.locationListSuccess(res))
    }).catch((error) => {
      dispatch(adminListActions.locationListFailure(error))
    })

  }
}

export default getLocationAction
