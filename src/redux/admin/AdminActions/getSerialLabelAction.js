import {fetchSerialLabelList} from '../../../services/adminService'
import {adminListActions} from '../admin'

const getSerialLabelAction = () => {
  return (dispatch) => {
    dispatch(adminListActions.getSerialLabelRequest())
    fetchSerialLabelList().then((res) => {
      dispatch(adminListActions.getSerialLabelSuccess(res))
    }).catch((error) => {
      dispatch(adminListActions.getSerialLabelFailure(error))
    })
  }
}

export default getSerialLabelAction
