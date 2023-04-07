import {fetchLocations} from '../../../services/homeService'
import {homeListActions} from '../home'

const getLocationsDataAction = (payload) => {
  return (dispatch) => {
    dispatch(homeListActions.locationsRequest())
    fetchLocations(payload).then((res) => {
      dispatch(homeListActions.locationsSuccess(res))
    }).catch((error) => {
      dispatch(homeListActions.locationsFailure(error))
    })

  }
}

export default getLocationsDataAction
