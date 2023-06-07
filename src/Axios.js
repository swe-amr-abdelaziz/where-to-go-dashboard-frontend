import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8001',
  headers: {
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ODA3MzNhMzVjNmU3MjQ4NTI4ZGJhYSIsInJvbGUiOiJFbXBsb3llZSIsImlhdCI6MTY4NjE0MDAyMCwiZXhwIjoxNjkzOTE2MDIwfQ.BRqYM_3v5yBUgEr8UPHuHN7vm_tDKO4SkOYRPkItHko',
    'Content-Type': 'application/json',
  },
})

export default axiosInstance
