import {getAssetTypeList} from '../../../services/lineServices'
import {lineListActions} from '../line'

const getAssetTypeListAction = () => {
  return (dispatch) => {
    dispatch(lineListActions.assetTypeListRequest())
    getAssetTypeList().then((res) => {
      dispatch(lineListActions.assetTypeListSuccess(res))
    }).catch((error) => {
      dispatch(lineListActions.assetTypeListFailure(error))
    })
  }
}

export default getAssetTypeListAction
