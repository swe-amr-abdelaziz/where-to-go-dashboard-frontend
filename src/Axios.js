import axios from 'axios'

const axiosInstance = axios.create({ baseURL: 'http://localhost:8001' })

export default axiosInstance
