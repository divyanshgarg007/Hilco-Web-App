import axios from 'axios'
const url = process.env.REACT_APP_API_URL
const apiInstance = axios.create({
  baseURL: url,
  // timeout: 1000,
  crossDomain: false,
  // headers: {
  // Authorization: "Bearer 15|cudm6DDGGREhP8tVUl8pksQs3YFwTO2Km5ANVrAJ",
  // Authorization: "Bearer 30|O7r088NAoF9Oi0GmZmSjXe65TkCLRGpFgg04N1DJ",
  // },
})
apiInstance.interceptors.request.use((config) => {
  const token = 'cMdE4zA0k1ZctTg4bMou7ENX2bzbRyNnayo366fJ'
  config.headers.Authorization = token ? `Bearer ${token}` : ''
  return config
})

export default apiInstance
