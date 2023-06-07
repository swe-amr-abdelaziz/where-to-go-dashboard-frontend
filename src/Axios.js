import axios from 'axios'

const axiosInstance = axios.create({ baseURL: 'localhost:8001' })

export default axiosInstance
