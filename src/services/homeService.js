import apiInstance from '../config/api/axios'

// GET Location List
const fetchLocations = async(payload) => {
  const queryParams = 'project_id_crm=ed69ffa3-7089-da7c-2bbb-5661f3c0d433'
  try {
    if (payload) {
      const response = await apiInstance.get(`location?getLastAsset=${payload.getLastAsset}&location_id=${payload.location_id}&${queryParams}`, payload)
      return response
    } else {
      const response = await apiInstance.get(`location?homepage=1&${queryParams}`)
      return response
    }
  } catch (error) {
    console.log(error)
  }
}

// ?getLastAsset=true&location_id=11471&project_id_crm=ed69ffa3-7089-da7c-2bbb-5661f3c0d433

// POST assign appraiser
const fetchLocationValues = async(payload) => {
  const queryParams = 'ed69ffa3-7089-da7c-2bbb-5661f3c0d433'
  try {
    const response = await apiInstance.post('asset-list', {...payload, project_id_crm: queryParams})
    return response

  } catch (error) {
    console.log(error)
  }
}

export {fetchLocations, fetchLocationValues,
}

