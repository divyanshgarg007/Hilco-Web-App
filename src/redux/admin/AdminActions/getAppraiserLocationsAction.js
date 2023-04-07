import {getAppraiserLocations} from '../../../services/adminService'
import {adminListActions} from '../admin'

const getAppraiserLocationsAction = (payload) => {
  return (dispatch) => {
    dispatch(adminListActions.getAppraiserLocationsRequest())
    getAppraiserLocations(payload).then((res) => {
      dispatch(adminListActions.getAppraiserLocationsSuccess(res))
    }).catch((error) => {
      dispatch(adminListActions.getAppraiserLocationsFailure(error))
    })

  }
}

export default getAppraiserLocationsAction
