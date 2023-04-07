import {getAppraisersTrue} from '../../../services/adminService'
import {adminListActions} from '../admin'
import getAppraiserAction from './getAppraiserAction'
import getLocationAction from './getLocationAction'

const getResetAssignAppraiserAction = () => {
  return (dispatch) => {
    dispatch(adminListActions.getResetAssignAppraiserRequest())
    getAppraisersTrue().then((res) => {
      if (res.status === 200) {
        dispatch(getLocationAction())
        dispatch(getAppraiserAction())
      }
      dispatch(adminListActions.getResetAssignAppraiserSuccess(res))
    }).catch((error) => {
      dispatch(adminListActions.getResetAssignAppraiserFailure(error))
    })

  }
}

export default getResetAssignAppraiserAction
