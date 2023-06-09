import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8001',
  headers: {
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ODA3MzNhMzVjNmU3MjQ4NTI4ZGJhYSIsInJvbGUiOiJFbXBsb3llZSIsImlhdCI6MTY4NjIzMzM3OCwiZXhwIjoxNjk0MDA5Mzc4fQ.H7SiXzH7DhhpeR3yxwOVJhZLaRv87njT5r-lzRuvUhM',
    'Content-Type': 'application/json',
  },
})

export default axiosInstance
