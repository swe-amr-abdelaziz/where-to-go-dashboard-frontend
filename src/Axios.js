import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8001',
  headers: {
    Authorization:
      // 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ODM3NTFlMGE3YjNiYTVlZjc0NjQ4MCIsInJvbGUiOiJBZG1pbiIsImlhdCI6MTY4NjUyNTEwNywiZXhwIjoxNjk0MzAxMTA3fQ.Q8QnuYLPIBI12ILUKejLO6hNTTVLV5eV_OwWQ0YVxjM',
      `Bearer ${localStorage.getItem('token')}`,
    // 'Content-Type': 'application/json',
  },
})

export default axiosInstance
