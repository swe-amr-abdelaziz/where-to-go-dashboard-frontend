import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8001',
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`,
    'Content-Type': 'application/json',
  },
})

const axiosInstanceFormData = axios.create({
  baseURL: 'http://localhost:8001',
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`,
    'Content-Type': 'multipart/form-data',
  },
})

export { axiosInstance, axiosInstanceFormData }
export default axiosInstance
