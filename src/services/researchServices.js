import apiInstance from '../config/api/axios'

// GET Research list List
const fetchResearchList = async(payload) => {
  try {
    const response = await apiInstance.get(`research?app_type=${payload.app_type}`, payload)
    return response.data

  } catch (error) {
    console.log(error)
  }
}

// Post Search Add
const showResearchData = async(payload) => {
  try {
    const response = await apiInstance.post('research', payload)
    return response?.data
  } catch (error) {
    console.log(error)
  }
}


export {fetchResearchList, showResearchData,
}

