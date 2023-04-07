import apiInstance from '../config/api/axios'

// GET Appraisers List
const fetchAppraisersList = async() => {
  try {
    const response = await apiInstance.get('project-user')
    return response.data.appraiserList
  } catch (error) {
    console.log(error)
  }
}

// GET Location List
const fetchLocationList = async() => {
  const queryParams = '?project_id_crm=ed69ffa3-7089-da7c-2bbb-5661f3c0d433'
  try {
    const response = await apiInstance.get(`location${queryParams}`)
    return response

  } catch (error) {
    console.log(error)
  }
}

// GET appraiser locations list
const getAppraiserLocations = async(payload) => {
  const queryParams = 'ed69ffa3-7089-da7c-2bbb-5661f3c0d433'
  try {
    const response = await apiInstance.get(`common?project_id_crm=${queryParams}&type=getAssignedLocations&user_id=${payload}`)
    return response

  } catch (error) {
    console.log(error)
  }
}


// POST assign appraiser
const postAssignAppraiser = async(payload) => {
  const queryParams = 'ed69ffa3-7089-da7c-2bbb-5661f3c0d433'
  try {
    const response = await apiInstance.post('assign-appraiser', {...payload, project_id_crm: queryParams})
    return response

  } catch (error) {
    console.log(error)
  }
}

// POST assign appraiser (all locations)
const postAssignAppraiserAll = async(payload) => {
  const queryParams = 'ed69ffa3-7089-da7c-2bbb-5661f3c0d433'
  try {
    const response = await apiInstance.post('assign-appraiser', {...payload, project_id_crm: queryParams})
    return response

  } catch (error) {
    console.log(error)
  }
}


// POST assign appraiser
const deleteAssignAppraiser = async(payload) => {
  const queryParams = 'ed69ffa3-7089-da7c-2bbb-5661f3c0d433'
  try {
    const response = await apiInstance.delete(`assign-appraiser?location_id=${payload.locationId}&project_id_crm=${queryParams}&user_id=${payload.userId}`)
    return response

  } catch (error) {
    console.log(error)
  }
}

// GET reset assign appraiser list
const getAppraisersTrue = async() => {
  const queryParams = 'ed69ffa3-7089-da7c-2bbb-5661f3c0d433'
  try {
    const response = await apiInstance.get(`location?getAppraisersOnly=true&project_id_crm=${queryParams}`)
    return response

  } catch (error) {
    console.log(error)
  }
}

// GET Area By Location List
const fetchAreaList = async(payload) => {
  try {
    const response = await apiInstance.get(`area-by-location?location_id=${payload.location_id}`)
    return response.data.areaList
  } catch (error) {
    console.log(error)
  }
}

// Delete Area Item in List
const deleteArea = async(payload) => {
  try {
    const response = await apiInstance.put('asset-detail/deleteList', payload)
    return response
  } catch (error) {
    console.log(error)
  }
}

// GET Serial Labels List
const fetchSerialLabelList = async() => {
  try {
    const response = await apiInstance.get('serial-label')
    return response.data.serial_label
  } catch (error) {
    console.log(error)
  }
}

// Post Serial Labels Add
const postSerialLabelAdd = async(payload) => {
  try {
    const response = await apiInstance.post('serial-label', payload)
    return response
  } catch (error) {
    console.log(error)
  }
}

// Delete Serial Label Item in List
const deleteSerialLabel = async(payload) => {
  try {
    const response = await apiInstance.post('serial-label', payload)
    return response
  } catch (error) {
    console.log(error)
  }
}

// GET Asset Type List
const fetchAssetTypeList = async() => {
  try {
    const response = await apiInstance.get('asset-type')
    return response.data.asset_type
  } catch (error) {
    console.log(error)
  }
}

// Post Asset Type Add
const postAssetTypeAdd = async(payload) => {
  try {
    const response = await apiInstance.post('asset-type', payload)
    return response
  } catch (error) {
    console.log(error)
  }
}

// Delete Asset Type Item in List
const deleteAssetType = async(payload) => {
  try {
    const response = await apiInstance.post('asset-type', payload)
    return response
  } catch (error) {
    console.log(error)
  }
}

// GET Model By Location List
const fetchModelList = async() => {
  try {
    const response = await apiInstance.get('model-label')
    return response.data.model_label
  } catch (error) {
    console.log(error)
  }
}

// Post Model Add
const postModelAdd = async(payload) => {
  try {
    const response = await apiInstance.post('model-label', payload)
    return response
  } catch (error) {
    console.log(error)
  }
}

// Delete Model Item in List
const deleteModel = async(payload) => {
  try {
    const response = await apiInstance.post('model-label', payload)
    return response
  } catch (error) {
    console.log(error)
  }
}

// get manage make data

const getMakeList = async(payload) => {
  let flag = 0
  if (payload) {
    flag = payload
  }
  try {
    const response = await apiInstance.get(`make/${flag}`)
    return response?.data?.make
  } catch (error) {
    console.log(error)
  }
}

// Post Model Add
const postMakeAdd = async(payload) => {
  try {
    const response = await apiInstance.post('make', payload)
    return response
  } catch (error) {
    console.log(error)
  }
}

// Delete Model Item in List
const deleteMake = async(payload) => {
  try {
    const response = await apiInstance.post('make', payload)
    return response
  } catch (error) {
    console.log(error)
  }
}

// GET Asset Classes List
const fetchAssetClassesList = async() => {
  try {
    const response = await apiInstance.get('asset-class')
    return response.data.asset_class
  } catch (error) {
    console.log(error)
  }
}

// GET Asset Class Item Detail
const fetchAssetClassDetail = async(payload) => {
  try {
    const response = await apiInstance.get(`asset-class/${payload}`)
    return response.data.asset_class[0]
  } catch (error) {
    console.log(error)
  }
}

// Delete Asset Classes Item in List
const deleteAssetClasses = async(payload) => {
  try {
    const response = await apiInstance.post('asset-class', payload)
    return response
  } catch (error) {
    console.log(error)
  }
}

// Post Asset Classes Add
const postAssetClassesAdd = async(payload) => {
  try {
    const response = await apiInstance.post('asset-class', payload)
    return response
  } catch (error) {
    console.log(error)
  }
}

// GET Asset Type List in asset classes
const fetchAssetTypes = async(payload) => {
  try {
    const response = await apiInstance.post('asset-class', payload)
    return response.data.assetType
  } catch (error) {
    console.log(error)
  }
}

// Delete Asset Type Item in List
const removeAssetType = async(payload) => {
  try {
    const response = await apiInstance.post('asset-class', payload)
    return response
  } catch (error) {
    console.log(error)
  }
}

export {fetchAppraisersList, fetchLocationList, postAssignAppraiser, postAssignAppraiserAll, deleteAssignAppraiser, getAppraisersTrue, fetchAreaList, fetchSerialLabelList,
  postSerialLabelAdd, deleteSerialLabel, fetchAssetTypeList, postAssetTypeAdd, deleteAssetType, getAppraiserLocations, deleteArea, fetchModelList, postModelAdd, deleteModel,
  getMakeList, postMakeAdd, deleteMake, fetchAssetClassesList, deleteAssetClasses, postAssetClassesAdd, fetchAssetClassDetail, fetchAssetTypes, removeAssetType,
}

