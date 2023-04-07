import {fetchResearchList} from '../../../services/researchServices'
import {researchListActions} from '../research'

const getResearchTypeAction = (payload) => {
  return (dispatch) => {
    dispatch(researchListActions.appraisalTypeRequest())
    fetchResearchList(payload).then((res) => {
      // console.log(payload, 'pay')
      if (payload.app_type === 'appraisal') {
        dispatch(researchListActions.appraisalTypeSuccess(res))
      } else if (payload.app_type === 'imported') {
        dispatch(researchListActions.importedTypeSuccess(res))
      }
    }).catch((error) => {
      dispatch(researchListActions.appraisalTypeFailure(error))
    })

  }
}

export default getResearchTypeAction
