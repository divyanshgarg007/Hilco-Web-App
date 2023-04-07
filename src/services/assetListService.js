/* eslint-disable max-len */
/* eslint-disable no-empty */
import apiInstance from '../config/api/axios'

const fetchAssetList = async() => {
  let payload = {
    NForDeleted: false,
    action: 'getAssets',
    appraiser: null,
    area: null,
    capacity: null,
    global_search: null,
    hideCategorized: false,
    isAudio: false,
    location: null,
    make: null,
    model: null,
    pageNumber: 1,
    pageSize: 60,
    projectId: 6522,
    showOnlyAsset: false,
    sortCol: 'area_order',
    sortOrder: 'asc',
  }
  try {
    const response = await apiInstance.post('asset-list', payload)
    return response.data
  } catch (error) {
    console.log(error)
  }
}

const getAssetList = async(payload) => {
  try {
    const response = await apiInstance.post('asset-list', payload)
    if (payload.action === 'getLocation') {
      return response.data
    }
    if (payload.action === 'getAppraiser') {
      return response.data
    }
    if (payload.action === 'getArea') {
      return response.data
    }
    // if (payload.action === 'getAssets') {
    //   return response.data
    // }
  } catch (error) {
    console.log(error)
  }
}

const fetchAssetDetails = async() => {
  const queryParams =
    '?project_id_crm=ed69ffa3-7089-da7c-2bbb-5661f3c0d433&type=line'
  try {
    const response = await apiInstance.get(`asset-detail${queryParams}`)
    return response.data
  } catch (error) {
  }
}

const fetchFindReplace = async(payload) => {
  const queryParams =
    'project_id_crm=ed69ffa3-7089-da7c-2bbb-5661f3c0d433'
  try {
    if (payload?.importedAsset) {
      const response = await apiInstance.get(`find-replace?find=${payload.find}&importedAsset=${payload.importedAsset}&matchtype=${payload.matchtype}&${queryParams}&replace=${payload.replace}&type=${payload.type}`, payload)
      return response.data?.assets
    } else {
      const response = await apiInstance.get(`find-replace?find=${payload.find}&matchtype=${payload.matchtype}&${queryParams}&replace=${payload.replace}&type=${payload.type}`, payload)
      return response.data?.assets
    }
  } catch (error) {
  }
}

const postFindReplace = async(payload) => {
  try {
    const response = await apiInstance.post('find-replace', payload)
    return response
  } catch (error) {
  }
}

const postAddAssets = async(payload) => {
  try {
    const response = await apiInstance.post('asset-detail', payload)
    return response
  } catch (error) {
  }
}

const fetchAssetsByAppraiser = async(payload) => {
  const queryParams =
    'project_id_crm=ed69ffa3-7089-da7c-2bbb-5661f3c0d433'
  try {
    if (payload.min || payload.max || payload.asset_id) {
      const response = await apiInstance.get(`assets-by-appraiser?asset_id=${payload.asset_id}&location_id=${payload.location_id}&max=${payload.max}&min=${payload.min}&${queryParams}&user_id=${payload.user_id}`)
      return response?.data?.assets
    } else {
      const response = await apiInstance.get(`assets-by-appraiser?asset_id=${payload.asset_id}&location_id=${payload.location_id}&${queryParams}&user_id=${payload.user_id}`)
      return response?.data?.assets
    }
  } catch (error) {
  }
}

const fetchAssetPhotos = async() => {
  const queryParams =
    '?project_id_crm=ed69ffa3-7089-da7c-2bbb-5661f3c0d433'
  try {
    const response = await apiInstance.get(`photos-by-asset${queryParams}`)
    return response.data
  } catch (error) {
  }
}

const fetchPhotosByAppraiser = async(payload) => {
  const queryParams =
    '?project_id_crm=ed69ffa3-7089-da7c-2bbb-5661f3c0d433'
  try {
    const response = await apiInstance.get(`photos-by-appraiser${queryParams}&user_id=${payload.user_id}`)
    return response?.data?.photos
  } catch (error) {
  }
}

const postPhotosToAssets = async(payload) => {
  try {
    const response = await apiInstance.post('map-photos-to-asset', payload)
    return response
  } catch (error) {
  }
}

const deletePhotosToAssets = async(payload) => {
  try {
    const response = await apiInstance.delete(`map-photos-to-asset?photo_location=${payload.photo_location}&type=${payload.type}&type_id=${payload.type_id}`, payload)
    return response
  } catch (error) {
  }
}

export {fetchAssetList, fetchAssetDetails, fetchFindReplace, postFindReplace, postAddAssets, fetchAssetsByAppraiser, fetchAssetPhotos, fetchPhotosByAppraiser,
  postPhotosToAssets, deletePhotosToAssets, getAssetList}
