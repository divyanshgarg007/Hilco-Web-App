import {showResearchData} from '../../../services/researchServices'
import {researchListActions} from '../research'

const showResearchAction = (payload) => {
  return (dispatch) => {
    dispatch(researchListActions.showResearchRequest())
    showResearchData(payload).then((res) => {
      if (res.status === 200) {
        // dispatch(researchListActions.setMessageData({message: 'Line Details Submitted successfully.', status: 'success'}))
      }
      dispatch(researchListActions.showResearchSuccess(res))
    }).catch((error) => {
      dispatch(researchListActions.showResearchFailure(error))
    })

  }
}

export default showResearchAction
