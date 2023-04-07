import apiInstance from '../config/api/axios'

// GET Lines List
const fetchLinesList = async() => {
  const queryParams = '?project_id=ed69ffa3-7089-da7c-2bbb-5661f3c0d433'
  try {
    const response = await apiInstance.get(`line-detail${queryParams}`)
    return response.data.lineDetails

  } catch (error) {
    console.log(error)
  }
}

// GET assets List
const fetchAssetDetails = async(payload) => {
  try {
    if (payload) {
      if (payload?.type) {
        const response = await apiInstance.get(`asset-detail?location_id=${payload?.location_id}&project_id_crm=${payload?.project_id_crm}&type=${payload.type}`, payload)
        return response
      } else if (!payload?.type) {
        const response = await apiInstance.get(`asset-detail?location_id=${payload?.location_id}&project_id_crm=${payload?.project_id_crm}`, payload)
        return response
      }
    } else {
      const response = await apiInstance.get('asset-detail')
      return response?.data
    }

  } catch (error) {
    console.log(error)
  }
}

// GET Asset Type List
const getAssetTypeList = async() => {
  try {
    const response = await apiInstance.get('common?type=assetTypeOnly')
    return response.data.assetsList
  } catch (error) {
    console.log(error)
  }
}

// GET make and capacity List
const fetchMakeCapacityList = async(payload) => {
  try {
    const response = await apiInstance.get(`common?project_id_crm=${payload.project_id_crm}&type=${payload.type}`, payload)
    return response

  } catch (error) {
    console.log(error)
  }
}

// GET Line By Area List
const fetchAreaByLineList = async(payload) => {
  try {
    const response = await apiInstance.get(`line-by-area?area=${encodeURIComponent(payload?.area)}&location_id=${payload?.location_id}`, payload)
    return response?.data?.lineList

  } catch (error) {
    console.log(error)
  }
}

// Post Line Detail
const postLineDetail = async(payload) => {
  try {
    const response = await apiInstance.post('line-detail', payload)
    return response
  } catch (error) {
    console.log(error)
  }
}


export {fetchLinesList, fetchAssetDetails, getAssetTypeList, fetchMakeCapacityList, postLineDetail, fetchAreaByLineList,
}

