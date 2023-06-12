import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8001',
  headers: {
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ODA3MzNhMzVjNmU3MjQ4NTI4ZGJhYSIsInJvbGUiOiJFbXBsb3llZSIsImlhdCI6MTY4NjUwMjAxMSwiZXhwIjoxNjk0Mjc4MDExfQ.HWSFmw_Pp7DYJHrX2Z-Wny0-aYzycq8v65AjYRAzoPk',
    'Content-Type': 'application/json',
  },
})

const axiosInstanceFormData = axios.create({
  baseURL: 'http://localhost:8001',
  headers: {
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ODA3MzNhMzVjNmU3MjQ4NTI4ZGJhYSIsInJvbGUiOiJFbXBsb3llZSIsImlhdCI6MTY4NjUwMjAxMSwiZXhwIjoxNjk0Mjc4MDExfQ.HWSFmw_Pp7DYJHrX2Z-Wny0-aYzycq8v65AjYRAzoPk',
    'Content-Type': 'multipart/form-data',
  },
})

export { axiosInstance, axiosInstanceFormData }
export default axiosInstance
