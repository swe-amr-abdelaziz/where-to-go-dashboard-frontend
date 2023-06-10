import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CRow,
} from '@coreui/react'
import axiosInstance from 'src/Axios'

const TagEdit = () => {
  const { id } = useParams()
  const [tag, setTag] = useState(null)
  const [name, setName] = useState('')
  const [category, setCategory] = useState('')
  const [categories, setCategories] = useState([])

  const navigate = useNavigate()

  useEffect(() => {
    // Fetch tag details from the server using axios
    axiosInstance
      .get(`/api/v1/tags/${id}`)
      .then((res) => {
        const { name, category } = res.data.data
        setTag(res.data.data)
        setName(name)
        setCategory(category)
      })
      .catch((error) => console.log(error))
  }, [id])

  useEffect(() => {
    // Fetch categories from the server using axios
    axiosInstance
      .get('/api/v1/categories')
      .then((res) => {
        setCategories(res.data.data)
      })
      .catch((error) => console.log(error))
  }, [])

  const handleNameChange = (event) => {
    setName(event.target.value)
  }

  const handleCategoryChange = (event) => {
    setCategory(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    // Update tag details on the server using axios
    axiosInstance
      .put(`/api/v1/tags/${id}`, { name, category })
      .then((res) => {
        console.log(res)
        navigate(`/tags/${id}`)
      })
      .catch((error) => console.log(error))
  }

  if (!tag || categories.length === 0) {
    return null // You can display a loading indicator here
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="m-3 p-4 shadow">
          <CCardHeader>
            <h3>Edit Tag</h3>
          </CCardHeader>
          <CCardBody>
            <CForm onSubmit={handleSubmit}>
              <CFormLabel htmlFor="name">Name</CFormLabel>
              <CFormInput
                type="text"
                id="name"
                placeholder="Tag Name"
                value={name}
                onChange={handleNameChange}
                required
              />
              <CFormLabel htmlFor="category">Category</CFormLabel>
              <CFormSelect
                id="category"
                value={category._id}
                onChange={handleCategoryChange}
                required
              >
                <option value="">Select a category</option>
                {categories &&
                  tag &&
                  categories.map((category) => (
                    <option
                      key={category._id}
                      value={category._id}
                      selected={tag.category._id === category._id}
                    >
                      {category.name}
                    </option>
                  ))}
              </CFormSelect>
              <CButton className="mt-3" type="submit" color="primary">
                Save
              </CButton>
              <CButton onClick={() => navigate('/tags')} className="bg-secondary mt-3 ms-3">
                Back
              </CButton>
            </CForm>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default TagEdit
