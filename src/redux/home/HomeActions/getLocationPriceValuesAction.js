import {fetchLocationValues} from '../../../services/homeService'
import {postReportsPdfAction} from '../../reports/ReportActions'
import {homeListActions} from '../home'

const getLocationPriceValuesAction = (payload, finalData) => {
  return (dispatch) => {
    dispatch(homeListActions.locationsPriceValuesRequest())
    fetchLocationValues(payload).then((res) => {
      if (payload.action === 'getAssets') {
        if (res.status === 200) {
          dispatch(postReportsPdfAction({...finalData, refData: res.data.refData, reportData: res.data.asset}))
        }
      }
      dispatch(homeListActions.locationsPriceValuesSuccess(res))
    }).catch((error) => {
      dispatch(homeListActions.locationsPriceValuesFailure(error))
    })
  }
}

export default getLocationPriceValuesAction
