import apiInstance from '../config/api/axios'

// GET Lines List
const fetchReportList = async() => {
  const queryParams = '?pageReport=reports&project_id_crm=ed69ffa3-7089-da7c-2bbb-5661f3c0d433'
  try {
    const response = await apiInstance.get(`location${queryParams}`)
    return response.data.location
  } catch (error) {
    console.log(error)
  }
}

// GET project data
const fetchProjectData = async() => {
  const queryParams = 'ed69ffa3-7089-da7c-2bbb-5661f3c0d433'
  try {
    const response = await apiInstance.get(`project/${queryParams}`)
    return response
  } catch (error) {
    console.log(error)
  }
}

// Put Area Ordering
const postAreaOrder = async(payload) => {
  try {
    const response = await apiInstance.put(`location/${payload.id}`, payload)
    return response
  } catch (error) {
    console.log(error)
  }
}

const postReports = async(payload) => {
  try {
    const response = await apiInstance.post('reports', payload)
    return response
  } catch (error) {
    console.log(error)
  }
}


export {fetchReportList, postAreaOrder, postReports, fetchProjectData,
}

