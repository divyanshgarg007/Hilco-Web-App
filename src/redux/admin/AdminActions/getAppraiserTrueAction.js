import {getAppraisersTrue} from '../../../services/adminService'
import {adminListActions} from '../admin'

const getAppraiserTrueAction = () => {
  return (dispatch) => {
    dispatch(adminListActions.getAppraiserTrueRequest())
    getAppraisersTrue().then((res) => {
      dispatch(adminListActions.getAppraiserTrueSuccess(res))
    }).catch((error) => {
      dispatch(adminListActions.getAppraiserTrueFailure(error))
    })

  }
}

export default getAppraiserTrueAction
